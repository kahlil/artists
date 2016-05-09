import Rx from 'rxjs/Rx';
import {artists} from './data';

export class DataService {
	constructor(serverActions) {
		this.actions = serverActions;
	}
	getData() {
		// Normally an HTTP request goes here.
		this.actions.dispatchAction(Rx.Observable.of(artists), 'RECEIVE_DATA');
	}
}
