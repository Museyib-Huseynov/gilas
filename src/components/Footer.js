import React from 'react';
import styled from 'styled-components';
import { FaFacebook, FaTwitter, FaYoutube, FaInstagram } from 'react-icons/fa';

const Footer = () => {
    return (
        <FooterContainer>
            <h2>
                Bizi izləyin <br/>
                <a href='https://www.facebook.com' target='_blank' rel="noreferrer">
                    <FaFacebook className='icon' style={{color: '#4267B2'}}/>
                </a>
                <a href='https://www.youtube.com' target='_blank' rel="noreferrer">
                    <FaYoutube className='icon' style={{color: '#FF0000'}}/>
                </a>
                <a href='https://www.twitter.com' target='_blank' rel="noreferrer">
                    <FaTwitter className='icon' style={{color: '#00ACEE'}}/>    
                </a>
                <a href='https://www.instagram.com' target='_blank' rel="noreferrer">
                    <FaInstagram className='icon' style={{color: '#bc2a8d'}}/>    
                </a>
            </h2>
            <h4>
                &copy; {new Date().getFullYear()}
                <span> Gilas Rent </span>
                Bütün hüquqlar qorunur
            </h4>
        </FooterContainer>
    );
};

const FooterContainer = styled.div`
    height: 200px;
    background: #222;
    user-select: none;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    margin-top: auto;
    
    h2 {
        color: #fff;
        text-align: center;
    }

    .icon {
        margin: 0.3rem;
        cursor: pointer;
    }

    h4 {
        color: #fff;
        margin: 0.1rem;
        font-weight: 400;
        text-transform: none;
        line-height: 1.25;
        align-self: center;
    }
    span {
        color: #00C1FF;
        margin: 0 .2rem;
    }

    @media screen and (max-width: 360px) {
        h2 {
            font-size: 1.2rem;
        }

        h4 {
            font-size: .9rem;
        }
    }
`;

export default Footer;
