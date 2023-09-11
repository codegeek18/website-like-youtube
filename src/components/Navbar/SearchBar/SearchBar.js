import React, { useState } from 'react'
import './SearchBar.css';
import { FaSearch } from 'react-icons/fa';
import { BsMicFill } from 'react-icons/bs';
import SearchList from './SearchList';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchList, setSearchList] = useState(false);
  const titleArray = useSelector(state => state.videoReducer)?.data?.filter(q => q?.videoTitle.toUpperCase().includes(searchQuery.toUpperCase())).map(list => list?.videoTitle);

  return (
    <>
        <div className='SearchBar_Container'>
            <div className="SearchBar_Container2">
                <div className="search_div">
                    <input type="text" className='iBox_SearchBar' placeholder='Search' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onClick={() => setSearchList(true)} />
                    <Link to={`/search/${searchQuery}`}>
                    <FaSearch className='searchIcon_SearchBar' onClick={() => setSearchList(false)} />
                    </Link>
                    <BsMicFill className='Mic_SearchBar' />
                    { searchQuery && searchList && <SearchList titleArray={titleArray} setSearchQuery={setSearchQuery}/> }
                </div>
            </div>     
        </div>  
    </>
  )
}

export default SearchBar