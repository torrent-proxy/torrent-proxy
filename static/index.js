(function(window) {
	const HASH = `2dca8e028d7ff766162a9cbc2002ce8c6ca04555`;
	const createList = (files) => {
		const li = window.document.createElement('ul');
		files.forEach((file) => {
			const ul = window.document.createElement('li');
			ul.textContent = file.path;
			ul.addEventListener('click', () => {
				const magnet = encodeURIComponent(`magnet:?xt=urn:btih:${HASH}`);
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

	fetch(`http://localhost:8811/getMetadata/${HASH}`)
		.then((response) => response.json())
		.then((response) => {
			const files = response['files'];
			return createList(files);
		})
		.catch((err) => console.error(err));
})(window);
