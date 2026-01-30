import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';


const CheckoutForm = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const [error, setError] = useState('')
    const [clientSecret, setClientSecret] = useState('')
    const [transactionId, setTransactionId] = useState('');
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const plan = queryParams.get('plan');
    const price = queryParams.get('price');



    const {
        data: requested = [],
    } = useQuery({
        queryKey: ['requested',],
        queryFn: async () => {
            const { data } = await axiosSecure(`/requested_meals`);
            return data;
        },
    });

    // const totalPrice = requested.reduce((total, item) => total + item.price, 0)

    useEffect(() => {
        if (price > 0) {
            axiosSecure.post('/create-payment-intent', { price: price })
                .then(res => {
                    console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret);
                })
        }

    }, [axiosSecure, price])

    const handleSubmit = async (event) => {
        // Block native form submission.
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }


        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('error', error);
            setError(error.message)
        } else {
            console.log('PaymentMethod', paymentMethod);
            setError('')
        }

        // confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })
        if (confirmError) {
            console.log('confirm error')
        }
        else {
            console.log('payment intent', paymentIntent)
            if (paymentIntent.status === 'succeeded') {
                console.log('transaction id', paymentIntent.id);
                setTransactionId(paymentIntent.id);

                const payment = {
                    email: user?.email,
                    price: price,
                    transactionId: paymentIntent.id,
                    date: new Date(), // utc date convert. use moment js to 
                    membership: plan,
                    status: 'suceeded'
                }
                console.log(payment);
                const res = await axiosSecure.post('/payments', payment);
                console.log('payment saved', res.data);
                // refetch();
                if (res.data?.paymentResult?.insertedId) {
                    toast('Payment Sucessfull')
                    navigate('/dashboard/paymentHistory')
                }
            }
        }

    };

    return (
        <div>
            <div>
                <h1>Payment Page</h1>
                <p>Selected Plan: {plan}</p>
                <p>Price: ${price}</p>

            </div>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button type="submit" className='btn text-white bg-orange-500' disabled={!stripe || !clientSecret}>
                    Pay
                </button>
                <p className='text-red-900'>{error}</p>
                {transactionId && <p className="text-green-600"> Your transaction id: {transactionId}</p>}
            </form>
        </div>
    );
};

export default CheckoutForm;