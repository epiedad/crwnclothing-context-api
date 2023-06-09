import React, { useContext } from 'react';
// import { connect } from 'react-redux';
import './checkout-item.styles.scss';
// import { clearItem, removeItem, addItem } from '../../redux/cart/cart.actions';
import { CartContext } from '../../provider/cart/cart.provider';


const CheckoutItem = ({ cartItem }) => {
 const { removeItem, addItem, clearItem } = useContext(CartContext);
 const { name, imageUrl, price, quantity } = cartItem;
    return (
        <div className = 'checkout-item'>
            <div className='image-container'>
                <img src={imageUrl} alt='item' />
            </div>
            <span className='name'>{name}</span>
            <span className='quantity'>
                <div className='arrow' onClick={() => removeItem(cartItem)}>&#10094;</div>
                <span className='value'>{quantity}</span>
                <div className='arrow' onClick={() => addItem(cartItem)}>&#10095;</div>
            </span>
            <span className='price'>{price}</span>
            <div className='remove-button' onClick={() => clearItem(cartItem)}>&#10005;</div>
        </div>
    );
};

export default CheckoutItem;
