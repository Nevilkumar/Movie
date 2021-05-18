import React from 'react';
import './Header.css';
const Header = () => {
    return (
        <>
            <div className='header'>
                <span onClick = {() => window.scroll(0,0)}>Movie Flix</span>
            </div>
        </>
    );
}

export default Header;