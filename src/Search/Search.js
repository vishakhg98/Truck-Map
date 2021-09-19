import './Css/Search.css';

export default function Search(props) {
	return (
		<div className="searchBase">
			<input
				type="search"
				placeholder="Search Trucks"
				onChange={e => props.updateSearch(e.target.value)}
			/>
		</div>
	);
}
