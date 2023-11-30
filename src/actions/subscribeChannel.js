import * as api from "../api";

export const addToSubscriptions = (subscribeData) => async (dispatch) => {
    try {
        const data = await api.addToSubscriptions(subscribeData);
        dispatch(getAllSubscriptions());
        // dispatch({ type: "POST_SUBSCRIPTION", data });
    } catch (error) {
        console.log(error);
    }
};

export const getAllSubscriptions = () => async (dispatch) => {
    try {
        const { data } = await api.getAllSubscriptions();
        dispatch({ type: 'FETCH_ALL_SUBSCRIPTIONS', payload: data });
    } catch (error) {
        console.log(error);   
    }
};

export const deleteSubscription = (subscriptionData) => async (dispatch) => {
    try {
        const {ChannelSubscribed, Subscriber} = subscriptionData;
        await api.deleteSubscription(ChannelSubscribed, Subscriber);
        dispatch(getAllSubscriptions());
    } catch (error) {
        console.log(error);   
    }
};