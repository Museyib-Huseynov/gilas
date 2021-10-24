import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ReactLoading from 'react-loading';
import { useFilterContext } from '../context/filter_context';
import { useTranslation } from 'react-i18next';

const ListView = ({products}) => {
    const {filtered_products_loading} = useFilterContext();
    const [count, setCount] = useState(400);
    
    const {t} = useTranslation();

    useEffect(() => {
        if (window.innerWidth < 1220) {
            setCount(200);
        }
        if (window.innerWidth < 980) {
            setCount(100);
        }
    }, []);

    if (filtered_products_loading) {
        return <ReactLoading 
            type={'cubes'} 
            color={'#03b8f4'} 
            width={'150px'} 
            height={'150px'} 
            className='loading'/>;
    }

 

    return (
        <>
            {products.map((product) => {
                const {id, images, title, price, description} = product;
                const [daily, setDaily] = useState(true);
                const day = price;
                const weekly = (price * 7 * 0.85).toFixed(2);
                return (
                    <ListViewContainer key={id}>
                        <img src={images[0]?.image_path} alt={title} />
                        <div className='info'>
                            <h3 className='title'>{title}</h3>
                            <div className='grid-price'>
                                <p className='buy line'>{t('İcarə')}</p>
                                <p className='buy'>{t('Satış')}</p>
                                <div className='line'>
                                    <select className='days' value={daily} onChange={(e)=>{setDaily(+e.target.value)}}>
                                        <option value='1'>{t('Günlük')}</option>
                                        <option value='0'>{t('Həftəlik')}</option>
                                    </select>
                                </div>
                                <p className='price center'> 2 AZN </p>
                                <div className='line'><p className='price'>{daily ? day : weekly} AZN</p></div>
                            </div>
                            <p>{description.length < count ? description : description.substring(0, count) + '...'}</p>
                            <Link to={`/products/${id}`} className='btn'>
                                {t('Ətraflı Bax')}
                            </Link>
                        </div>
                    </ListViewContainer>
                );
            })}
            {products.length < 1 && 
            <h3 style={{letterSpacing: '1px'}}>
                {t('Bağışlayın, seçdiyiniz kriteriya üzrə heç bir məhsul tapılmadı')} ...
            </h3>}
        </>
    );
};

const ListViewContainer = styled.article`
    display: grid;
    grid-auto-flow: column;
    column-gap: 20px;
    margin-left: 8px;

    img {
        width: 300px;
        height: 200px;
        object-fit: cover;
        border-radius: 5px;
    }

    .info {
        height: 200px;
        display: grid;
        align-content: space-evenly;
        width: 1088px; // 220*6 + 16*6 - 300 - 20 - 8
    }

    .btn {
        font-size: 0.8rem;
        // text-transform: uppercase;
        background: #00C1FF;
        color: #fff;
        width: 100px;
        padding: 0.2rem;
        border-radius: 5px;
        text-align: center;
    }

    .title {
        color: #00C1FF;
    }

    .grid-price {
        width: 200px;
        display: grid;
        grid-template-columns: 1fr 1fr;
        align-items: center;
        text-align: center;
    }

    .buy {
        height: 100%;
        font-weight: 600;
        font-size: 1.1rem;
        // border-top: 1px solid #000;
    }

    .center {
        grid-area: 2 / 2 / 4 / 3;
        font-size: 1.2rem;
    }

    .line {
        height: 100%;
        border-right: 1px solid #03b8f4;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .days {
        text-align: center;
        border: none;
        outline: none;
        font-size: 0.9rem;
        font-weight: 0;
    }

    @media screen and (max-width: 1700px) {
        .info {
            width: 852px; // 220*5 + 16*5 - 300 - 20 - 8
        }
    }

    @media screen and (max-width: 1460px) {
        .info {
            width: 616px; // 220*4 + 16*4 - 300 - 20 - 8
        }
    }

    @media screen and (max-width: 1220px) {
        .info {
            width: 380px; // 220*3 + 16*3 - 300 - 20 - 8
        }
    }

    @media screen and (max-width: 980px) {
        img {
            width: 200px;
            height: 200px;
        }
    
        .info {
            width: 244px; // 220*6 + 16*6 - 300 - 20 - 8
        }
    }

    @media screen and (max-width: 740px) {
        grid-auto-flow: row;
        img {
            width: 332px;
            height: 200px;
        }
    
        .info {
            width: 244px; // 220*6 + 16*6 - 300 - 20 - 8
        }
    }
`;

export default ListView;
