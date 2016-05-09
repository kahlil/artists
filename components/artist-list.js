import {mixin} from 'lodash';
import {componentCommons} from './common';

export const artistListComponent = mixin({
	element: '.list',

	generateHtml(data) {
		const dom = data
			.map(item => `<li data-id="${item.id}" class="artist">${item.stageName}</li>`);
		dom.unshift('<ul>');
		dom.push('</ul>');
		return dom.join('');
	},
}, componentCommons);
