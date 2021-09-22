import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const Item = (props) => {
    const {id, imgs, price, name, location, date} = props;
    
    let history = useHistory();
    const handleClick = () => {
        history.push(`/products/${id}`)
    }
    return (
        <ItemContainer onClick={handleClick}>
            <img src={imgs[0]} alt={name}/>
            <footer className='image-info'>
                <p className='price'>{price} AZN</p>
                <p className='name'>{name}</p>
                <p className='date'>{location}, {date}</p>
            </footer>
        </ItemContainer>
    )
};

const ItemContainer = styled.div`
    width: 220px;
    height: 300px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    border-radius: 10px;
    cursor: pointer;
    overflow: hidden;
    flex-shrink: 0;
    margin: 0 .5rem;

    &:hover {
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    }

    img {
        display: block;
        width: 100%;
        height: 200px;
        object-fit: cover;
    }

    .image-info {
        height:100px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        text-align: center;
    }

    .price {
        font-size: 1.5rem;
        font-weight: 600;
    }
    .name {
        font-weight: 500;
        color: #00C1FF;
    }
    .date {
        font-size: 0.8rem;
        color: #5F5F5F;
    }

    @media screen and (max-width: 580px) {
        width: 150px;
        height: 230px;

        img {
            height: 150px;
        }

        .image-info {
            height:70px;
        }

        .price {
            font-size: 1.2rem;
        }
        .name {
            font-size: 0.9rem;
        }
        .date {
            font-size: 0.7rem;
        }
    }

    @media screen and (max-width: 360px) {
        width: 100px;
        height: 155px;

        img {
            height: 100px;
        }

        .image-info {
            height:50px;
        }

        .price {
            font-size: .85rem;
        }
        .name {
            font-size: 0.7rem;
        }
        .date {
            font-size: 0.45rem;
        }
    }
`;

export default Item;
