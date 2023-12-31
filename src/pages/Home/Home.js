import React from "react";
import "./Home.css";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import ShowVideoGrid from "../../components/ShowVideoGrid/ShowVideoGrid";
import LoadingSpin from "react-loading-spin";
import { useSelector } from "react-redux";

const Home = () => {
  const vids = useSelector((state) => state.videoReducer)
    ?.data?.filter((q) => q)
    .reverse();

  const NavList = [
    "All",
    "Python",
    "Java",
    "C++",
    "Movies",
    "Science",
    "Animation",
    "Gaming",
    "Comedy",
  ];

  return (
    <div className="container_Pages_App">
      <LeftSidebar />
      <div className="container2_Pages_App">
        <div className="navigation_Home">
          {NavList.map((item) => (
            <p key={item} className="btn_nav_home">
              {item}
            </p>
          ))}
        </div>
        {!vids && (
          <div className="videoLoader">
            <LoadingSpin primaryColor="#3ea6ff" secondaryColor="transparent" />
            <span>Loading Videos...</span>
          </div>
        )}
        {vids && <ShowVideoGrid vids={vids} />}
      </div>
    </div>
  );
};

export default Home;
