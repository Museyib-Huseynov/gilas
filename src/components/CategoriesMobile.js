import React from 'react';
import styled from 'styled-components';
import categories from '../data/categoriesList';

const CategoriesMobile = () => {
    return (
        <CategoriesMobileContainer>
            <select>
                <option>-- Bütün kateqoriyalar --</option>
                {categories.map((category) => {
                    const {name} = category;
                    return (
                        <option key={name}>
                            {name}
                        </option>
                    )
                })}
            </select>
            <span className='custom-arrow'></span>
        </CategoriesMobileContainer>
    );
};

const CategoriesMobileContainer = styled.div`
    width: 80%;
    margin: 1.5rem auto 0 auto;
    position: relative;
    // border: 2px solid red;

    select {
        // display: block;
        width: 100%;
        padding: 0.8em 1rem;
        font-size: 1em;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        color: white;
        background: #4d5061;
        border-radius: 5px;
        outline: none;
        border: none;
    }

    .custom-arrow {
        display: block;
        background: #3b3c47;
        height: 100%;
        width: 2.5rem;
        position: absolute;
        top: 0;
        right: 0;
        pointer-events: none;
    }

    .custom-arrow::before,
    .custom-arrow::after {
        content: "";
        position: absolute;
        width: 0;
        height: 0;
        left: 50%;
        transform: translateX(-50%);
        --size: .4rem;
        --color: rgba(255,255,255, .5);
    }

    .custom-arrow::before {
        border-left: var(--size) solid transparent;
        border-right: var(--size) solid transparent;
        border-bottom: var(--size) solid var(--color);
        top: 35%;
        
    }

    .custom-arrow::after {
        border-left: var(--size) solid transparent;
        border-right: var(--size) solid transparent;
        border-top: var(--size) solid var(--color);
        top: 55%;
    }

    @media screen and (min-width: 800px) {
        display: none;
    }
`;

export default CategoriesMobile;
