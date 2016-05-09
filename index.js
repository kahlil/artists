import Rx from 'rxjs/Rx';
import $ from 'jquery';
import {mixin, camelCase} from 'lodash';

/**
 * SERVICE
 */
import {DataService} from './service/data-service';

/**
 * ACTIONS
 */
import {Actions} from './actions/actions';
import {ServerActions} from './actions/server-actions';

/**
 * STORE
 */
import {Store} from './store/store';

/**
 * COMPONENTS
 */
import {artistListComponent} from './components/artist-list';
import {artistDetailViewComponent} from './components/artist-detail-view';

/**
 * PREPARE THE DOM
 */
const list = $('<div class="list" style="width: 30%; float: left">');
const detailView = $('<div class="detail-view" style="width: 70%">');
const styles = `
	<style>
		.list li { cursor: pointer; }
	</style>
`;
const $head = $('head');
const $body = $('body');
$head.append(styles);
$body.prepend([list, detailView]);






/**
 * THE DATABASE 💿
 */
// const artists = [
// 	{
// 		id: 1,
// 		stageName: 'Bounty Killer',
// 		info: 'https://en.wikipedia.org/wiki/Bounty_Killer',
// 		img: 'http://www.largeup.com/wp-content/uploads/2014/11/Bounty-Killer-Martei-Korley-4.jpg',
// 		music: '',
// 	},
// 	{
// 		id: 2,
// 		stageName: 'Busy Signal',
// 		info: 'https://en.wikipedia.org/wiki/Busy_Signal',
// 		img: 'https://i.ytimg.com/vi/ZXOzhIwVXQM/maxresdefault.jpg',
// 		music: '',
// 	},
// 	{
// 		id: 3,
// 		stageName: 'Mavado',
// 		info: 'https://en.wikipedia.org/wiki/Mavado_(singer)',
// 		img: 'http://static.djbooth.net/pics-artist/mavado.jpg',
// 		music: '',
// 	},
// ];







// /**
//  * SERVICE
//  */
// class DataService {
// 	constructor(serverActions) {
// 		this.actions = serverActions;
// 	}
// 	getData() {
// 		// Normally an HTTP request goes here.
// 		this.actions.dispatchAction(Rx.Observable.of(artists), 'RECEIVE_DATA');
// 	}
// }











/**
 * DISPATCHER 💫
 */
const dispatcher = new Rx.Subject();













/**
 * ACTIONS 💥
 */

// const actionCreators = {
// 	getData: () => ({
// 		type: 'GET_DATA',
// 	}),
//
// 	receiveData: data => ({
// 		type: 'RECEIVE_DATA',
// 		data,
// 	}),
//
// 	showDetails: id => ({
// 		type: 'SHOW_DETAILS',
// 		data: {id},
// 	}),
// };

// class ServerActions {
// 	constructor(dispatcher) {
// 		this.dispatcher = dispatcher;
// 	}
//
// 	dispatchAction(stream, actionType) {
// 		stream
// 			.filter(() => Boolean(actionCreators[camelCase(actionType)]))
// 			.map(data => actionCreators[camelCase(actionType)](data))
// 			.subscribe(x => this.dispatcher.next(x));
// 	}
// }

const serverActions = new ServerActions(dispatcher);
const dataService = new DataService(serverActions);

// class Actions {
// 	constructor(dispatcher, dataService) {
// 		this.dispatcher = dispatcher;
// 		this.dataService = dataService;
// 	}
//
// 	dispatchAction(stream, actionType) {
// 		let streamUpdated;
//
// 		switch (actionType) {
// 			case 'GET_DATA':
// 				streamUpdated = stream
// 					.do(() => this.dataService.getData());
// 				break;
// 			default:
// 				streamUpdated = stream;
// 		}
//
// 		streamUpdated
// 			.filter(() => Boolean(actionCreators[camelCase(actionType)]))
// 			.map(data => actionCreators[camelCase(actionType)](data))
// 			.subscribe(x => this.dispatcher.next(x));
// 	}
// }

const actions = new Actions(dispatcher, dataService);







/**
 * STORE
 */

// class Store {
// 	constructor(dispatcher) {
// 		const showDetails$ = dispatcher
// 			.filter(action => action.type === 'SHOW_DETAILS')
// 			.map(action => state => {
// 				return state.map(item => {
// 					if (item.id === action.data.id) {
// 						item.open = true;
// 					} else {
// 						item.open = false;
// 					}
// 					return item;
// 				});
// 			});
//
// 		const receiveData$ = dispatcher
// 			.filter(action => action.type === 'RECEIVE_DATA')
// 			.map(action => () => action.data);
//
// 		this._state$ = Rx.Observable
// 			.merge(receiveData$, showDetails$)
// 			.scan((state, reducer) => reducer(state), [])
// 			.publishReplay(1).refCount();
// 	}
//
// 	get state$() {
// 		return this._state$;
// 	}
// }

const store = new Store(dispatcher);





/**
 * COMPONENTS
 */

/**
 * COMPONENT COMMONS
 */
// const componentCommons = {
// 	render(data) {
// 		const html = this.generateHtml(data);
// 		$(this.element).html(html);
// 	},
//
// 	init(stream) {
// 		console.log(stream);
// 		stream
// 		.do(data => console.log('in init', data))
// 		.subscribe(data => this.render(data));
// 	},
//  };
//
// /**
//  * THE LIST COMPONENT
//  */
// const artistListComponent = mixin({
// 	element: '.list',
//
// 	generateHtml(data) {
// 		const dom = data
// 			.map(item => `<li data-id="${item.id}" class="artist">${item.stageName}</li>`);
// 		dom.unshift('<ul>');
// 		dom.push('</ul>');
// 		return dom.join('');
// 	},
// }, componentCommons);

/**
 * Setup artistListComponent output stream.
 */
const artistClick$ = Rx.Observable.create(observer => {
	$body.on('click', '.artist', e => observer.next($(e.target).data('id')));
});
actions.dispatchAction(artistClick$, 'SHOW_DETAILS');
// artistClick$.subscribe(x => console.log(x));

/**
 * THE VIEW COMPONENT
 */
// const artistDetailViewComponent = mixin({
// 	element: '.detail-view',
//
// 	generateHtml(data) {
// 		return data
// 			.filter(item => item.open)
// 			.map(item => `
// 				<item>
// 					<h1>${item.stageName}</h1>
// 					<div>${item.info}</div>
// 					<div><img src=\"${item.img}\" alt="" width="500" /></div>
// 				</div>
// 			`)[0];
// 	},
// }, componentCommons);

/**
 * INIT APP
 */
artistListComponent.init(store.state$);
artistDetailViewComponent.init(store.state$);
actions.dispatchAction(Rx.Observable.of('GET_DATA'), 'GET_DATA');
