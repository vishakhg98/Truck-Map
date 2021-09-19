export const PUBLIC_IMAGE_PATH = '/assets/images/';

export const API_URL = process.env.REACT_APP_API_KEY;
export const GOOGLE_MAP_KEY = process.env.REACT_APP_GOOGLE_MAP_KEY;

export const fourHoursInMs = 4 * 60 * 60 * 1000;

export const getSecondsDiffBetweenTwoDates = (date1, date2) => {
	return Math.trunc(
		(new Date(date1).getTime() - new Date(date2).getTime()) / 1000
	);
};

export const TRUCK_KEYS = {
	total: 'total',
	running: 'running',
	stopped: 'stopped',
	idle: 'idle',
	error: 'error'
};
