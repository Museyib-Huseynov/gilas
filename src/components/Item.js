import React, {useState} from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Item = (props) => {
    const [daily, setDaily] = useState(true);
    const {id, images, price, title, full_name, renting_type} = props;

    const {t} = useTranslation();

    let history = useHistory();
    const handleClick = () => {
        history.push(`/products/${id}`)
    }
    const day = price;
    const weekly = (price * 7 * 0.85).toFixed(2);
    return (
        <ItemContainer>
            <img src={images[0]?.image_path} alt={title} onClick={handleClick}/>
            <footer className='image-info'>
                <p className='name'>{title}</p>
                <div className='x'>
                    <select className='days' value={daily} onChange={(e)=>{setDaily(+e.target.value)}}>
                        <option value='1'>{t('Günlük')}</option>
                        <option value='0'>{t('Həftəlik')}</option>
                    </select>
                </div>
                <p className='buy'>{t('Satış')}</p>
                <div className='x'><p className='price'>{daily ? day : weekly} AZN</p></div>
                <p className='price'> - </p>
                {/* <p className='date'>{full_name}, {t('Günlük')}</p> */}
            </footer>
        </ItemContainer>
    )
};

const ItemContainer = styled.div`
    width: 220px;
    height: 300px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    border-radius: 10px;
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
        cursor: pointer;
    }

    .image-info {
        height:100px;
        // display: flex;
        // flex-direction: column;
        // justify-content: space-around;
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr 1fr 1fr;

        align-items: center;
        text-align: center;
    }

    .price {
        font-size: 1rem;
        font-weight: 600;
    }
    .name {
        font-weight: 500;
        color: #00C1FF;
        grid-area: 1 / 1 / 2 / 3;
    }
    .date {
        font-size: 0.8rem;
        color: #5F5F5F;
    }

    .days {
        text-align: center;
        border: none;
        outline: none;
        font-size: 1rem;
        font-weight: 0;
    }

    .buy {
        font-weight: 600
    }

    .x {
        height: 100%;
        border-right: 2px solid #000;
        display: flex;
        justify-content: center;
        align-items: center;
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
            font-size: 0.8rem;
        }
        .name {
            font-size: 0.9rem;
        }
        .date {
            font-size: 0.7rem;
        }
        .days {
            font-size: 0.8rem;
        }
        .buy {
            font-weight: 600;
            font-size: 0.8rem;
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
            font-size: .6rem;
        }
        .name {
            font-size: 0.7rem;
        }
        .date {
            font-size: 0.45rem;
        }
        .days {
            font-size: 0.6rem;
        }
        .buy {
            font-weight: 600;
            font-size: 0.6rem;
        }
    }
`;

export default Item;
