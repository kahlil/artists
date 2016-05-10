export const reducers = {
	receiveData: action => () => action.data,

	showDetails: (action, state) => state
		.map(item => {
			if (item.id === action.data.id) {
				item.open = true;
			} else {
				item.open = false;
			}
			return item;
		}),

	toggleHearted: (action, state) => state
		.map(item => {
			if (item.id === action.data.id) {
				item.hearted = !item.hearted;
			}
			return item;
		}),
};
