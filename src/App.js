import { useState } from 'react';
import './App.css';
import Map, { addMarker, deleteMarkers, setMapCenterAndZoom } from './Map/Map';
import { API_URL, fourHoursInMs, TRUCK_KEYS } from './utils/Constants';
import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';

function App() {
	const [dataStore, setDataStore] = useState({});
	const [selectedData, setSelectedData] = useState({
		total: [],
		running: [],
		stopped: [],
		idle: [],
		error: []
	});
	const [selectedMode, setSelectedMode] = useState(TRUCK_KEYS.total);

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
						currentTruck.status = TRUCK_KEYS.error;
						errorTemp.push(currentTruck);
					} else {
						if (currentTruck.truckRunningState) {
							// Running Trucks - Trucks in moving state
							currentTruck.status = TRUCK_KEYS.running;
							runningTemp.push(currentTruck);
						} else {
							// Idle Trucks - Stopped but ignition is on
							if (currentTruck.ignitionOn) {
								currentTruck.status = TRUCK_KEYS.idle;
								idleTemp.push(currentTruck);
							}
							// Stopped Trucks - stopped at the moment and ignition is off
							else {
								currentTruck.status = TRUCK_KEYS.stopped;
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

				setSelectedData({
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

		// Setting center to last truck and zooming
		setMapCenterAndZoom(
			data[data.length - 1].lat,
			data[data.length - 1].lng,
			9
		);
	}

	function updateSelectedData(value) {
		if (value.length) {
			let totalTemp = [];
			let runningTemp = [];
			let stoppedTemp = [];
			let idleTemp = [];
			let errorTemp = [];

			value.forEach(truck => {
				if (truck.status === 'running') runningTemp.push(truck);
				if (truck.status === 'stopped') stoppedTemp.push(truck);
				if (truck.status === 'idle') idleTemp.push(truck);
				if (truck.status === 'error') errorTemp.push(truck);
				totalTemp.push(truck);
			});

			// Add markers to map
			addNewMarkersToMap(totalTemp);

			// Storing data
			setSelectedData({
				total: totalTemp,
				running: runningTemp,
				stopped: stoppedTemp,
				idle: idleTemp,
				error: errorTemp
			});
		} else {
			// If selected from selectBox gets 0 reset to total Data
			setSelectedData(dataStore);

			// Add markers to map
			addNewMarkersToMap(dataStore[selectedMode]);
		}
	}

	return (
		<div className="App">
			<Header
				selectedMode={selectedMode}
				updateSelectedMode={key => {
					setSelectedMode(key);
					addNewMarkersToMap(selectedData[key]);
					setSelectedData(dataStore);
				}}
				counts={{
					total: selectedData.total.length,
					running: selectedData.running.length,
					stopped: selectedData.stopped.length,
					idle: selectedData.idle.length,
					error: selectedData.error.length
				}}
				// SelectBox
				totalDataStore={dataStore[selectedMode]}
				activeData={selectedData[selectedMode]}
				updateSelectedData={value => updateSelectedData(value)}
			/>

			<div className="container">
				<Sidebar data={selectedData[selectedMode]} />

				<Map onLoadAction={() => getApiData()} />
			</div>
		</div>
	);
}

export default App;
