import React, { useContext } from 'react'
import { connect } from 'react-redux';

import { CustomButtonContainer } from '../custom-button/custom-button.styles';
import { CartContext } from '../../provider/cart/cart.provider';

import './collection-item.styles.scss'

const CollectionItem = ({ item }) => {
	const { name, price, imageUrl } = item;
	const { addItem } = useContext(CartContext);
	return (
		<div className='collection-item'>
			<div
				className='image'
				style={{
					backgroundImage: `url(${imageUrl})`
				}}
			/>
			<div className='collection-footer'>
				<span className='name'>{name}</span>
				<span className='price'>{price}</span>
			</div>
			<CustomButtonContainer inverted onClick={() => addItem(item)}> Add to Cart</CustomButtonContainer>
		</div>
	);
}

export default CollectionItem;