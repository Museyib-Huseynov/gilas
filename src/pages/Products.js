import React from 'react';
import styled from 'styled-components';
import {Sort, GridView, ListView, Filters} from '../components';
import { useFilterContext } from '../context/filter_context';
import {PageHeader} from '../components';

const Products = () => {
    const {filtered_products, gridView} = useFilterContext();
    return (
        <>
            <PageHeader title='İcarəyə götür' />
            <ProductsContainer>
                <Filters />
                <div className='sort-and-products'>
                        <Sort />
                        {gridView ? 
                            <GridView products={filtered_products} /> :
                            <ListView products={filtered_products} />
                        }   
                </div>
            </ProductsContainer>
        </>
    );
};

const ProductsContainer = styled.main`
    display: grid;
    grid-template-columns: 200px auto;
    justify-content: center;
    align-items: start;
    column-gap: 20px;
    margin-top: 2rem;
    margin-bottom: 2rem;

    .sort-and-products {
        display: grid;
        grid-template-columns: 1416px;
        grid-template-rows: auto 1fr;
        row-gap: 20px;
    }

    @media screen and (max-width: 1700px) {
        .sort-and-products {
            grid-template-columns: 1180px;
        }
    }

    @media screen and (max-width: 1460px) {
        .sort-and-products {
            grid-template-columns: 944px;
        }
    }

    @media screen and (max-width: 1220px) {
        .sort-and-products {
            grid-template-columns: 708px;
        }
    }

    @media screen and (max-width: 980px) {
        .sort-and-products {
            grid-template-columns: 472px;
        }
    }

    @media screen and (max-width: 740px) {
        .sort-and-products {
            grid-template-columns: 332px;
        }
        grid-template-columns: auto;
        row-gap: 30px;
        // justify-content: start;
        // margin-left: 3rem;
    }

    @media screen and (max-width: 360px) {
        .sort-and-products {
            grid-template-columns: 232px;
        }
    }
`; 

export default Products;


