import React, {useState, useEffect, useRef} from 'react';
import {Link, NavLink, useHistory, useLocation} from 'react-router-dom';
import styled from 'styled-components';
import {AiOutlineMenu, AiOutlineSearch} from 'react-icons/ai';
import {FaTimes, FaAdversal} from 'react-icons/fa';
import {BsCollectionFill} from 'react-icons/bs';
import { useProductsContext } from '../context/products_context';
import { useFilterContext } from '../context/filter_context';
import { UPDATE_FILTERS, CLEAR_FILTERS } from '../actions';
import logo from '../Logo-1.svg';
import ReactCountryFlag from "react-country-flag";
import { useTranslation } from 'react-i18next';

const Sidebar = () => {
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [isMenuActive, setIsMenuActive] = useState(false);
    const [text, setText] = useState('');
    const [language, setLanguage] = useState('AZ');

    const {fetchItems} = useProductsContext();
    const {dispatch, filterAndSortProducts} = useFilterContext();
    let history = useHistory();
    let location = useLocation();

    const linksContainerRef = useRef(null);
    const linksRef = useRef(null);

    const {t, i18n} = useTranslation();

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
                <Link to='/' 
                    className='logo-container' 
                    onClick={() => {
                        dispatch({type: CLEAR_FILTERS})
                        setText('');
                        fetchItems();
                    }}
                >
                    <img src={logo} alt='logo'  className='logo'/>
                </Link>    
                {/* select language start */}
                <div className='flag'>
                    <ReactCountryFlag 
                        countryCode={language} 
                        svg
                        style={{
                            fontSize: '1.8em'
                        }}
                    />
                </div>
                <select 
                    className='language' 
                    value={language} 
                    onChange={(e) => {
                        setLanguage(e.target.value);
                        i18n.changeLanguage(e.target.value);
                    }}
                >
                    <option value='az'>AZ</option>
                    <option value='gb'>EN</option>
                    <option value='ru'>RU</option>
                    <option value='ge'>GE</option>
                </select>
                {/* select language end */}
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
                <button type='submit'>{t('Axtar')}</button>
            </form>
            {/* header-search end */}

            <div className='toggle-menu-container' ref={linksContainerRef}>
                <div className='toggle-menu' ref={linksRef} >
                    <NavLink 
                        to='/products' 
                        className='link' 
                        activeClassName='active-link' 
                        onClick={() => {
                            setIsMenuActive(false);
                            dispatch({type: CLEAR_FILTERS});
                            setText('');
                            if (location.pathname === '/products') {
                                filterAndSortProducts();
                            }
                        }}>
                        <BsCollectionFill style={{margin: '0 1rem'}}/> {t('İcarəyə götür')}
                    </NavLink>
                    <Link to='/newad' className='link' onClick={() => setIsMenuActive(false)}>
                        <FaAdversal style={{margin: '0 1rem'}}/> {t('İcarəyə ver')}
                    </Link>
                </div>
            </div>

        </SidebarContainer>      
    )
}

const SidebarContainer = styled.div`
    display: none;

    .header {
        display: grid;
        grid-template-columns: 10rem repeat(6, 1fr);
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
        grid-area: 1 / 6 / 2 / 7;
        justify-self: end;
    }
    .toggle-menu-btn {
        grid-area: 1 / 7 / 2 / 8;
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

    .flag {
        grid-area: 1 / 3 / 2 / 4 ;
        text-align: center;
        justify-self: end;
        align-self: center;
    }

    .language {
        width: 50px;
        height: 20px;
        font-size: 1rem;
        grid-area: 1 / 4 / 2 / 5 ;
        border: none;
        outline: none;
        // appearance: none;
        text-align: center;
        justify-self: start;
        align-self: center;
    }

    @media screen and (max-width: 800px) {
        display: initial;
    }
`;

export default Sidebar
