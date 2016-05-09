import {mixin} from 'lodash';
import {componentCommons} from './common';

export const artistDetailViewComponent = mixin({
	element: '.detail-view',

	generateHtml(data) {
		return data
			.filter(item => item.open)
			.map(item => `
				<item>
					<h1>${item.stageName}</h1>
					<div>${item.info}</div>
					<div><img src="${item.img}" alt="" width="500" /></div>
				</div>
			`)[0];
	},
}, componentCommons);
