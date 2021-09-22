import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const PageHeader = ({title, product}) => {
    return (
        <PageHeaderContainer>
            <h3>
                <Link to='/'>Əsas səhifə </Link>
                {product && <Link to='/products'>/ İcarəyə götür </Link>}
                / {title}
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
