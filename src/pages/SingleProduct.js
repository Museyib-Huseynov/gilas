import React, {useEffect} from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import {ProductImagesGallery, PageHeader} from '../components';
import ReactLoading from 'react-loading';
import { useProductsContext } from '../context/products_context';

const SingleProduct = () => {
    const {single_item, single_item_loading, fetchSingleItem} = useProductsContext();
    const {images, title, price, description, category, full_name, phone_number} = single_item;

    let {id} = useParams();
    useEffect(() => {
        fetchSingleItem(id);
    }, [])

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
                                <h3 className='price'>{price} AZN</h3>
                                <p className='description'>{description}</p>
                                <br/>
                                <hr/>
                                <p className='info'>
                                    <span>Kateqoriya: </span>
                                    {category?.title}
                                </p>
                                <p className='info'>
                                    <span>Məsul şəxs: </span>
                                    {full_name}
                                </p>
                                <p className='info'>
                                    <span>Mobil: </span>
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
            color: #00C1FF;
            letter-spacing: 1px;
            margin: 1rem 0;
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
            grid-template-columns: 125px 1fr;
            span {
              font-weight: 700;
            }
        }
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
