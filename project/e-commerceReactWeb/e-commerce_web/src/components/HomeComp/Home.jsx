import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Nav from "../Shaired/Nav/Nav";
import Rating from 'react-rating-stars-component';
import LoadingSpinner from "../Shaired/spinners/Loadspinning";
import Footer from "../Shaired/footer/Footer";
import "./home.css";

function Home() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchProducts = useCallback(async () => {
        try {
            const response = await axios.get("http://localhost:7000/getProduct");
            console.log(response.data.data); // Log the fetched data
            setProducts(response.data.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching products:", error);
            setError("Failed to load products. Please try again later.");
            setLoading(false);  
        }
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    return (
        <>
            <Nav />
            <div
                id="carouselExampleAutoplaying"
                className="carousel slide container"
                data-bs-ride="carousel"
                data-bs-interval="5000"
                data-bs-pause="hover">
            
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img
                            src="/bannerhome.png"
                            className="d-block w-100 img-fluid"
                            alt="Banner Home 1"
                        />
                    </div>
                    <div className="carousel-item">
                        <img
                            src="/bannerhome.png"
                            className="d-block w-100 h-10 img-fluid"
                            alt="Banner Home 2"
                        />
                    </div>
                    <div className="carousel-item">
                        <img
                            src="/bannerhome.png"
                            className="d-block w-100 h-10 img-fluid"
                            alt="Banner Home 3"
                        />
                    </div>
                </div>
            </div>

            <div className="background-images"></div>
            
            <div className="container my-5">
                <h1 className="text-center mb-5 text-black">Our Products</h1>
                {loading && <LoadingSpinner />}
                {error && <p className="text-danger text-center">{error}</p>}
                {!loading && !error && (
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                        {products.map((product) => (
                            <div key={product._id} className="col">
                                <div className={`card shadow-sm border-0 ${product.countInStock === 0 ? 'out-of-stock' : ''}`}>
                                    <img
                                        className="card-img-top"
                                        src={`http://localhost:7000/${product.image}`}
                                        alt={product.title}
                                        onError={(e) => { e.target.src = "/denim.jpg"; }} // Fallback image
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title text-dark">{product.title}</h5>
                                        <p className="card-text text-dark">${product.price}</p>

                                        <Rating
                                            count={5}
                                            value={product.rating}
                                            size={20}
                                            activeColor="#ffd700"
                                            edit={false}
                                        />

                                        <div className="d-flex justify-content-between">
                                            <button 
                                                className="btn btn-outline-dark btn-sm" 
                                                disabled={product.countInStock === 0}>
                                                {product.countInStock === 0 ? 'Out of Stock' : (
                                                    <>
                                                        <i className="fas fa-cart-plus me-2"></i>Cart
                                                    </>
                                                )}
                                            </button>
                                            <button className="btn btn-outline-dark btn-sm">
                                                <i className="fas fa-heart me-2"></i> Favorite
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
}

export default Home;
