import * as express from 'express';
import * as jsdom from 'jsdom';
import * as fetch from 'node-fetch';

const RUTOR_URL = '37.1.203.156';

const { JSDOM } = jsdom;
const router = express.Router();

router.get('/categories', function(req, res) {
	const url = `http://${RUTOR_URL}/categories/`;

	console.log({url});

	return fetch(url)
		.then((response) => response.text())
		.then((body) => {
			console.log({body});
			const dom = new JSDOM(body);
			const category = Array.from(dom.window.document.querySelectorAll(`#content > h3:not(._1) > a`))
				.map((el: {textContent: string, href: string}) => ({
					name: el.textContent,
					src: el.href,
				}));
			console.log({category})
			res.json(category);
		})
		.catch((err) => res.send(err));
});

router.get('/search/:rr', function(req, res) {
	const query = req.params.rr;
	const baseUrl = `http://${RUTOR_URL}`;
	const url = `${baseUrl}/search/0/1/000/2/${query}`;

	return fetch(url)
		.then((r) => r.text())
		.then((body) => {
			const dom = new JSDOM(body);

			const itemsEl = dom.window.document.querySelectorAll(`.gai`);

			const items = Array.from(itemsEl)
				.map((el: any) => ({
					name: el.querySelector(`td > a:not(.downgif)`).text,
					size: el.querySelectorAll(`td`)[3].textContent.replace(` `, ` `),
					src: `${baseUrl}${el.querySelector(`td > a:not(.downgif)`).href}`,
				}))
				.filter((it) => it.name.indexOf(`1080`) > -1)
				.filter((it) => {
					const size = it.size.split(` `);
					console.log({size})
					if (size[1] !== `GB`) {
						return false;
					}

					if (Number(size[0]) < 7 && Number(size[0] > 2)) {
						return true;
					} else {
						console.log(Number(size[0]))
					}
				});

			console.log({items});

			const loadContentPagePromises = items.map((item) => {
				return fetch(item.src).then((r) => r.text());
			});

			return Promise.all(loadContentPagePromises)
				.then((ppp) => {
					const result = ppp.map((body, i) => {
						const dom = new JSDOM(body);
						// console.log({body})
						const magnet = dom.window.document.querySelector(`#download > a`).href;
						const hash = magnet.replace(`magnet:?xt=urn:btih:`, ``).slice(0, 40);

						return {
							...items[i],
							src: hash
						};
					});

					res.json(result);
				});
		});
});

export {router};
