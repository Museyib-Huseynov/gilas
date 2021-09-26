import React, {useState} from 'react';
import styled from 'styled-components';
import {Items} from '.';
import {useHistory } from 'react-router-dom';
// import categories from '../data/categoriesList';
import items from '../data/items';
import { useFilterContext } from '../context/filter_context';
import { useProductsContext } from '../context/products_context';
import { UPDATE_FILTERS } from '../actions';
import axios from 'axios';
import ReactLoading from 'react-loading';

const items_url = 'https://gilas.hymeria.com/api/v1/items';

const ItemsList = () => {
    const {categories, items, items_loading} = useProductsContext();

    // const {dispatch} = useFilterContext();
    // let history = useHistory();

    // const handleClick = (categoryName) => {
    //     dispatch({type: UPDATE_FILTERS, payload: {name: 'category', value: categoryName}});
    //     history.push('/products');
    // }
    return (
        <>
            {categories.length ?
            items_loading ?
            <ReactLoading 
                type={'bubbles'} 
                color={'#03b8f4'} 
                width={'150px'} 
                height={'150px'} 
                className='loading' 
            /> :
            categories.map((category) => {
                const {id, title} = category;
                const itemsPerCategoryArray = items.filter((item) => item.category.id === id);
                if (!itemsPerCategoryArray.length) return null;
                return (
                    <ItemsListContainer key={id}>
                        <h2>
                            {title} 
                            <span className='see-all' onClick={() => {}}>
                                Hamısına Bax
                            </span>
                        </h2>
                        <Items items={itemsPerCategoryArray}/>
                    </ItemsListContainer>
                );
            }) : null}
        </>
    );
};

const ItemsListContainer = styled.div`
    height: 400px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    // border: 2px solid red;


    h2 {
        width: 1416px;
        color: #00C1FF;
    }

    .see-all{
        font-size: .8rem;
        font-weight: 400;
        color: inherit;
        text-decoration: underline;
        margin-left: .5rem;
        cursor: pointer;
    }

    h2+div {
        // border: 2px solid blue;
    }

    @media screen and (max-width: 1550px) {
        h2 {
            width: 1180px; // 220px*5(item length) + 16px*5(margin)
        }
    }

    @media screen and (max-width: 1350px) {
        h2 {
            width: 944px; // 220px*4(item length) + 16px*4(margin)
        }
    }

    @media screen and (max-width: 1150px) {
        h2 {
            width: 708px; // 220px*3(item length) + 16px*3(margin)
        }
    }

    @media screen and (max-width: 820px) {
        h2 {
            width: 472px; // 220px*2(item length) + 16px*2(margin)
        }
    }

    @media screen and (max-width: 580px) {
        height: 320px;
        h2 {
            width: 332px; // 150px*2(item length) + 16px*2(margin)
        }
    }    

    @media screen and (max-width: 360px) {
        height: 230px;
        h2 {
            width: 252px; // 110px*2(item length) + 16px*2(margin)
            font-size: 1rem;
        }
    }   
`;

export default ItemsList;
