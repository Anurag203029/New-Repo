import React from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import { toast } from 'react-hot-toast'; // or any other toast library you use

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (error) {
      toast.error(error.message);
    } else {
      try {
        const { data } = await axios.post('https://new-repo-q8ew.onrender.com/api/payment', {
          payment_method_id: paymentMethod.id,
        });

        if (data.success) {
          toast.success('Payment successful!');
        } else {
          toast.error('Payment failed. Please try again.');
        }
      } catch (err) {
        toast.error('An error occurred. Please try again.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <CardElement />
      </div>
      <button
        type='submit'
        className='btn btn-primary mt-4'
        disabled={!stripe}
      >
        Pay Now
      </button>
    </form>
  );
};

export default CheckoutForm;
