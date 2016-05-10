import {ComponentBase} from './common';

export class ArtistDetailViewComponent extends ComponentBase {
	constructor(stream) {
		super(stream);
		this.element = '.detail-view';
	}

	generateHtml(data) {
		return data
			.filter(item => item.open)
			.map(item => `
				<item>
					<h1>${item.stageName}</h1>
					<p>
						<a href="${item.info}">More Info</a>
					</p>
					<div><img src="${item.img}" alt="" width="500" /></div>
				</div>
			`)[0];
	}
}
