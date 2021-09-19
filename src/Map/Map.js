import React, { useEffect } from 'react';
import { GOOGLE_MAP_KEY } from '../utils/Constants';
import './Css/Map.css';

let map;
let markers = [];

function initMap() {
	console.log('INIT MAP');

	// Center india location
	const centerLocation = { lat: 22.3, lng: 78.87 };

	map = new window.google.maps.Map(document.getElementById('map'), {
		zoom: 5,
		center: centerLocation,
		// mapTypeId: 'hybrid',
		disableDefaultUI: false
	});
}

// Adds a marker to the map and push to the array.
export function addMarker(position, title, markerColor) {
	let image;
	if (markerColor)
		image = `http://maps.google.com/mapfiles/ms/icons/${markerColor}-dot.png`;

	const marker = new window.google.maps.Marker({
		position,
		map,
		title: title,
		icon: image
	});

	markers.push(marker);
}

// Deletes all markers in the array by removing references to them.
export function deleteMarkers() {
	// Deleting each markers one by one
	markers.forEach(marker => marker.setMap(null));
	markers = [];
}

export function setMapCenterAndZoom(lat, lng, zoomLevel) {
	// Reducing zoom level to get zoom in effect
	map.setZoom(zoomLevel - 2);

	map.setCenter({ lat: lat, lng: lng });

	animateMapZoomTo(map, zoomLevel);
}

function animateMapZoomTo(map, targetZoom = 15) {
	var currentZoom = arguments[2] || map.getZoom();
	if (currentZoom !== targetZoom) {
		window.google.maps.event.addListenerOnce(
			map,
			'zoom_changed',
			function (event) {
				animateMapZoomTo(
					map,
					targetZoom,
					currentZoom + (targetZoom > currentZoom ? 1 : -1)
				);
			}
		);
		setTimeout(function () {
			map.setZoom(currentZoom);
		}, 80);
	}
}

export default function Map() {
	useEffect(() => {
		console.log('MAP LOADING');
		// Loading Map
		try {
			const script = document.createElement('script');
			script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_KEY}`;
			script.async = true;
			script.defer = true;
			script.type = 'text/javascript';
			script.onload = () => {
				initMap();
			};
			document.body.appendChild(script);
		} catch (err) {
			console.error(err);
		}
	}, []);

	return (
		<div
			id="map"
			// style={{ background: mapLoader && 'pink' }}
		/>
	);
}
