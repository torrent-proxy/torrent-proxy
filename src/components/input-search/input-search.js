import React from 'react';
import {connect} from 'react-redux';

import './input-search.css';

const onKeyDown = (e) => {
	if (e.keyCode === 13) {
		console.log('do', e.target.value);
		const hash = e.target.value;
		e.target.value = '';
		if (!hash) {
			return;
		}

		const anchor = document.createElement('a');
		anchor.href = `http://192.168.1.41:9191/?hash=${hash}`;
		anchor.target = '_blank';
		anchor.download = 'File Name';

		console.log(anchor.href);
		anchor.click();
	}
};

export default connect(
	(state) => ({}),
	(dispatch) => ({})
)(
	(props) => {
		return (
			<input onKeyDown={onKeyDown} className={'search'} autoFocus />
		)
	}
);


// const files = []
// const stream = new TorrentStream(hash);
// stream.on('ready', (files) => {
// 	console.log(files);
//
// 	const fileStream = stream.creadStream(files[0]);
// });

