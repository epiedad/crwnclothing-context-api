import React, { useContext } from 'react';
import { connect } from 'react-redux';

// import { toggleCartHidden  } from '../../redux/cart/cart.actions';

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

import { selectCartItemsCount } from '../../redux/cart/cart.selectors';
import { CartContext } from '../../provider/cart/cart.provider';

import './cart-icon.styles.scss';

const CartIcon = () => {
  const { toggleHidden, cartItemsCount } = useContext(CartContext);
  return (
    <div className="cart-icon" onClick={toggleHidden}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{cartItemsCount}</span>
    </div>
  );
};

// const dispatchStateToProps = dispatch => ({
//     toggleCartHidden: () => dispatch(toggleCartHidden())
// });

// const mapStateToProps = (state) => {
//   return {
//     itemCount: selectCartItemsCount(state),
//   };
// };

export default CartIcon;
