import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import Footer from '/src/client/components/Footer/Footer';
import styles from './WishList.module.css';
import Header from '/src/client/components/Header/Header';

const WishList = () => {
  const location = useLocation();
  const { userId } = location.state;
  const [wishList, setWishList] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWishList = async () => {
      try {
        const response = await axios.get(`/wishlist/${userId}`);
        setWishList(response.data.items);
      } catch (error) {
        setError('Failed to fetch wishlist');
        console.log('Error fetching wishlist:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await axios.get('/admin/products');

        if (Array.isArray(response.data)) {
          setProducts(response.data);
        } else {
          console.error("Expected an array, but got:", typeof response.data);
          setError('Invalid data format received');
        }

        setLoading(false);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to fetch products');
        setLoading(false);
      }
    };

    fetchWishList();
    fetchProducts();
  }, [userId]);

  const handleRemove = async (postId) => {
    try {
      await axios.post('/wishlist/remove', { userId, postId });
      setWishList(wishList.filter(item => item._id !== postId));
    } catch (error) {
      setError('Failed to remove item from wishlist');
    }
  };

  const filteredProducts = products.filter(product =>
    wishList.some(wishItem => wishItem._id === product._id)
  );

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className={styles.container}>
      <Header />
      <h1>My Wishlist</h1>
      {wishList.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {wishList.map(item => (
            <div className={styles.productCard} key={item._id}>
              <h2 className={styles.productDetails}>{item.details}</h2>
              <p>Price: {item.price}</p>
              <p>Rating: {item.rating}</p>
              <p>Quantity: {item.quantity}</p>
              <img className={styles.productImage} src={item.imageurl} alt={item.title} />
              <button
                onClick={() => handleRemove(item._id)}
                className={styles.wishlistButton}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
      <Footer />
    </div>
  );
};

export default WishList;