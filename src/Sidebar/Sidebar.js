import React, { useState } from 'react';
import './Css/Sidebar.css';
import Search from '../Search/Search';
import { getSecondsDiffBetweenTwoDates } from '../utils/Constants';

export default function Sidebar(props) {
	const [searchValue, setSearchValue] = useState('');

	const nowDateTime = new Date();

	function getTimeDifference(timeInMs) {
		const secondsBetweenTwoDate = getSecondsDiffBetweenTwoDates(
			nowDateTime,
			timeInMs
		);

		// If whithin 1 min
		if (secondsBetweenTwoDate < 60) return `${secondsBetweenTwoDate} sec`;
		// If whithin 1 hr
		else if (secondsBetweenTwoDate < 60 * 60)
			return `${Math.trunc(secondsBetweenTwoDate / 60)} min`;
		// If whithin 1 day
		else if (secondsBetweenTwoDate < 60 * 60 * 24)
			return `${Math.trunc(secondsBetweenTwoDate / 60 / 60)} hr`;
		else return `${Math.trunc(secondsBetweenTwoDate / 60 / 60 / 24)} day`;
	}

	let filteredData = props.data;
	if (searchValue) {
		filteredData = props.data.filter(i =>
			i.truckNumber.toLowerCase().includes(searchValue.toLowerCase())
		);
	}

	return (
		<div className="sidebarBase">
			<div className="sidebarSearchContainer">
				<Search
					updateSearch={string => setSearchValue(string)}
					fontSize={18}
					placeholder="Search Trucks"
				/>
			</div>

			<div className="sidebarRows">
				{filteredData.length
					? filteredData.map((truck, index) => {
							return (
								<div
									className={
										truck.status === 'error' ? 'sidebarRow-error' : 'sidebarRow'
									}
									key={index}
								>
									<div className="sidebar-truckLeft">
										<h3 className="sidebar-truckNumber">
											{truck.truckNumber}
											<span className="sidebar-truckIcon">
												{/* &#xfe0e; for coloring of truck */} 🚚&#xfe0e;
											</span>
										</h3>

										<p className="sidebar-lastStopRunningTime">
											{truck.status === 'running' ? 'Running' : 'Stopped'} since
											last {getTimeDifference(truck.stopStartTime)}
										</p>
									</div>

									<div className="sidebar-truckRight">
										<small className="sidebar-lastTruckUpdateTime">
											{getTimeDifference(truck.createTime)}
										</small>
										<p className="sidebar-truckSpeed">
											{truck.status === 'running' &&
												truck.speed.toFixed(2) + ' k/h'}
										</p>
									</div>
								</div>
							);
					  })
					: ''}
			</div>
		</div>
	);
}
