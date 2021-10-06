import React, {useState, useEffect, useRef} from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import {PageHeader} from '../components';
import cities from '../data/cities';
import axios from 'axios';
import { useCategoriesContext } from '../context/categories_context';
import ReactLoading from 'react-loading';
import Compressor from 'compressorjs';

const NewAd = () => {
    const [category, setCategory] = useState('-- Siyahıdan seçin --');
    const [adName, setAdName] = useState('');
    const [city, setCity] = useState('Bakı');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [descriptionCount, setDescriptionCount] = useState(500);
    const [selectedImages, setSelectedImages] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [error, setError] = useState(true);

    const [loading, setLoading] = useState(false);

    const {categories} = useCategoriesContext();
    let history = useHistory();
    const fileInputRef = useRef(null);

    useEffect(() => {
        const input = fileInputRef.current;
        const handleSelect = () => {
            let selected =  [...input.files];
            selected.map((img, index) => {
                console.log(selected[index].size);
                new Compressor(img, {
                    quality: 0.1,
                    success: (compressedResult) => {
                        selected[index] = compressedResult;
                        console.log(selected[index].size);
                        selected = selected.filter((file) => file.size < 3096000);
                        setSelectedImages([...selectedImages, ...selected]);
                        input.value = null;
                    },
                });
            });
            
        };
        input?.addEventListener('change', handleSelect);
        return () => input?.removeEventListener('change', handleSelect);
    });

    useEffect(() => {
        setDescriptionCount(500 - description.length);
    }, [description]);
    
    useEffect(() => {
        if (category !== '-- Siyahıdan seçin --' && 
            adName !== '' && 
            price !== '' &&
            description !== '' &&
            selectedImages.length !== 0 &&
            name !== '' &&
            /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(email) &&
            mobile.length === 15) {
                setError(false);
        } else {
            setError(true);
        }
    }, [category, adName, price, description, selectedImages.length, name, email, mobile.length]);

    const handleChange = (e) => {
        if (e.target.name === 'category') {
            setCategory(e.target.value);
        }
        if (e.target.name === 'ad-name') {
            setAdName(e.target.value);
        }
        if (e.target.name === 'city') {
            setCity(e.target.value);
        }
        if (e.target.name === 'price') {
            setPrice(e.target.value);
        }
        if (e.target.name === 'description') {
            setDescription(e.target.value);
        }
        if (e.target.name === 'name') {
            setName(e.target.value);
        }
        if (e.target.name === 'email') {
            // red error  border
            if (/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(e.target.value)) {
                e.target.classList.remove('error');
            } else {
                e.target.classList.add('error');
            }
            // red error  border
            setEmail(e.target.value);
        }
        if (e.target.name === 'number') {
            // red error border
            if (e.target.value.length === 15) {
                e.target.classList.remove('error');
            } else {
                e.target.classList.add('error');
            }
            // red error border
            let number = e.target.value.replace(/[^\d]/g, "");
            if (number.length < 4) {
                setMobile(number);
            } else if (number.length < 7) {
                setMobile(`(${number.slice(0, 3)}) ${number.slice(3)}`)
            } else if (number.length < 9) {
                setMobile(`(${number.slice(0, 3)}) ${number.slice(3, 6)}-${number.slice(6, 8)}`)
            } else {
                setMobile(`(${number.slice(0, 3)}) ${number.slice(3, 6)}-${number.slice(6, 8)}-${number.slice(8)}`)
            }
        }
    };

    const handleCancel = (i) => {
        const newSelectedImages = selectedImages.filter((_, index) => index !== i);
        setSelectedImages(newSelectedImages);
    }   
    
    const handleSubmit = (e) => {
        setLoading(true);
        e.preventDefault();
        const bodyFormData = new FormData();
        bodyFormData.append('category_id', category);
        bodyFormData.append('title', adName);
        bodyFormData.append('price', Number(price));
        bodyFormData.append('description', description);
        bodyFormData.append('full_name', name);
        bodyFormData.append('phone_number', mobile);
        bodyFormData.append('renting_type', "WEEKLY");    
        selectedImages.forEach((image_file) => {
            bodyFormData.append('images[]', image_file);
        });

        axios({
            method: "post",
            url: "https://gilas.hymeria.com/api/v1/store",
            data: bodyFormData,
            headers: { "Content-Type": "multipart/form-data"},
        })
        .then((response) => {
            console.log(response)
           if (response.data.code === 201) {
                history.push('/formsuccess');
           }
        })
        .catch((response) => {
            console.log(response)
        })
    }

    if (loading) {
        return (<ReactLoading 
            type={'spinningBubbles'} 
            color={'#03b8f4'} 
            width={'150px'} 
            height={'150px'}
            className='loading' 
        />)
    }
    return (
        <NewAdContainer>
            <PageHeader title='İcarəyə ver' />
            <h1>Yeni elan yerləşdir</h1>
            <form className='form' autoComplete='off' onSubmit={handleSubmit}>
                {/* choose a category */}
                <div className='form-input'>
                    <label htmlFor='category' className='label'>Kateqoriya</label>
                    <select id='category' className='input' name='category' value={category} onChange={handleChange}>
                        <option >-- Siyahıdan seçin --</option>
                        {categories.map((category) => {
                            return (
                                <option key={category.id} value={category.id}>
                                    {category.title}
                                </option>
                            );
                        })}
                    </select>
                </div>
                {/* enter name of ad */}
                {category !== '-- Siyahıdan seçin --' &&
                <div className='form-input'>
                    <label htmlFor='ad-name' className='label'>Elanın adı</label>
                    <input 
                        type='text' 
                        id='ad-name' 
                        name='ad-name'
                        className='input'
                        value={adName}
                        onChange={handleChange}
                    />     
                    </div>
                }                
                {/* choose your city */}
                <div className='form-input'>
                    <label htmlFor='city' className='label'>Şəhər</label>
                    <select id='city' className='input' name='city' value={city} onChange={handleChange}>
                        {cities.map((city, index) => {
                            return (
                                <option key={index} value={city}> 
                                    {city}
                                </option>
                            );
                        })}
                    </select>
                </div>
                {/* enter the price */}
                <div className='form-input'>
                    <label htmlFor='price' className='label'>Qiymət, AZN</label>
                    <div>
                         <input 
                            type='number' 
                            id='price' 
                            name='price' 
                            className='input price'
                            value={price}
                            min={0}
                            step={0.01}
                            onChange={handleChange}
                        />
                         &nbsp;AZN
                    </div>
                </div>
                {/* description */}
                <div className='form-input'>
                    <label htmlFor='description' className='label' style={{alignSelf: 'start'}}>Məzmun</label>
                    <div>
                        <textarea 
                            id='description' 
                            maxLength={500} 
                            name='description' 
                            value={description} 
                            onChange={handleChange}
                        /> 
                        <p style={{fontSize: '0.8rem'}}>{descriptionCount} simvol qalıb</p>
                    </div>            
                </div>
                {/* add images */}
                <div className='form-input'>
                    <div className='label'>Şəkillər</div>
                    <label htmlFor='image' className='file-btn'>Şəkil əlavə et</label>
                    <input 
                        type='file' 
                        id='image' 
                        className='input-file' 
                        accept="image/gif, image/jpeg, image/png" 
                        ref={fileInputRef}
                        multiple 
                        hidden
                    />
                    <p className='imgSizeLimit' style={{fontSize: '0.8rem'}}>Şəkilin ölçüsü 3096kb-dan çox olmamalıdır.</p>
                </div>
                {/* show selected images */}
                {selectedImages.length !== 0 && 
                    <div className='images-container'>
                        {selectedImages.map((selectedImage, index) => {
                            const path = window.URL.createObjectURL(selectedImage);
                            return (
                                <div key={index} className='selected-img-container'>
                                    <img  src={path} alt={selectedImage.name} className='selected-img' />
                                    <button type='button' className='selected-img-remove' onClick={()=>handleCancel(index)}>
                                        Sil
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                }         
               {/* contact info */}
                <div className='contact'>
                    <p>Əlaqə məlumatları</p>
                </div>
                {/* enter your name */}
                <div className='form-input'>
                    <label htmlFor='name' className='label'>Adınız</label>
                    <input 
                        type='text' 
                        id='name' 
                        name='name'
                        className='input'
                        value={name}
                        onChange={handleChange}
                    />     
                </div>
                {/* enter your email */}
                <div className='form-input'>
                    <label htmlFor='email' className='label'>E-mail</label>
                    <input 
                        type='email' 
                        id='email' 
                        name='email'
                        className='input' 
                        value={email}
                        onChange={handleChange}
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                    />  
                </div>
                {/* enter your mobile number */}
                <div className='form-input'>
                    <label htmlFor='number' className='label'>Mobil nömrə</label>
                    <input 
                        type='tel' 
                        id='number' 
                        name='number'
                        className='input' 
                        placeholder='(000) 000-00-00'
                        value={mobile}
                        onChange={handleChange}
                        maxLength={15}
                    />
                </div>
                {/* submit button */}
                <input 
                    type='submit' 
                    className='submit-btn' 
                    value='Elanı yerləşdir' 
                    disabled={error}
                />
            </form>
        </NewAdContainer>
    );
};

const NewAdContainer = styled.main`
display: grid;
grid-template-rows: auto 60px 1fr;
// place-items: center;
margin-bottom: 2rem;

h1 {
    width: 600px;
    margin: auto;
    font-weight: 500;
}

.form {
    width: 600px;
    margin: auto;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-rows: minmax(60px, auto);
    align-items: center;
}

.form-input {
    display: grid;
    grid-template-columns: 150px 350px;
    justify-content: space-between;
}

.label {
    font-weight: 500;
    justify-self: end;
    align-self: center;
}

.label::after {
    content: ' *';
    color: #fc3205;
}

.input {
    width: 300px;
    height: 30px;
    font-size: 1rem;
    padding-left: .5rem;
    justify-self: start;
    caret-color: #000;
    outline: none;
    border: 1px solid #a1a1a1;
    border-radius: 5px;
}

.price {
    width: 150px;
}

textarea {
    width: 300px;
    min-height: 100px;
    max-height: 250px;
    resize: vertical;
    caret-color: #000;
    outline: none;
}

.file-btn {
    width: 120px;
    text-align: center;
    padding: 0.5rem;
    background: #ff8412;
    cursor: pointer;
    color: #fff;
    border-radius: 0.3rem;
    font-weight: 500;
}

.images-container {
    display: flex;
    flex-wrap: wrap;
    margin: auto;
}

.selected-img-container {
    display: flex;
    flex-direction: column;
    margin: 4px 8px;
}

.selected-img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 5px 5px 0 0;
}

.selected-img-remove {
    width: 100px;
    padding: 2px;
    color: #fff;
    background: red;
    border: none;
    border-radius: 0 0 5px 5px;
    cursor: pointer;
}

.imgSizeLimit {
    grid-column-start: 2;
}

.contact {
    justify-self: center;
    font-weight: 600;
    letter-spacing: 1px;
    font-size: 1.2rem;
}

.submit-btn {
    width: 150px;
    height: 35px;
    font-size: 1.1rem;
    justify-self: center;
    border: none;
    outline: none;
    border-radius: 5px;
    cursor: pointer;
    background: #00C1FF;
    color: #fff;
    : hover {
        background: #70e7ff;
    };
    :disabled {
        background: grey;
        cursor: initial;
    }
}

.error {
    border: 2px solid red;
}

.error-msg {
    color: red;
    font-size: 0.8rem;
    grid-column-start: 2;
}

@media screen and (max-width: 800px) {
    h1 {
        width: 350px;
    }

    .form {
        width: 100%;
        row-gap: 10px;
        box-shadow: none;
    }

    .form-input {
        grid-template-columns: 1fr;
        grid-template-rows: 25px minmax(40px, auto);
        position: relative;
        margin-left: 20px;
    }

    .label {
        // position: absolute;
        justify-self: initial;
        align-self: initial;
    }

    .error-msg {
        grid-column-start: 1;
    }

    .imgSizeLimit {
        grid-column-start: 1;
    }
}    

@media screen and (max-width: 360px) {
    h1 {
        width: 300px;
        font-size: 1.5rem;
    }

    .input {
        width: 250px;
    }

    textarea {
        width: 250px;
    }

    .images-container {
        justify-content: center;
    }
}    
`;

export default NewAd;
