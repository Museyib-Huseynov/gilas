import React from 'react';
import styled from 'styled-components';
import { Category } from '.';
import categories from '../data/categoriesList';

const Categories = () => {
    return (
        <CategoriesContainer>
            <h1>Bütün Kateqoriyalar</h1>
            <div className='container'>
                {categories.map((item, index) => {
                    const {name, Icon} = item;
                    return <Category key={index} name={name} Icon={Icon} />
                })}
            </div>
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
