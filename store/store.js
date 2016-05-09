import Rx from 'rxjs/Rx';

export class Store {
	constructor(dispatcher) {
		const showDetails$ = dispatcher
			.filter(action => action.type === 'SHOW_DETAILS')
			.map(action => state => {
				return state.map(item => {
					if (item.id === action.data.id) {
						item.open = true;
					} else {
						item.open = false;
					}
					return item;
				});
			});

		const receiveData$ = dispatcher
			.filter(action => action.type === 'RECEIVE_DATA')
			.map(action => () => action.data);

		this._state$ = Rx.Observable
			.merge(receiveData$, showDetails$)
			.scan((state, reducer) => reducer(state), [])
			.publishReplay(1).refCount();
	}

	get state$() {
		return this._state$;
	}
}
