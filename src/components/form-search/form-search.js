import React from 'react';

import './form-search.css';
import InputSearch from '../input-search/input-search';


export default (props) => {
	return (
		<div id={'parent'} >
			<InputSearch />
			<div className={'searchButton'}>
				<img src="https://avatars1.githubusercontent.com/u/34888048?s=200&v=4"/>
			</div>
		</div>
	);
}
