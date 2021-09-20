import React, { useEffect, useRef, useState } from 'react';
import './Css/SelectBox.css';
import Search from '../Search/Search';

export default function SelectBox(props) {
	const [selectedData, setSelectedData] = useState([]);
	const [searchValue, setSearchValue] = useState('');

	let initialRender = useRef(true);

	useEffect(() => {
		if (initialRender.current) {
			return;
		}
		// To update selected Mode to sidebar and map
		props.updateSelectedData(selectedData);
		// eslint-disable-next-line
	}, [selectedData]);

	useEffect(() => {
		if (initialRender.current) {
			initialRender.current = false;
			return;
		}
		// To reset selected list on selected mode change
		setSelectedData([]);
	}, [props.selectedMode]);

	function addToSelected(data) {
		let tempData = [...selectedData];
		tempData.push(data);

		setSelectedData(tempData);
	}

	function removeFromSelected(data) {
		let tempData = selectedData.filter(truck => {
			return truck.truckNumber !== data.truckNumber;
		});
		setSelectedData(tempData);
	}

	let filteredData = props.totalDataStore ? props.totalDataStore : [];
	if (searchValue) {
		filteredData = filteredData.filter(i =>
			i.truckNumber.toLowerCase().includes(searchValue.toLowerCase())
		);
	}
	if (selectedData.length) {
		filteredData = filteredData.filter(i => !selectedData.includes(i));
	}

	return (
		<div className="selectBoxBase" tabIndex="0">
			<div className="selectBox-head">
				Select <span className="selectBox-arrow">🢒</span>
			</div>
			<div className="selectBoxContentContainer">
				<ul className="selectBox-selectedContainer">
					{selectedData.map((truck, index) => (
						<li
							key={index}
							className="selectBox-selectedItem"
							onClick={() => removeFromSelected(truck)}
						>
							{truck.truckNumber}
						</li>
					))}
				</ul>

				<div className="selectBox-searchContainer">
					<Search
						updateSearch={value => setSearchValue(value)}
						fontSize={14}
						placeholder="Search..."
						border={`2px solid var(--select-border)`}
					/>
				</div>

				<ul className="selectBox-unselectedContainer">
					{filteredData.map((truck, index) => (
						<li
							key={index}
							className="selectBox-unselectedItem"
							onClick={() => addToSelected(truck)}
						>
							{truck.truckNumber}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
