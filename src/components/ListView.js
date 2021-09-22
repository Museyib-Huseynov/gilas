import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ListView = ({products}) => {
    const [count, setCount] = useState(400);

    useEffect(() => {
        if (window.innerWidth < 1220) {
            setCount(200);
        }
        if (window.innerWidth < 980) {
            setCount(100);
        }
    }, []);

    console.log(count)
    return (
        <>
            {products.map((product) => {
                const {id, imgs, name, price, description} = product;
                return (
                    <ListViewContainer key={id}>
                        <img src={imgs[0]} alt={name} />
                        <div className='info'>
                            <h3>{name}</h3>
                            <h5 className='price'>{price} AZN</h5>
                            <p>{description.substring(0, count)}...</p>
                            <Link to={`/products/${id}`} className='btn'>
                                Ətraflı Bax
                            </Link>
                        </div>
                    </ListViewContainer>
                );
            })}
            {products.length < 1 && 
            <h3 style={{letterSpacing: '1px'}}>
                Bağışlayın, seçdiyiniz kreiteriya üzrə heç bir məhsul tapılmadı ...
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
        text-transform: uppercase;
        background: #00C1FF;
        color: #fff;
        width: 100px;
        padding: 0.2rem;
        border-radius: 5px;
        text-align: center;
    }

    .price {
        color: #00C1FF;
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
