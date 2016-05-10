import Rx from 'rxjs/Rx';
import {curry} from 'lodash';
import {reducers} from './reducers';

export class Store {
	constructor(dispatcher) {
		const receiveData$ = dispatcher
			.filter(action => action.type === 'RECEIVE_DATA')
			.map(action => reducers.receiveData(action));

		const showDetails$ = dispatcher
			.filter(action => action.type === 'SHOW_DETAILS')
			.map(action => curry(reducers.showDetails)(action));

		const toggleHearted$ = dispatcher
			.filter(action => action.type === 'TOGGLE_HEARTED')
			.map(action => curry(reducers.toggleHearted)(action));

		this._state$ = Rx.Observable
			.merge(
				receiveData$,
				showDetails$,
				toggleHearted$
			)
			.scan((state, reducer) => reducer(state), [])
			.publishReplay(1).refCount();
	}

	get state$() {
		return this._state$;
	}
}
