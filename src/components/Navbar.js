import React, {useState} from 'react';
import {Link, NavLink, useHistory} from 'react-router-dom';
import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';
import logo from '../Logo-1.svg';
import { useFilterContext } from '../context/filter_context';
import { UPDATE_FILTERS, CLEAR_FILTERS } from '../actions';

const Navbar = () => {
    const [text, setText] = useState('');
    const {dispatch} = useFilterContext();
    let history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch({type: CLEAR_FILTERS});
        if (text !== '') {
            dispatch({type: UPDATE_FILTERS, payload: {name: 'text', value: text.toLowerCase()}});
            setText('');
            history.push('/products');
        }
    }

    return (
        <NavContainer>
                {/* logo start */}
                <Link to='/' className='logo-container'>
                    <img src={logo} alt='logo'  className='logo'/>
                </Link>    
                {/* logo end */}
                <div className='search-and-nav'>
                    {/* search form start */}
                    <form onSubmit={handleSubmit} className='form-search'>
                        <input 
                            type='text' 
                            placeholder='Məhsulu axtarın..' 
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                        <button type='submit'>
                            <FaSearch className='search-icon'/>
                        </button>
                    </form>
                    {/* search form end */}

                    {/* navlinks start */}
                    <div className='nav-links'>
                        <NavLink to='/products' className='link1' activeClassName='active'>
                        </NavLink>
                        <NavLink to='/newad' className='link2' activeClassName='active' />

                    </div>
                    {/* navlinks end */}
                </div>
                
        </NavContainer>
    )
};

const NavContainer = styled.nav`
    display: grid;
    grid-template-columns: 20rem 1fr;
    width: 100vw;
    height: 7rem;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1); 
    user-select: none;

    .search-and-nav {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr 0.8fr;
    }

    // ** logo start **
    .logo-container {
        display: block;
        width: 20rem;
        height: 7rem;
        justify-self: start;
    }

    .logo {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    // ** logo end **

    // ** search form start **
    .form-search {
        place-self: center;
        grid-row-start: 1;
        grid-row-end: 3;
    }
    .form-search input {
        width: 20rem;
        height: 2.5rem;  
        border: 1.5px solid #03b8f4;
        border-radius: 30px 0 0 30px;
        padding-left: 1rem;
        outline: none;
        caret-color: initial;
    }
    .form-search button {
        width: 3rem;
        height: 2.5rem;
        background-color: #03b8f4;
        border: 1.5px solid #00C1FF;
        border-left: none;
        border-radius: 0 30px 30px 0;
        cursor: pointer;
    }

    .form-search button .search-icon {
        height: 12px;
        color: #fff;
    }
    // ** search form end **

    // ** navlinks start **
    .nav-links {
        place-self: center;
        grid-row-start: 1;
        grid-row-end: 3;
    }

    .link1,
    .link2 {
        display: inline-block;
        width: 160px;
        height: 50px;
        border-radius: 10px;
        position: relative;
        overflow: hidden;
    }

    .link1 {
        margin-right: 40px;
    }

    .link2::before {
        content: '';
        width: 160px;
        height: 50px;
        position: absolute;
        background: conic-gradient(#03b8f4 25%, white 0 50%, #03b8f4 0 75%, white 0);
        animation: rotate 3s infinite linear;
    }

    @keyframes rotate {
        100% {
            transform: rotate(360deg);
        }
    }
    
    .link1::after,
    .link2::after {
        width: 156px;
        height: 46px;
        position: absolute;
        top: 2px;
        left: 2px;
        background: #fff;
        color: #000;
        display: grid;
        place-items: center;
        font-size: 1.2rem;
        border: 2px solid #03b8f4;
        border-radius: 5px;
    }

    .link1::after {
        content: 'İCARƏYƏ GÖTÜR';
        border: none;
    }

    .link2::after {
        content: 'İCARƏYƏ VER'
    }

    .link1:hover::after {
        font-weight: 700;
    }

    .link2:hover::after {
        background: #03b8f4;
        color: white;
    }

    .active {
        font-weight: 700;
    }
    // ** navlinks end **

    @media screen and (max-width: 1120px) {
        .form-search {
            grid-area: 2 / 1 / 3 / 3;
        }

        .nav-links {
            grid-area: 1 / 1 / 2 / 3;
        }
    }

    @media screen and (max-width: 800px) {
        display: none;
    }
`;

export default Navbar;
