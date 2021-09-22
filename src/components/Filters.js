import React from 'react';
import styled from 'styled-components';
import categories from '../data/categoriesList';
import { useFilterContext } from '../context/filter_context';
import {DoubleRangeSlider} from '.';

const Filters = () => {
    const {filters: {
            text, 
            category, 
            price, 
            max_price,
            min_price,
            min_price_limit},
        updateFilters,
        clearFilters} = useFilterContext();
    return (
        <FiltersContainer>
            <form>
                <input 
                    type='text' 
                    autoComplete='off'
                    name='text'
                    className='search-filter'
                    placeholder='Məhsulu axtarın' 
                    value={text}
                    onChange={updateFilters}
                />
                <div className='category-filter'>
                    <h4>Kateqoriyalar</h4>
                    <button 
                        type='button'
                        name={'category'} 
                        className={`${
                            category === 'Hamısı' ? 'cat-btn active' : 'cat-btn'
                          }`}
                          onClick={updateFilters}
                    >
                        Hamısı
                    </button>
                    {categories.map((c, index) => {
                        return (
                        <button 
                            key={index}
                            name={'category'} 
                            type='button'
                            className={`${
                                category === c.name ? 'cat-btn active' : 'cat-btn'
                              }`}
                            onClick={updateFilters}
                        >
                            {c.name}
                        </button>
                        );
                        
                    })}
                </div>
                <div className='price-filter'>
                    <h4>Qiymət</h4>
                    <div className='min-max-container'>
                        <input 
                            type='number' 
                            min={min_price}
                            max={max_price}
                            name='min_price_limit' 
                            value={min_price_limit} 
                            onChange={updateFilters} 
                            className='price-input' 
                        />
                        <input 
                            type='number' 
                            min={min_price}
                            max={max_price}
                            name='price' 
                            value={price} 
                            onChange={updateFilters} 
                            className='price-input' 
                        />
                    </div>
                    <DoubleRangeSlider />
                </div>
                <button
                    type='button'
                    className='clear-filters'
                    onClick={clearFilters}
                >
                    Filtiri təmizlə
                </button>
            </form>
        </FiltersContainer>
    );
};

const FiltersContainer = styled.section`
    position: sticky;
    top: 20px;
    height: 100vh;
    
    form {
        display: grid;
        grid-auto-flow: row;
        row-gap: 10px;
    }

    h4 {
        padding: 0.4rem 0;
    }

    .search-filter {
        background: hsl(210, 36%, 96%);
        padding: 0.5rem;
        border-radius: 4px;
        border-color: transparent;
        outline: none;
        caret-color: #000;
    }

    .category-filter {
        display: grid;
        grid-auto-flow: row;
    }

    .cat-btn {
        width: fit-content;
        color: #615f5f;
        padding: 0.4rem 0;
        background: transparent;
        border: none;
        cursor: pointer;
        text-align: left;
    }

    .active {
        border-bottom: 1px solid #615f5f;
    }

    .price-filter {
        display: grid;
        grid-auto-flow: row;
    }

    .min-max-container {
        width: 110px;
        display: flex;
        justify-content: space-between;
    }

    .price-input {
        width: 50px;
        padding: 5px;
        caret-color: #000;
        outline: none;
        border: 1px solid #615f5f;
        border-radius: 5px;
    }

    /* Chrome, Safari, Edge, Opera */ remove arrows from input number
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    /* Firefox */ remove arrows from input number
    input[type=number] {
    -moz-appearance: textfield;
    }

    .clear-filters {
        width: fit-content;
        padding: 5px;
        border: none;
        border-radius: 5px;
        background: #D50000;
        color: #fff;
        cursor: pointer;
        letter-spacing: 1px;
        user-select: none;
    }

    @media screen and (max-width: 740px) {
        position: initial;
        height: initial;
    }
`;

export default Filters;
