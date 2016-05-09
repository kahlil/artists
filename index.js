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
 * DISPATCHER 💫
 */
const dispatcher = new Rx.Subject();

/**
 * ACTIONS + DATA SERVICE
 */
const serverActions = new ServerActions(dispatcher);
const dataService = new DataService(serverActions);
const actions = new Actions(dispatcher, dataService);

/**
 * STORE
 */
const store = new Store(dispatcher);

/**
 * Setup artistListComponent output stream.
 */
const artistClick$ = Rx.Observable.create(observer => {
	$body.on('click', '.artist', e => observer.next($(e.target).data('id')));
});
actions.dispatchAction(artistClick$, 'SHOW_DETAILS');

/**
 * INIT COMPONENTS
 */
artistListComponent.init(store.state$);
artistDetailViewComponent.init(store.state$);
// Fire the initial action that fetches the data;
actions.dispatchAction(Rx.Observable.of(''), 'GET_DATA');
