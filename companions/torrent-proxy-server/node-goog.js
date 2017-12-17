/**
 * Init goog.provide/goog.require stub.
 */
module.exports = () => {
	if (global.goog) {
		return;
	}

	global.goog = {};
	global.goog.provide = (ns) => {
		let parent = global;
		ns.split('.')
			.forEach((part, index, parts) => {
				if (parts.length - 1 > index) {
					parent[part] = parent[part] || {};
					parent = parent[part];
				}
			});
	};

	global.goog.require = (ns) => {
		let parent = global;
		ns.split('.')
			.forEach((part, index, parts) => {
				if (parts.length - 1 > index) {
					parent = parent[part];
				} else if (!parent ) {
					throw new Error(`Can't find "${ns}".`);
				}
			});
	};
};
