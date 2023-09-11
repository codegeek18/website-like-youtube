import React from "react";
import ShowVideoList from "../ShowVideoList/ShowVideoList";

const WHLVideoList = ({ page, videoList, currentUser }) => {
  return (
    <>
      {currentUser ? (
        <>
          {videoList?.data
            ?.filter((q) => q?.Viewer === currentUser)
            .reverse()
            .map((video) => (
              <ShowVideoList videoId={video?.videoId} key={video?.videoId} />
            ))}
        </>
      ) : (
        <>
          <h2 style={{ color: "white" }}>Please Login To See Your {page}</h2>
        </>
      )}
    </>
  );
};

export default WHLVideoList;
