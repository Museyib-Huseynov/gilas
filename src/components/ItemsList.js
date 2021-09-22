import React from 'react';
import styled from 'styled-components';
import {Items} from '.';
import {useHistory } from 'react-router-dom';
import categories from '../data/categoriesList';
import items from '../data/items';
import { useFilterContext } from '../context/filter_context';
import { UPDATE_FILTERS } from '../actions';

const ItemsList = () => {
    const {dispatch} = useFilterContext();
    let history = useHistory();

    const handleClick = (categoryName) => {
        dispatch({type: UPDATE_FILTERS, payload: {name: 'category', value: categoryName}});
        history.push('/products');
    }
    return (
        <>
            {categories.map((category) => {
                const {name} = category;
                const itemsPerCategoryArray = items.filter((item) => item.category === name);
                if (!itemsPerCategoryArray.length) return null;
                return (
                    <ItemsListContainer key={name}>
                        <h2>
                            {name} 
                            <span className='see-all' onClick={() => handleClick(name)}>
                                Hamısına Bax
                            </span>
                        </h2>
                        <Items items={itemsPerCategoryArray}/>
                    </ItemsListContainer>
                )
            })}
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
