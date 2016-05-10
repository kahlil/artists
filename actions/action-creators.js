export const actionCreators = {
	getData: () => ({
		type: 'GET_DATA',
	}),

	receiveData: data => ({
		type: 'RECEIVE_DATA',
		data,
	}),

	showDetails: id => ({
		type: 'SHOW_DETAILS',
		data: {id},
	}),

	toggleHearted: id => ({
		type: 'TOGGLE_HEARTED',
		data: {id},
	}),
};
