import {camelCase} from 'lodash';
import {actionCreators} from './action-creators';

export class ServerActions {
	constructor(dispatcher) {
		this.dispatcher = dispatcher;
	}

	dispatchAction(stream, actionType) {
		stream
			.filter(() => Boolean(actionCreators[camelCase(actionType)]))
			.map(data => actionCreators[camelCase(actionType)](data))
			.subscribe(x => this.dispatcher.next(x));
	}
}
