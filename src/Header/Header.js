import React from 'react';
import './Css/Header.css';
import { TRUCK_KEYS } from '../utils/Constants';
import SelectBox from '../SelectBox/SelectBox';

export default function Header(props) {
	function renderHeaderOptions(option) {
		return (
			<div
				className={
					props.selectedMode === option.key
						? 'headerOption-selected'
						: 'headerOption'
				}
				onClick={() => {
					if (option.key === props.selectedMode) return;
					props.updateSelectedMode(option.key);
				}}
			>
				<span>{option.label}</span>
				<span>{option.value}</span>
			</div>
		);
	}

	return (
		<div className="headerBase">
			{renderHeaderOptions({
				label: 'Total Trucks',
				value: props.counts.total,
				key: TRUCK_KEYS.total
			})}
			{renderHeaderOptions({
				label: 'Running Trucks',
				value: props.counts.running,
				key: TRUCK_KEYS.running
			})}
			{renderHeaderOptions({
				label: 'Stopped Trucks',
				value: props.counts.stopped,
				key: TRUCK_KEYS.stopped
			})}
			{renderHeaderOptions({
				label: 'Idle Trucks',
				value: props.counts.idle,
				key: TRUCK_KEYS.idle
			})}
			{renderHeaderOptions({
				label: 'Error Trucks',
				value: props.counts.error,
				key: TRUCK_KEYS.error
			})}

			<div className="headerSelectBoxContainer">
				<SelectBox
					totalDataStore={props.totalDataStore}
					data={props.activeData}
					updateSelectedData={value => props.updateSelectedData(value)}
					selectedMode={props.selectedMode}
				/>
			</div>
		</div>
	);
}
