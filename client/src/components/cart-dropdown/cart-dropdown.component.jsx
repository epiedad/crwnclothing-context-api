import React, { useContext } from 'react';
import { connect } from 'react-redux';
import CustomButton from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.component';
import { selectCartItems } from '../../redux/cart/cart.selectors';
import { createStructuredSelector } from 'reselect';
import { toggleCartHidden } from '../../redux/cart/cart.actions'
import {
  useNavigate,
} from "react-router-dom";

import { CartContext } from '../../provider/cart/cart.provider';

import './cart-dropdown.styles.scss';

const withRouter = Component => {
  function ComponentWithRouterProp(props) {
    let navigate = useNavigate();
    return (
      <Component
        {...props}
        router={{ navigate }}
      />
    );
  }

  return ComponentWithRouterProp;
}
const CartDropdown = ({ router }) => {
  const { cartItems, toggleHidden } = useContext(CartContext);
  return (
    <div className='cart-dropdown'>
        <div className='cart-items'>
            {cartItems.length 
                ? cartItems.map(cartItem => <CartItem key={cartItem.id} item={cartItem} />)
                : (
                    <span className='empty-message'>Your cart is empty</span>
                )
            }
        </div>
        <CustomButton onClick={() => {
          router.navigate('/checkout');
          toggleHidden();
        }}>
        GO TO CHECKOUT
        </CustomButton>
    </div>
  );
};

export default withRouter(CartDropdown);