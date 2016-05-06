import Rx from 'rxjs/Rx';
import $ from 'jquery';

// List of artists with images and music.
// The list is on the left and you get an image and music and maybe info
// about the artist on the right.

const artists = [
	{
		stageName: 'Bounty Killer',
		info: 'https://en.wikipedia.org/wiki/Bounty_Killer',
		img: 'http://www.largeup.com/wp-content/uploads/2014/11/Bounty-Killer-Martei-Korley-4.jpg',
		music: '',
	},
	{
		stageName: 'Busy Signal',
		info: 'https://en.wikipedia.org/wiki/Busy_Signal',
		img: 'https://i.ytimg.com/vi/ZXOzhIwVXQM/maxresdefault.jpg',
		music: '',
	},
	{
		stageName: 'Mavado',
		info: 'https://en.wikipedia.org/wiki/Mavado_(singer)',
		img: 'http://static.djbooth.net/pics-artist/mavado.jpg',
		music: '',
	},
];

const listContainer = $('<div class="list-container" style="height: 30px; background-color: whitesmoke">');
$('body').prepend(listContainer);

const clickList$ = Rx.Observable.fromEvent(listContainer, 'click');
clickList$.subscribe(x => console.log(x));

console.log($('body'), Rx, artists);
