import { useState } from 'react';
import './App.css';
import Map, { addMarker, deleteMarkers, setMapCenterAndZoom } from './Map/Map';
import { API_URL, fourHoursInMs, TRUCK_KEYS } from './utils/Constants';
import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';

function App() {
	const [dataStore, setDataStore] = useState({
		total: [],
		running: [],
		stopped: [],
		idle: [],
		error: []
	});
	const [selectedMode, setSelectedMode] = useState(TRUCK_KEYS.total);
	const [sidebarData, setSidebarData] = useState([]);

	async function getApiData() {
		console.log('HITTING API');
		// Hitting API
		try {
			const headers = {
				'Content-Type': 'application/json'
			};
			const response = await fetch(API_URL, {
				method: 'GET',
				headers
			});

			if (response.ok) {
				const responseJson = await response.json();
				console.log(responseJson);

				let totalTemp = [];
				let runningTemp = [];
				let stoppedTemp = [];
				let idleTemp = [];
				let errorTemp = [];

				const currentDateTimeMs = Date.now();

				await responseJson.data.forEach(truck => {
					const currentTruck = {
						truckNumber: truck.truckNumber,
						lat: truck.lastWaypoint.lat,
						lng: truck.lastWaypoint.lng,
						createTime: truck.lastWaypoint.createTime,
						speed: truck.lastWaypoint.speed,
						ignitionOn: truck.lastWaypoint.ignitionOn,
						stopStartTime: truck.lastRunningState.stopStartTime,
						truckRunningState: truck.lastRunningState.truckRunningState
					};

					if (currentDateTimeMs - currentTruck.createTime >= fourHoursInMs) {
						// Running Trucks -Trucks which haven’t responded from the last 4 hours
						currentTruck.status = 'error';
						errorTemp.push(currentTruck);
					} else {
						if (currentTruck.truckRunningState) {
							// Running Trucks - Trucks in moving state
							currentTruck.status = 'running';
							runningTemp.push(currentTruck);
						} else {
							// Idle Trucks - Stopped but ignition is on
							if (currentTruck.ignitionOn) {
								currentTruck.status = 'idle';
								idleTemp.push(currentTruck);
							}
							// Stopped Trucks - stopped at the moment and ignition is off
							else {
								currentTruck.status = 'stopped';
								stoppedTemp.push(currentTruck);
							}
						}
					}

					totalTemp.push(currentTruck);
				});

				// Add markers to map
				addNewMarkersToMap(totalTemp);

				// Storing data
				setDataStore({
					total: totalTemp,
					running: runningTemp,
					stopped: stoppedTemp,
					idle: idleTemp,
					error: errorTemp
				});
			} else {
				throw new Error(response.statusText);
			}
		} catch (err) {
			console.error(err);
		}
	}

	async function addNewMarkersToMap(data) {
		// Updating sidebar
		setSidebarData(data);

		// Updating Map
		deleteMarkers();

		// If no value exist exit
		if (!data.length) return false;

		await data.forEach(truck => {
			const newMarker = {
				lat: truck.lat,
				lng: truck.lng
			};

			let markerColor;
			if (truck.status === TRUCK_KEYS.running) markerColor = 'green';
			if (truck.status === TRUCK_KEYS.stopped) markerColor = 'blue';
			if (truck.status === TRUCK_KEYS.idle) markerColor = 'yellow';
			if (truck.status === TRUCK_KEYS.error) markerColor = 'red';

			addMarker(newMarker, truck.truckNumber, markerColor);
		});

		// Setting center to first truck and zooming
		setMapCenterAndZoom(data[0].lat, data[0].lng, 12);
	}

	return (
		<div className="App">
			<Header
				selectedMode={selectedMode}
				updateSelectedMode={key => {
					setSelectedMode(key);
					addNewMarkersToMap(dataStore[key]);
				}}
				counts={{
					total: dataStore.total.length,
					running: dataStore.running.length,
					stopped: dataStore.stopped.length,
					idle: dataStore.idle.length,
					error: dataStore.error.length
				}}
			/>

			<div className="container">
				<Sidebar data={sidebarData} />

				<Map onLoadAction={() => getApiData()} />
			</div>
		</div>
	);
}

export default App;
