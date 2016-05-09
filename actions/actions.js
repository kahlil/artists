import {camelCase} from 'lodash';
import {actionCreators} from './action-creators';

export class Actions {
	constructor(dispatcher, dataService) {
		this.dispatcher = dispatcher;
		this.dataService = dataService;
	}

	dispatchAction(stream, actionType) {
		let streamUpdated;

		switch (actionType) {
			case 'GET_DATA':
				streamUpdated = stream
					.do(() => this.dataService.getData());
				break;
			default:
				streamUpdated = stream;
		}

		streamUpdated
			.filter(() => Boolean(actionCreators[camelCase(actionType)]))
			.map(data => actionCreators[camelCase(actionType)](data))
			.subscribe(x => this.dispatcher.next(x));
	}
}
