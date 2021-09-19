import React from 'react';
import Search from '../Search/Search';
import './Css/SelectBox.css';

export default function SelectBox(props) {
	return (
		<div className="selectBoxBase" tabindex="0">
			<div className="selectBox-head">
				Select <span className="selectBox-arrow">⮟</span>
			</div>
			<div className="selectBoxContentContainer">
				<ul className="selectBox-selectedContainer">
					<li className="selectBox-selectedItem">Truck 0</li>
				</ul>
				<Search updateSearch={value => console.log(value)} />
				<ul className="selectBox-unselectedContainer">
					<li className="selectBox-unselectedItem">Truck 1</li>
					<li className="selectBox-unselectedItem">Truck 2</li>
				</ul>
			</div>
		</div>
	);
}
