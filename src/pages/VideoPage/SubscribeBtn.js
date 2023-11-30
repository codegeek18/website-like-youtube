import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addToSubscriptions, deleteSubscription } from '../../actions/subscribeChannel';
import './SubscribeBtn.css';

const SubscribeBtn = ({ vc }) => {
    const currentUser = useSelector(state => state?.currentUserReducer);
    const dispatch = useDispatch();

    const [subscribed, setSubscribed] = useState(false);
    const isOptionValid = vc !== currentUser?.data?.result._id;

    const subscriberList = useSelector(state => state.subscriptionReducer);

    useEffect(() => {
      subscriberList?.data.filter( q => q?.ChannelSubscribed === vc && q?.Subscriber === currentUser?.data?.result._id).map(() => setSubscribed(true));
    }, [subscriberList?.data, currentUser?.data?.result._id, vc]);

    const toggleSubscription = () => {
        if (currentUser) {
          if (subscribed) {
            setSubscribed(false);
            dispatch(deleteSubscription({
              ChannelSubscribed: vc,
              Subscriber: currentUser?.data?.result._id,
            }))
          } else {
            setSubscribed(true);
            dispatch(addToSubscriptions({
              ChannelSubscribed: vc,
              Subscriber: currentUser?.data?.result._id,
            }));
          }
        } else {
            alert("Please Login to subscribe!");
        }   
    };

  return (
    <div>
      { isOptionValid ? !subscribed ? <button className="subscribe_btn" onClick={toggleSubscription}>Subscribe</button> : 
        <button className="subscribe_btn subscribed" onClick={toggleSubscription}>Subscribed ✔</button>:
        <></>
      }
    </div>
    
  )
}

export default SubscribeBtn