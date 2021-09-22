import React, {useState, useEffect, useRef} from 'react';
import {Link, NavLink, useHistory} from 'react-router-dom';
import styled from 'styled-components';
import {AiOutlineMenu, AiOutlineSearch} from 'react-icons/ai';
import {FaTimes, FaAdversal} from 'react-icons/fa';
import {BsCollectionFill} from 'react-icons/bs';
import { useFilterContext } from '../context/filter_context';
import { UPDATE_FILTERS, CLEAR_FILTERS } from '../actions';
import logo from '../Logo-1.svg';

const Sidebar = () => {
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [isMenuActive, setIsMenuActive] = useState(false);
    const [text, setText] = useState('');

    const {dispatch} = useFilterContext();
    let history = useHistory();

    const linksContainerRef = useRef(null);
    const linksRef = useRef(null);

    useEffect(() => {
        const linksHeight = linksRef.current.getBoundingClientRect().height;
        if (isMenuActive) {
            linksContainerRef.current.style.height = `${linksHeight}px`;
        } else {
            linksContainerRef.current.style.height = '0px';
        }
      
    }, [isMenuActive]);


    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch({type: CLEAR_FILTERS});
        if (text !== '') {
            dispatch({type: UPDATE_FILTERS, payload: {name: 'text', value: text.toLowerCase()}});
            setText('');
            setIsSearchActive(false);
            history.push('/products');
        }
    }

    const handleSearchClick = () => {
        if (isMenuActive) setIsMenuActive(false);
        setIsSearchActive(!isSearchActive);
    }

    const handleMenuClick = () => {
        if (isSearchActive) setIsSearchActive(false);
        setIsMenuActive(!isMenuActive);
    }

    return (
        <SidebarContainer>
            {/* header start */}
            <div className='header'>
                <Link to='/' className='logo-container'>
                    <img src={logo} alt='logo'  className='logo'/>
                </Link>    
                <button 
                    type='button' 
                    className='toggle-search-btn'
                    onClick={handleSearchClick}
                >
                    {!isSearchActive ? <AiOutlineSearch /> : <FaTimes />}
                </button>
                <button 
                    type='button' 
                    className={`${!isMenuActive ? 'toggle-menu-btn' : 'toggle-menu-btn rotate'}`}
                    onClick={handleMenuClick}
                >
                    <AiOutlineMenu/>
                </button>
            </div>
            {/* header end */}
            {/* <hr /> */}

            {/* header-search start */}
            <form 
                onSubmit={handleSubmit} 
                className={`${isSearchActive ? 'header-search active-search' : 'header-search'}`}
            >
                <AiOutlineSearch className='icon' />
                <input 
                    type='text' 
                    placeholder='Məhsulu axtarın..' 
                    className='form-input' 
                    value={text}
                    onChange={(e) => setText(e.target.value)}    
                />
                <button type='submit'>Search</button>
            </form>
            {/* header-search end */}

            <div className='toggle-menu-container' ref={linksContainerRef}>
                <div className='toggle-menu' ref={linksRef} >
                    <NavLink to='/products' className='link' activeClassName='active-link' onClick={() => setIsMenuActive(false)}>
                        <BsCollectionFill style={{margin: '0 1rem'}}/> İcarəyə Götür
                    </NavLink>
                    <Link to='/newad' className='link' onClick={() => setIsMenuActive(false)}>
                        <FaAdversal style={{margin: '0 1rem'}}/> İcarəyə Ver
                    </Link>
                    {/* <Link to='/signUp' className='link' onClick={() => setIsMenuActive(false)}>
                        <HiUserAdd style={{margin: '0 1rem'}}/> Qeydiyyat
                    </Link> */}
                </div>
            </div>

        </SidebarContainer>      
    )
}

const SidebarContainer = styled.div`
    display: none;

    .header {
        display: grid;
        grid-template-columns: 10rem repeat(4, 1fr);
        height: 4rem;
        background: rgba(255,255,255, 1);
        position: relative;
        z-index: 1000;
    }

    // ** logo start **
    .logo-container {
        display: block;
        width: 10rem;
        height: 4rem;
        justify-self: start;
    }

    .logo {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    // ** logo end **

    // ** search and menu icons start**
    .toggle-search-btn,
    .toggle-menu-btn {
        font-size: 2rem;
        background: transparent;
        border-color: transparent;
        cursor: pointer;
        transition: transform .1s;
        outline: none;
    }
    .toggle-search-btn {
        grid-area: 1 / 4 / 2 / 5;
        justify-self: end;
    }
    .toggle-menu-btn {
        grid-area: 1 / 5 / 2 / 6;
        justify-self: center;
    }
    .rotate {
        transform: rotate(90deg);
    }
    // **search and menu icons end

    // ** header search start **
    .header-search {
        display: flex;
        width: 90vw;
        height: 0;
        overflow: hidden;
        margin: 0 auto;
        // border-bottom: 1px solid transparent;
        font-size: 1.5rem;
        transition: all .1s;
        
    }
    .header-search .icon {
        flex-grow: 1;
        caret-color: transparent;
    }
    .header-search input {
        flex-grow: 8;
        border: none;
        padding-left: 5px;
        outline: none;
        caret-color: #000;
    }
    .header-search button {
        flex-grow: 1;
        background: transparent;
        border: transparent;
        cursor: pointer;
    }
    .active-search {
        height: 1.8rem;
        border-bottom-color: #000;
        margin: .5rem auto;
    }
    // ** header search end **

    // ** menu start
    .toggle-menu-container {
        height: 0;
        overflow: hidden;
        transition: all .5s;
    }
    .toggle-menu {
        display: flex;
        flex-direction: column;
        background: rgba(0,0,0,0.8);
        width: 100%;
    }
    .link {
        color: #fff;
        font-size: 1.3rem;
        padding: .7rem;
        :hover {
            background-color: #202124;
        }
    }
    .active-link {
        background-color: #202124;
    }
    // ** menu end **

    hr {
        border: none;
        border-top: 1px solid hsl(210, 31%, 80%);
      }

    @media screen and (max-width: 800px) {
        display: initial;
    }
`;

export default Sidebar
