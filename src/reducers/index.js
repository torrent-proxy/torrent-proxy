import {combineReducers} from 'redux';

import files from './files';


/**
 * @return {Reducer<any>}
 */
export default () => combineReducers({
	files: files()
});
