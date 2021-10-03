import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router';

const FormSuccess = () => {
    let history = useHistory();
    return (
        <FormSuccessContainer>
            <h1>Sizin elanınız yoxlanıldıqdan sonra sayta yerləşdiriləcəkdir</h1>
            <div>
            <button onClick={() => {history.push('/')}} target='_blank'>Əsas səhifə</button>
            <button onClick={() => {history.push('/newad')}}>Yeni elan yerləşdir</button>
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
