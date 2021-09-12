function initMap(
	centerLatitude = 21.7679,
	centerLongitude = 78.8718,
	zoomLevel = 4
) {
	// Map options
	var options = {
		zoom: zoomLevel,
		center: { lat: centerLatitude, lng: centerLongitude }
		// center: { lat: 28.5836, lng: 77.2108 }
	};

	// New map
	let map = new window.google.maps.Map(document.getElementById('map'), options);

	// Listen for click on map
	window.google.maps.event.addListener(map, 'click', function (event) {
		// Add marker
		console.log(event);
		// addMarker({ coords: event.latLng });
		// alert(
		// 	'Latitude: ' +
		// 		event.latLng.lat() +
		// 		' ' +
		// 		', longitude: ' +
		// 		event.latLng.lng()
		// );

		const lat = event.latLng.lat();
		const lng = event.latLng.lng();
	});

	// // // Add Marker Function
	// function addMarker(props) {
	// 	console.log('line 153');
	// 	var marker = new google.maps.Marker({
	// 		position: props.coords,
	// 		map: map
	// 		//icon:props.iconImage
	// 	});

	// 	console.log(marker);

	// 	// Check for customicon
	// 	if (props.iconImage) {
	// 		console.log('line 162');
	// 		// Set icon image
	// 		marker.setIcon(props.iconImage);
	// 	}

	// 	// Check content
	// 	if (props.content) {
	// 		console.log('line 169');
	// 		var infoWindow = new google.maps.InfoWindow({
	// 			content: props.content
	// 		});

	// 		marker.addListener('click', function() {
	// 			infoWindow.open(map, marker);
	// 			console.log('line 176');
	// 		});
	// 	}
	// }
}

useEffect(() => {
	// Initialising map
	const script = document.createElement('script');
	script.src =
		'https://maps.googleapis.com/maps/api/js?key=AIzaSyAX-hbR1n9tTIgsPW6Bz7eMEkVslsK_2uc';
	script.async = true;
	// script.onload = () => {
	// 	initMap();
	// };
	document.body.appendChild(script);

	// Fetching API Restaurant data
	getInitialData();
}, []);

// Initialize and add the map
function initMap() {
	// The location of Uluru
	const uluru = { lat: -25.344, lng: 131.036 };
	// The map, centered at Uluru
	const map = new google.maps.Map(document.getElementById('map'), {
		zoom: 4,
		center: uluru
	});
	// The marker, positioned at Uluru
	const marker = new google.maps.Marker({
		position: uluru,
		map: map
	});
}
