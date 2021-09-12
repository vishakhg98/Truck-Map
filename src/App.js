import './App.css';
import {
	API_URL,
	BLUE_MARKER,
	// GOOGLE_MAP_KEY,
	GREEN_MARKER
	// TEMP_DATA
} from './utils/Constants';
import { useEffect } from 'react';

let map;

const PLACES = [
	{
		lat: 30.757919311523438,
		lng: 76.13247680664062,
		color: BLUE_MARKER,
		title: 'YO TRUCK 1'
	},
	{
		lat: 30.757919311523438,
		lng: 76.132,
		color: GREEN_MARKER,
		title: 'YO TRUCK 2'
	}
];
function initMap() {
	map = new window.google.maps.Map(document.getElementById('map'), {
		center: { lat: 30.757919311523438, lng: 76.13247680664062 },
		zoom: 16
	});

	// new window.google.maps.Marker({
	// 	position: { lat: 30.757919311523438, lng: 76.13247680664062 },
	// 	map,
	// 	title: 'Hello World!'
	// });

	PLACES.forEach(place => {
		const image = `http://maps.google.com/mapfiles/ms/icons/${place.color}-dot.png`;
		new window.google.maps.Marker({
			position: { lat: place.lat, lng: place.lng },
			map,
			icon: image,
			title: place.title
		});
	});
	// const image =
	// 	'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
	// const beachMarker = new window.google.maps.Marker({
	// 	position: { lat: 30.757919311523438, lng: 76.132 },
	// 	map,
	// 	icon: image
	// });
}

function App() {
	// const [dataStore, setDataStore] = useState([...TEMP_DATA]);
	// const [mapData, setMapData] = useState([]);
	useEffect(() => {
		// Initialising map
		try {
			const script = document.createElement('script');
			script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBECBmDGXDR_37hLJU-zjMSZ65OIA4Ikek`;

			// script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_KEY}`;

			script.async = true;
			script.type = 'text/javascript';

			script.onload = () => {
				initMap();
			};
			document.body.appendChild(script);
		} catch (err) {
			console.error(err);
		}
		getInitialData();
	}, []);

	async function getInitialData() {
		console.log(API_URL);
		// initMap();
		// try {
		// 	const headers = {
		// 		'Content-Type': 'application/json'
		// 	};
		// 	const response = await fetch(API_URL, {
		// 		method: 'GET',
		// 		headers
		// 	});
		// 	console.log(response);
		// 	const responseJson = await response.json();
		// 	console.log(responseJson);
		// 	if (responseJson.responseCode.responseCode === 200) {
		// 		// Task here
		// 		console.log(responseJson.data);
		// 		setDataStore(responseJson.data);
		// 	} else {
		// 		throw new Error(responseJson.responseCode.message);
		// 	}
		// } catch (err) {
		// 	console.error(err);
		// }
	}

	// console.log(dataStore.length);
	return (
		<div className="App">
			HOME
			<div id="map" style={{ height: 500, width: '100%' }} />
			{/* <iframe
				// width="600"
				// height="450"
				// style="border:0"
				// loading="lazy"
				allowfullscreen
				src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyCb9hLTy-qktNnGvGbwAIt21aT0TW293i8&q=Space+Needle,Seattle+WA`}
			></iframe> */}
			{/* <iframe
				src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBECBmDGXDR_37hLJU-zjMSZ65OIA4Ikek&q=Theophiledonnéstraat+79+3540+Donk`}
				allowfullscreen
			></iframe> */}
			{/* <iframe
				src={`http://maps.google.com/maps?q=30.757919311523438,76.13247680664062&30.755468368530273,76.13896179199219&z=15&output=embed`}
			></iframe> */}
			{/* <iframe
				width={'100%'}
				zoom={16}
				src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBECBmDGXDR_37hLJU-zjMSZ65OIA4Ikek&q=30.757919311523438,76.13247680664062&q=30.757966,76.132201`}
			></iframe> */}
		</div>
	);
}

export default App;
