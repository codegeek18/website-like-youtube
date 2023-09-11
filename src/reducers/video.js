const videoReducer = (state= {data: null}, actions) => {
    switch (actions.type) {
        case 'POST_VIDEO':
            return {...state};
        case 'POST_LIKE':
            return {...state};
        case 'FETCH_ALL_VIDEOS':
            return {...state, data:actions.payload};
        default:
            return state;
    }
}

export default videoReducer;