import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router';
import { useProductsContext } from '../context/products_context';

const FormSuccess = () => {
    let history = useHistory();
    const {fetchItems} = useProductsContext();
    return (
        <FormSuccessContainer>
            <h1>Sizin elanınız yoxlanıldıqdan sonra sayta yerləşdiriləcəkdir</h1>
            <div>
            <button onClick={() => {
                fetchItems();
                history.push('/');
            }}>
                Əsas səhifə
            </button>
            <button onClick={() => {history.push('/newad')}}>
                Yeni elan yerləşdir
            </button>
            </div>
        </FormSuccessContainer>
    );
};

const FormSuccessContainer = styled.div`
    display: flex;
    height:50vh;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h1 {
        font-size: 1.5rem;
        text-align: center;
    }

    button {
        font-size: 1rem;
        padding: 1rem;
        border: none;
        border-radius: 10px;
        background: #03b8f4;
        color: #fff;
        margin: 1rem;
        cursor: pointer;
    }
`;

export default FormSuccess;
