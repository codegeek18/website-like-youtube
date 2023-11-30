const subscriptionReducer = ( state= {data:null}, action ) => {
    switch (action.type) {
        case 'POST_SUBSCRIPTION':
            return { ...state, data: action?.data };
        case 'FETCH_ALL_SUBSCRIPTIONS':
            return { ...state, data:action.payload };
        default:
            return state;
    }
};

export default subscriptionReducer;