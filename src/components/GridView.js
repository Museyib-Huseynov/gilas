import React from 'react';
import styled from 'styled-components';
import {Item} from '../components';
import ReactLoading from 'react-loading';
import { useFilterContext } from '../context/filter_context';
import { useTranslation } from 'react-i18next';

const GridView = ({products}) => {
    const {filtered_products_loading} = useFilterContext();
    const {t} = useTranslation();
    if (filtered_products_loading) {
        return (
            <ReactLoading 
            type={'cubes'} 
            color={'#03b8f4'} 
            width={'150px'} 
            height={'150px'} 
            className='loading'
            />
        );
    }
    return (
        <GridViewContainer>
            {products.map((product) => {
                        return <Item key={product.id} {...product} />
            })}
            {products.length < 1 && 
            <h3 style={{letterSpacing: '1px'}}>
                {t('Bağışlayın, seçdiyiniz kriteriya üzrə heç bir məhsul tapılmadı')} ...
            </h3>}
        </GridViewContainer>
    );
};

const GridViewContainer = styled.section`
    display: grid;
    grid-template-columns: repeat(6, auto);
    justify-content: start;
    row-gap: 20px;

    @media screen and (max-width: 1700px) {
        grid-template-columns: repeat(5, auto);
    }

    @media screen and (max-width: 1460px) {
        grid-template-columns: repeat(4, auto);
    }

    @media screen and (max-width: 1220px) {
        grid-template-columns: repeat(3, auto);
    }

    @media screen and (max-width: 980px) {
        grid-template-columns: repeat(2, auto);
    }
`;

export default GridView;
