import React from 'react';
import styled from 'styled-components';
import { BsFillGridFill, BsList } from 'react-icons/bs';
import { useFilterContext } from '../context/filter_context';

const Sort = () => {
    const {gridView, setGridView, setListView, updateSort, filtered_products} = useFilterContext();
    return (
        <SortContainer>
            <div className='btn-container'>
                <button 
                    type='button' 
                    className={`${gridView ? 'active' : null}`}
                    onClick={setGridView}
                >
                    <BsFillGridFill/>
                </button>
                <button 
                    type='button' 
                    className={`${!gridView ? 'active' : null}`}
                    onClick={setListView}
                >
                    <BsList/>
                </button>
            </div>
            <p>{filtered_products.length} məhsul tapıldı</p>
            <hr />
            <form>
                <label htmlFor='sort'>Çeşidlə</label>
                <select
                    id='sort'
                    name='sort'
                    className='sort-input'
                    onChange={updateSort}
                >
                    <option value='price-lowest'>Qiymətə görə (əvvəlcə ucuz)</option>
                    <option value='price-highest'>Qiymətə görə (əvvəlcə bahalı)</option>
                    <option value='name-a'>Ada görə (a-z)</option>
                    <option value='name-z'>Ada görə (z-a)</option>
                </select>
            </form>
        </SortContainer>
    );
};

const SortContainer = styled.section`
    display: grid;
    grid-template-columns: auto auto 1fr auto;
    align-items: center;
    column-gap: 2rem;

    .btn-container {
        display: grid;
        grid-template-columns: 1fr 1fr;
        column-gap: 0.5rem;
        button {
            background: transparent;
            border: 1px solid #000;
            border-radius: 4px;
            width: 2rem;
            height: 2rem;
            font-size: 1.5rem;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .active {
            background: #222;
            color: #fff;
        }
    }

    .sort-input {
        border-color: transparent;
        font-size: 1rem;
        padding: 4px 5px;
        outline: none;
    }

    hr {
        border: none;
        border-top: 1px solid hsl(210, 31%, 80%);;
    }

    @media screen and (max-width: 980px) {
        grid-template-columns: 1fr;
        row-gap: 10px;

        .btn-container {
            grid-template-columns: 32px 32px;
        }
    }
`;

export default Sort;
