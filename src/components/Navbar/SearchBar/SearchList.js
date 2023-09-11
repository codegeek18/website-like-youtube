import React from 'react'
import { FaSearch } from 'react-icons/fa';
import './SearchList.css';

const SearchList = ({ titleArray, setSearchQuery }) => {
  return (
    <>
        <div className='Container_SearchList'>
            {
                titleArray.map(title => (
                    <p key={title} className='titleItem' onClick={(e) => setSearchQuery(title)}>
                        <FaSearch style={{color: "grey"}}/>
                        {title}
                    </p>
                ))
            }
        </div>
    
    </>
  )
}

export default SearchList