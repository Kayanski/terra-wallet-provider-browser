const isFunction = (value: any) => typeof value === 'function';

function useState(obj: any) {
	let initialState = obj;
	const reducer = (fn:any) => {
		let newState;
		if (isFunction(fn)) {
			newState = fn(initialState);
		} else {
			newState = fn;
		}
		Object.assign(initialState, newState);
	};
	return [initialState, reducer];
}

export {
	useState
};