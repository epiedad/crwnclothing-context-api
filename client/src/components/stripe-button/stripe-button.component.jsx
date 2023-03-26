import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51MbfpNBkT4ydeHFg9O2sVNbiVVcP3GDvHEfSPByHfulcxaGTLHnOIqHQyQE2vps0IfYZKVrGiuHrVqh1tQTaMxWi00aGhSmOEk'


    const onToken = token => {
        axios({
            url: 'payment',
            method: 'post',
            data: {
                amount: priceForStripe,
                token
            }
        }).then(response => {
            alert('Payment was successful');
        }).catch(error => {
            console.log('Payment error:', JSON.stringify(error));
            alert('There was an issue with your payment. Please make sure you use the provided credit card');
        });
    }

    return (
        <StripeCheckout
            label='Pay Now'
            name="Crwn Clothing Eli"
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    )
}

export default StripeCheckoutButton;