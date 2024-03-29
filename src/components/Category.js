import React from 'react';
import styled from 'styled-components';
import { useHistory} from 'react-router-dom';
import { useFilterContext } from '../context/filter_context';
import { UPDATE_FILTERS } from '../actions';
import { useTranslation } from 'react-i18next';

const Category = (props) => {
    const {name, id, Icon} = props;
    const {dispatch} = useFilterContext();
    const history = useHistory();

    const {t} = useTranslation();

    const handleClick = () => {
        dispatch({type: UPDATE_FILTERS, payload: {name: 'category', value: id}});
        history.push(`/products/categories/${id}`);
    }
    return (
        <CategoryContainer onClick={handleClick}>
            <Icon className='icon'/>
            <p>{t(`${name}`)}</p>
        </CategoryContainer>
    )
};

const CategoryContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    margin: 0 1rem;
    width: 120px;
    height: 120px;
    border: 1px solid #4B4B4B;
    color: #4B4B4B;
    cursor: pointer;
    user-select: none;
    position: relative;
    z-index: 0;

    &::before, &::after {
        content: '';
        position: absolute;
        background: #fff;
        z-index: -1;
        transition: .3s;
    }

    &::before {
        height: 120px;
        width: 60px;
    }

    &::after {
        height: 60px;
        width: 120px;
    }

    &:hover::before {
        width: 0px;
    }

    &:hover::after {
        height: 0px;
    }

    &:hover {
        border-width: 3px;
        color: #000;
    }

    .icon {
        font-size: 2.5rem;
    }

    p {
        font-size: 0.8rem;
        text-align: center;
        font-weight: 500;
        letter-spacing: 1px;
    }
`;

export default Category;
