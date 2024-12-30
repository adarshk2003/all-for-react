import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag, faEdit, faClipboardList, faDollarSign, faBoxes, faImage, faStar } from '@fortawesome/free-solid-svg-icons';
import './addproduct.css';
import axios from 'axios';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function AddProductForm() {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "",
        price: "",
        stock: "",
        rating: "",
        image: null,
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.title || !formData.description || !formData.category || !formData.price || !formData.stock || !formData.rating || !formData.image) {
            toast.error('Please fill in all fields.');
            return;
        }
        setIsLoading(true);
        const data = new FormData();
        for (const key in formData) {
            data.append(key, formData[key]);
        }
        console.log('Form Data:', formData);
        try {
            const response = await axios.post('http://localhost:7000/add', data);
            console.log(response);
            toast.success('Product added successfully!');
            setFormData({
                title: "",
                description: "",
                category: "",
                price: "",
                stock: "",
                rating: "",
                image: null,
            });
        } catch (error) {
            console.error('Error adding product:', error);
            toast.error('Error adding product: ' + error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="add-product-form">
            <h1 className="m-2">Add Product</h1>
            <div className="form-group">
                <label><FontAwesomeIcon icon={faTag} /> Product Name:</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label><FontAwesomeIcon icon={faEdit} /> Description:</label>
                <input type="text" name="description" value={formData.description} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label><FontAwesomeIcon icon={faClipboardList} /> Category:</label>
                <input type="text" name="category" value={formData.category} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label><FontAwesomeIcon icon={faDollarSign} /> Price:</label>
                <input type="number" name="price" value={formData.price} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label><FontAwesomeIcon icon={faStar} /> Rating:</label>
                <input type="number" name="rating" value={formData.rating} onChange={handleChange} min="0" max="5" required />
            </div>
            <div className="form-group">
                <label><FontAwesomeIcon icon={faBoxes} /> Quantity in Stock:</label>
                <input type="number" name="stock" value={formData.stock} onChange={handleChange} required />
            </div>
            <div className="form-group border-0">
                <label><FontAwesomeIcon icon={faImage} /> Image:</label>
                <input type="file" name="image" onChange={handleFileChange} className="border-0" accept="image/*" required />
            </div>
            <button type="submit" className="submit-button" disabled={isLoading}>
                {isLoading ? 'Adding...' : 'Add Product'}
            </button>
        </form>
    );
}

export default AddProductForm;
