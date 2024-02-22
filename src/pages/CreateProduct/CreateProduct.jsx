import axios from 'axios';
import { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import styles from './CreateProduct.module.css';


export const CreateProduct = () => {
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        description: '',
        aboutProduct: '',
        color: '',
        quantity: '',
        price: '',
        image: [''],
        picture: '',
    });

    const handleImageChange = (index, value) => {
        const updatedImages = [...formData.image];
        updatedImages[index] = value;
        setFormData(prevState => ({
            ...prevState,
            image: updatedImages
        }));
    }

    const handleAddImageField = () => {
        if (formData.image.length < 5) {
            setFormData(prevState => ({
                ...prevState,
                image: [...prevState.image, ''] // Добавляю новое поле ввода для изображения
            }));
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleSubmit = async (e) => {
        if (formData.image.length === 0 || formData.image.some(imageUrl => !imageUrl.trim())) {
            alert('Завтикав заповнити url картинки');
            return;
        }
        for (const key in formData) {
            if (!formData[key]) {
                alert(`${key} завтикав заповнити`);
                return; // Остановка отправки запроса
            }
        }

        try {
            await axios.post('https://hugge-home-api.vercel.app/api/products', formData);
            setFormData({
                name: '',
                category: '',
                description: '',
                aboutProduct: '',
                color: '',
                quantity: '',
                price: '',
                image: [],
                picture: '',
            });
            alert('Ти усппішно добавив продукт до бази даних, з тебе ще 100 таких');
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <form onSubmit={(e) => e.preventDefault()} className={styles.form}>
            <h3>Ось тут можна добавити продукт до бази даних</h3>

            {formData.image.map((imageUrl, index) => (
                <div key={index}>
                    <input
                        className={styles.image}
                        type="text"
                        value={imageUrl}
                        onChange={(e) => handleImageChange(index, e.target.value)}
                        placeholder="Image URL"
                        required
                    />
                    <img src={imageUrl} alt={'img'} style={{ width: '200px' }} />

                </div>
            ))}
            {formData.image.length < 5 && (
                <button type="button" onClick={handleAddImageField}>Add Image</button>
            )}

            <input name='name' className={styles.name} type="text" value={formData.name} onChange={handleChange} placeholder="Product name" required />
            
            <select className={styles.category} name="category" value={formData.category} onChange={handleChange} required>
                <option value="">Вибери картегорію</option>
                <option value="Candles">Candles</option>
                <option value="Lighting Decor">Lighting Decor</option>
                <option value="Gift Sets">Gift Sets</option>
                <option value="Get Warm">Get Warm</option>
                <option value="Table Games">Table Games</option>
                <option value="Books & Journals">Books & Journals</option>
            </select>

            <TextareaAutosize
                name='description'
                className={styles.description}
                placeholder="Маленьке описання товару"
                value={formData.description}
                onChange={handleChange}
                required
            />

            <TextareaAutosize
                className={styles.about__product}
                name='aboutProduct'
                placeholder="Велике описання товару"
                value={formData.aboutProduct}
                onChange={handleChange}
                required
            />

            <select className={styles.color} name="color" value={formData.color} onChange={handleChange} required>
                <option value="">Вибери колір</option>
                <option value="Blue">Blue</option>
                <option value="Green">Green</option>
                <option value="Grey">Grey</option>
                <option value="Red">Red</option>
                <option value="White">White</option>
                <option value="Purple">Purple</option>
                <option value="Yellow">Yellow</option>
                <option value="Pink">Pink</option>
            </select>

            <input className={styles.quantity} name='quantity' type="number" value={formData.quantity} onChange={handleChange} placeholder="Кідькіть товару" required />
            
            <input className={styles.price} name='price' type="number" value={formData.price} onChange={handleChange} placeholder="Ціна товару" required />
            
            <input name='picture' type="text" value={formData.picture} onChange={handleChange} placeholder="Картинка ховеру" required />
            
            <button onClick={handleSubmit}>Create Product</button>
        </form>
    );
}