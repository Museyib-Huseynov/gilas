import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useFilterContext } from '../context/filter_context';
import { CLEAR_FILTERS } from '../actions';
import { useProductsContext } from '../context/products_context';
import { useTranslation } from 'react-i18next';

const PageHeader = ({title, product}) => {
    const {fetchItems} = useProductsContext();
    const {dispatch} = useFilterContext();
    const {t} = useTranslation();
    return (
        <PageHeaderContainer>
            <h3>
                <Link to='/' onClick={() => {
                    dispatch({type: CLEAR_FILTERS});
                    fetchItems();
                }}>
                    {t('Əsas səhifə')}&#160;  
                </Link>
                {product && 
                <Link to='/products'
                    onClick={() => {
                        dispatch({type: CLEAR_FILTERS});
                    }}
                >
                    / {t('İcarəyə götür')}&#160;
                </Link>
                }
                / {t(`${title}`)}
            </h3>
        </PageHeaderContainer>
    );
};

const PageHeaderContainer = styled.section`
    display: flex;
    align-items: center;
    height: 60px;
    // background: #d6d6d6;

    h3 {
        font-size: 1.5rem;
        margin-left: 2rem;
        font-weight: 500;
    }

    a {
        color: #00C1FF;
    }

    @media screen and (max-width: 800px) {
        h3 {
            font-size: 1.2rem;
        }
    }

    @media screen and (max-width: 360px) {
        h3 {
            font-size: 1rem;
        }
    }   
`;

export default PageHeader;
