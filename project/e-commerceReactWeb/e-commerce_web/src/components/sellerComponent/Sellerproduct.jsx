import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css';

const MyProducts = ({ sellerId }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:7000/products/seller/${sellerId}`);
        setProducts(response.data.products);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, [sellerId]);

  return (
    <div className="container my-4">
      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && (
        <div className="row">
          {products.map(product => (
            <div key={product._id} className="col-md-4">
              <div className="card mb-4">
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">{product.description}</p>
                  <p className="card-text">${product.price}</p>
                  <p className="card-text">Seller: {product.seller.name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyProducts;
