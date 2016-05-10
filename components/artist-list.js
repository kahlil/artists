import $ from 'jquery';
import Rx from 'rxjs/Rx';
import {ComponentBase} from './common';

export class ArtistListComponent extends ComponentBase {
	constructor(stream, actions) {
		super(stream, actions);
		this.element = '.list';
	}

	setupStreams() {
		const $body = $('body');
		const artistClick$ = Rx.Observable.create(observer => {
			$body.on('click', '.artist', e => observer.next($(e.target).data('id')));
		});
		this.actions.dispatchAction(artistClick$, 'SHOW_DETAILS');

		const heartedClick$ = Rx.Observable.create(observer => {
			$body.on('click', '.heart', e => observer.next($(e.target).parent().data('id')));
		});
		this.actions.dispatchAction(heartedClick$, 'TOGGLE_HEARTED');
	}

	generateHtml(data) {
		const dom = data
			.map(item => `
				<li data-id="${item.id}" class="artist">
					${item.stageName}
					<span class="heart ${item.hearted ? 'hearted' : ''}"></span>
				</li>
			`);
		dom.unshift('<ul>');
		dom.push('</ul>');
		return dom.join('');
	}
}
