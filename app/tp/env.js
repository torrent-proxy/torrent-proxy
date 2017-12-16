goog.provide('tp.env');

/**
 * @define {string} Values: dev, test, prod
 */
const ENVIRONMENT = 'dev';

/**
 * @struct
 */
tp.env = {
	getName: () => {
		return ENVIRONMENT;
	},

	isDev: () => {
		return ENVIRONMENT === 'dev';
	},

	isTest: () => {
		return ENVIRONMENT === 'test';
	},

	isProd: () => {
		return ENVIRONMENT === 'prod';
	}
};
