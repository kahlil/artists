import Rx from 'rxjs/Rx';
import $ from 'jquery';

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
import {styles} from './components/styles';
import {ArtistListComponent} from './components/artist-list';
import {ArtistDetailViewComponent} from './components/artist-detail-view';

/**
 * PREPARE THE DOM
 */
const list = $('<div class="list">');
const detailView = $('<div class="detail-view">');
const $head = $('head');
const $body = $('body');
$head.append(styles);
$body.prepend([list, detailView]);

/**
 * DISPATCHER
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
 * COMPONENTS
 */
new ArtistListComponent(store.state$, actions);
new ArtistDetailViewComponent(store.state$, actions);
actions.dispatchAction(Rx.Observable.of(''), 'GET_DATA');
