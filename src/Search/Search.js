import './Css/Search.css';

export default function Search(props) {
	return (
		<div className="searchBase">
			<input
				style={{ fontSize: props.fontSize, border: props.border }}
				type="search"
				placeholder={props.placeholder ? props.placeholder : 'Search'}
				onChange={e => props.updateSearch(e.target.value)}
			/>
		</div>
	);
}
