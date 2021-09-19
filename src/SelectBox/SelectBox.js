import React, { useState } from 'react';
import Search from '../Search/Search';
import './Css/SelectBox.css';

export default function SelectBox(props) {
	const [selectedData, setSelectedData] = useState([]);
	const [searchValue, setSearchValue] = useState('');

	function addToSelected(data) {
		let tempData = [...selectedData];
		tempData.push(data);

		setSelectedData(tempData);
	}

	let filteredData = props.data;
	if (searchValue) {
		filteredData = props.data.filter(i =>
			i.truckNumber.toLowerCase().includes(searchValue.toLowerCase())
		);
	}
	if (selectedData.length) {
		filteredData = filteredData.filter(el => !selectedData.includes(el));
	}

	return (
		<div className="selectBoxBase" tabIndex="0">
			<div className="selectBox-head">
				Select <span className="selectBox-arrow">⮟</span>
				<span>{selectedData.length ? selectedData.length : ''}</span>
			</div>
			<div className="selectBoxContentContainer">
				<ul className="selectBox-selectedContainer">
					{selectedData.map(i => (
						<li className="selectBox-selectedItem">{i.truckNumber}</li>
					))}
				</ul>
				<Search updateSearch={value => setSearchValue(value)} />
				<ul className="selectBox-unselectedContainer">
					{filteredData.map(truck => (
						<li
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
