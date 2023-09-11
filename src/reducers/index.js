import { combineReducers } from "redux";
import authReducer from "./auth";
import currentUserReducer from "./currentUser";
import channelReducers from "./channel";
import videoReducer from "./video";
import likedVideoReducer from "./likedVideo";
import watchLaterReducer from "./watchLater";
import historyReducer from "./history";
import commentReducer from "./comments";

export default combineReducers({
    authReducer,
    currentUserReducer,
    channelReducers,
    videoReducer,
    likedVideoReducer,
    watchLaterReducer,
    historyReducer,
    commentReducer
});