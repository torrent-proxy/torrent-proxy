(function(window) {
	const createList = (files) => {
		const li = window.document.createElement('li');
		files.forEach((file) => {
			const ul = window.document.createElement('ul');
			ul.textContent = file.path;
			ul.addEventListener('click', () => {
				const magnet = encodeURIComponent('magnet:?xt=urn:btih:36e7b4f8352da088bca8a6716ce19c531883a045&dn=rutor.info_Savoy+Brown+-+Witchy+Feelin\'+(2017)+MP3+от+Vanila&tr=udp://opentor.org:2710&tr=udp://opentor.org:2710&tr=http://retracker.local/announce');
				const filePath = encodeURIComponent(file.path);

				const anchor = document.createElement('a');
				anchor.href = `http://localhost:8811/download/${magnet}/${filePath}`;
				anchor.target = '_blank';
				anchor.download = file.name;

				anchor.click();
			});

			li.appendChild(ul);
			document.body.appendChild(li);
		});
	};

	fetch(`http://localhost:8811/rnd2/magnet:?xt=urn:btih:36e7b4f8352da088bca8a6716ce19c531883a045&dn=rutor.info_Savoy+Brown+-+Witchy+Feelin'+(2017)+MP3+от+Vanila&tr=udp://opentor.org:2710&tr=udp://opentor.org:2710&tr=http://retracker.local/announce`)
		.then((response) => response.json())
		.then((response) => {
			const files = response['files'];
			return createList(files);
		})
})(window);
