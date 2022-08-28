// const HASH = `1b66a51bec5defc0147b9df468a2add8e0987052`;
// const HASH = `15a3004b48004148f2b3c5992cc70ca37b06be6f`;
// const HASH = `8B7A4FF7C46EFB0CE89831D21F5C4C3FE1ED5589`;
// const HASH = `2dca8e028d7ff766162a9cbc2002ce8c6ca04555`;
// const HASH = `a3fbda1961fbc908026ec7cc4569d5fbef840c1e`;
// const HASH = `99147a19c7c6b9d46ec835fda617345526291c81`;
// const HASH = `2dca8e028d7ff766162a9cbc2002ce8c6ca04555`;
// const HASH = `db2a2ac4b3db1b4fe0a76780124ca1e7404d5015`;
const DEFAULT_HASH = `db2a2ac4b3db1b4fe0a76780124ca1e7404d5015`;

const work = (hash, onclick) => {
	return fetch(`/api/getMetadata/${hash}`)
		.then((response) => response.json())
		.then((response) => {
			// then((response) => response.body)
			// 	.then((response) => {
			// 		const r = response.getReader();
			// 		return r.read()
			const files = response['files'];
			return createList(files, onclick);
		})
		.catch((err) => console.error(err));
};


const createList = (files, onclick) => {
	const ul = window.document.createElement('ul');

	files.forEach((file) => {
		const li = window.document.createElement('li');

		li.textContent = file.path;
		li.addEventListener('click', () => {
			onclick(file);
		});

		ul.appendChild(li);
		document.body.appendChild(ul);
	});
};


const loadButton = document.querySelector(`#download-file`);
const videoButton = document.querySelector(`#watch-video`);
const hashInput = document.querySelector(`#hash-input`);
hashInput.value = DEFAULT_HASH;

setTimeout(() => loadButton.click(), 1000);

loadButton.onclick = function () {
	const HASH = hashInput.value;
	work(HASH, (file) => {
		const magnet = encodeURIComponent(`magnet:?xt=urn:btih:${HASH}`);
		const filePath = encodeURIComponent(file.path);

		const anchor = document.createElement('a');

		anchor.href = `/api/download/${magnet}/${filePath}`;
		anchor.target = '_blank';
		anchor.download = file.name;

		anchor.click();
	});
};

videoButton.onclick = function () {
	const HASH = hashInput.value;
	work(HASH, (file) => {
		const filePath = encodeURIComponent(file.path);
		const video = document.createElement(`video`);

		video.style.height = `300px`;
		video.style.width = `300px`;
		video.setAttribute(`controls`, `true`);
		video.innerHTML = `<source src="${`/api/download/${HASH}/${filePath}`}" type="video/mp4">`

		document.body.appendChild(video);

		setTimeout(() => video.play(), 3000);
	});
};
