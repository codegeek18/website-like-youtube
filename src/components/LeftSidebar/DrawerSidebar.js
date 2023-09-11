import React from 'react'
import './LeftSidebar.css';
import { AiFillLike, AiFillPlaySquare, AiOutlineHome } from 'react-icons/ai';
import { MdOutlineExplore, MdOutlineVideoLibrary, MdOutlineWatchLater, MdSubscriptions } from 'react-icons/md';
import { FaHistory } from 'react-icons/fa';
import shorts from './shorts.png';
import { NavLink } from 'react-router-dom';

const DrawerSidebar = ({ toggleDrawer, toggleDrawerSidebar }) => {
  return (
    <div className='container_DrawerLeftSidebar' style={toggleDrawerSidebar}>
        <div className="container2_DrawerLeftSidebar">
            <div className='Drawer_leftsidebar'>
                <NavLink to='/' className="icon_sidebar_div">
                    <p>
                        <AiOutlineHome 
                            className='icon_sidebar' 
                            size={22}
                            style={{margin: "auto 0.7rem"}}
                        />
                        <span className="text_sidebar_icon">Home</span>
                    </p>
                </NavLink>
                <div className="icon_sidebar_div">
                    <p>
                        <MdOutlineExplore 
                            className='icon_sidebar' 
                            size={22}
                            style={{margin: "auto 0.7rem"}}
                        />
                        <span className="text_sidebar_icon">Explore</span>
                    </p>
                </div>
                <div className="icon_sidebar_div">
                    <p>
                        <img src={shorts}
                            className='icon_sidebar' 
                            width={22}
                            style={{margin: "auto 0.7rem"}}
                            alt='S'
                        />
                        <span className="text_sidebar_icon">Shorts</span>
                    </p>
                </div>
                <div className="icon_sidebar_div">
                    <p>
                        <MdSubscriptions
                            className='icon_sidebar' 
                            size={22}
                            style={{margin: "auto 0.7rem"}}
                        />
                        <span className="text_sidebar_icon">Subscriptions</span>
                    </p>
                </div>
            </div>
            <div className="libraryBtn_DrawerleftSidebar">
                <NavLink to='/library' className="icon_sidebar_div">
                    <p>
                        <MdOutlineVideoLibrary
                            className='icon_sidebar' 
                            size={22}
                            style={{margin: "auto 0.7rem"}}
                        />
                        <span className="text_sidebar_icon">Library</span>
                    </p>
                </NavLink>
                <NavLink to='/history' className="icon_sidebar_div">
                    <p>
                        <FaHistory
                            className='icon_sidebar' 
                            size={22}
                            style={{margin: "auto 0.7rem"}}
                        />
                        <span className="text_sidebar_icon">History</span>
                    </p>
                </NavLink>
                <NavLink to='/yourvideos' className="icon_sidebar_div">
                    <p>
                        <AiFillPlaySquare
                            className='icon_sidebar' 
                            size={22}
                            style={{margin: "auto 0.7rem"}}
                        />
                        <span className="text_sidebar_icon">Your Videos</span>
                    </p>
                </NavLink>
                <NavLink to='/watchlater' className="icon_sidebar_div">
                    <p>
                        <MdOutlineWatchLater
                            className='icon_sidebar' 
                            size={22}
                            style={{margin: "auto 0.7rem"}}
                        />
                        <span className="text_sidebar_icon">Watch Later</span>
                    </p>
                </NavLink>
                <NavLink to='/likedvideos' className="icon_sidebar_div">
                    <p>
                        <AiFillLike
                            className='icon_sidebar' 
                            size={22}
                            style={{margin: "auto 0.7rem"}}
                        />
                        <span className="text_sidebar_icon">Liked Videos</span>
                    </p>
                </NavLink>
            </div>
            <div className="subScriptions_lsdbar">
                <h3>Your Subscriptions</h3>
                <div className="channel_lsdbar">
                    <p>C</p>
                    <div>Channel</div>
                </div>
                <div className="channel_lsdbar">
                    <p>C</p>
                    <div>Channel</div>
                </div>
                <div className="channel_lsdbar">
                    <p>C</p>
                    <div>Channel</div>
                </div>
                <div className="channel_lsdbar">
                    <p>C</p>
                    <div>Channel</div>
                </div>
            </div>
        </div>
        <div className="container3_DrawerLeftSidebar" onClick={() => toggleDrawer()}>

        </div>
    </div>
  )
}

export default DrawerSidebar