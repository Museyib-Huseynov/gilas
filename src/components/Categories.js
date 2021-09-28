import React from 'react';
import styled from 'styled-components';
import {Category, Error} from '.';
import { useProductsContext } from '../context/products_context';
import ReactLoading from 'react-loading';
import * as icons from 'react-icons/fa';

const Categories = () => {
    const {categories_loading, categories_error, categories} = useProductsContext();
    return (
        <CategoriesContainer>
            {categories_loading ? 
            <ReactLoading type={'bars'} color={'#03b8f4'} width={'150px'} height={'150px'} /> :
            categories_error ?
            <Error /> :
            <>
                <h1>Bütün Kateqoriyalar</h1>
                <div className='container'>
                    {categories.map((category) => {
                        const {id, title, icon} = category;
                        let Icon = icons[icon];
                        return <Category key={id} id={id} name={title} Icon={Icon}/>
                    })}
                
                </div>
            </> 
            }
        </CategoriesContainer>
    )
};

const CategoriesContainer = styled.div`
    height: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    // border: 2px solid red;

    h1 {
        text-transform: uppercase;
        font-size: 1.5rem;
        color: #00C1FF;
        letter-spacing: 2px;
    }

    .container {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        align-content: space-evenly;
        width: 800px;
        height: 320px;
        // border: 2px solid red;
    }

    @media screen and (max-width: 800px) {
        display: none;
    }
`;

export default Categories;
