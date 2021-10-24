import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import {ProductImagesGallery, PageHeader} from '../components';
import ReactLoading from 'react-loading';
import { useProductsContext } from '../context/products_context';
import { useTranslation } from 'react-i18next';

const SingleProduct = () => {
    const [daily, setDaily] = useState(true);
    const {single_item, single_item_loading, fetchSingleItem} = useProductsContext();
    const {images, title, price, description, category, full_name, phone_number} = single_item;

    const {t} = useTranslation();

    let {id} = useParams();
    useEffect(() => {
        fetchSingleItem(id);
    }, [])

    const day = price;
    const weekly = (price * 7 * 0.85).toFixed(2);

    return (
        <div>
            <PageHeader title={title} product/>
            <SingleProductContainer>
                {single_item_loading ? 
                    <ReactLoading 
                        type={'spinningBubbles'} 
                        color={'#03b8f4'} 
                        width={'150px'} 
                        height={'150px'}
                        className='loading'
                    /> :
                    <>
                        <Link to='/products' className='back-to-btn'>
                         Digər məhsullara bax
                        </Link>
                        <div className='product-center'>
                            <ProductImagesGallery images={images}/>   
                            <section className='product-content'>
                                <h2>{title}</h2>
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
                                <p className='description'>{description}</p>
                                <br/>
                                <hr/>
                                <p className='info'>
                                    <span>{t('Kateqoriya')}:</span>
                                    {category?.title}
                                </p>
                                <p className='info'>
                                    <span>{t('Məsul şəxs')}:</span>
                                    {full_name}
                                </p>
                                <p className='info'>
                                    <span>{t('Mobil')}:</span>
                                    {phone_number}
                                </p>
                            </section>
                        </div>
                    </>
                }
                
            </SingleProductContainer>
        </div>
    );
};

const SingleProductContainer = styled.main`
    max-width: 1300px;
    margin: 1rem auto;
    padding: 0 3rem;
    // border: 2px solid red;

    .back-to-btn {
        text-transform: uppercase;
        background: #00C1FF;
        color: #fff;
        padding: 0.375rem 0.75rem;
        letter-spacing: 0.1rem;
        display: inline-block;
        font-weight: 400;
        transition: all 0.3s linear;
        font-size: 0.875rem;
        cursor: pointer;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
        border-radius: 0.25rem;
        border-color: transparent;
    }

    .back-to-btn:hover {
        color: #000;
        background: #03b8f4;
    }

    .product-center {
        display: flex;
        justify-content: space-between;
        margin: 2rem 0;
        // border: 2px solid blue;
    }

    .product-content {
        width: 50%;
        padding: 1rem 0;
        // border: 2px solid green;
        h2 {
            font-size: 2rem;
            letter-spacing: 1px;
        };
        .price {
            color: #000;
            letter-spacing: 1px;
            margin: 1rem 0;
            font-weight: 700;
        }

        .description {
            letter-spacing: .5px;
            line-height: 2rem;
        }

        .info {
            text-transform: capitalize;
            width: 300px;
            margin: 2rem 0;
            display: grid;
            grid-template-columns: 150px 1fr;
            span {
              font-weight: 700;
            }
        }
    }

    .grid-price {
        width: 200px;
        display: grid;
        grid-template-columns: 1fr 1fr;
        align-items: center;
        text-align: center;
        margin-top: 2rem;
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
        border-right: 2px solid 
        #9a9a9a;
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

    @media screen and (max-width: 800px) {
        .product-center {
            flex-direction: column;
        }

        .product-content {
            width: 100%;
        }
    }

    @media screen and (max-width: 360px) {
        .back-to-btn {
            font-size: 0.65rem;
        }

        .product-content {
            padding: 1rem 0;
            // border: 2px solid green;
            h2 {
                font-size: 1.5rem;
            };
            .price {
                font-size: 1rem;
            }
    
            .description {
                font-size: 0.8rem;
                line-height: 1.5rem;
            }
    
            .info {
                width: 260px;
                font-size: 0.8rem;
            }
        }
    }
`;

export default SingleProduct;
