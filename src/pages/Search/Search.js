import React from 'react'
import '../Home/Home.css';
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar';
import ShowVideoGrid from '../../components/ShowVideoGrid/ShowVideoGrid';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const Search = () => {
  const { searchQuery } = useParams();  
  const vids = useSelector(state => state.videoReducer)?.data?.filter(q => q?.videoTitle.toUpperCase().includes(searchQuery.toUpperCase())).reverse();
 
  const NavList = [
    "All",
    "Python",
    "Java",
    "C++",
    "Movies",
    "Science",
    "Animation",
    "Gaming",
    "Comedy"
  ];

  return (
    <div className='container_Pages_App'>
      <LeftSidebar />
      <div className='container2_Pages_App'>
        <h2 style={{color:'white'}}>Search Results for {searchQuery}...</h2>
        <ShowVideoGrid vids={vids}/>
      </div>
    </div>
  )
}

export default Search