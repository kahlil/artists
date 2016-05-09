import $ from 'jquery';

export const componentCommons = {
	render(data) {
		const html = this.generateHtml(data);
		$(this.element).html(html);
	},

	init(stream) {
		stream
			// .do(x => console.log(x))
			.subscribe(data => this.render(data));
	},
 };
