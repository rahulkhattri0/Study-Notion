import { toast } from 'react-hot-toast';
import { apiConnector } from '../apiConnector';
import { setUser } from '../../redux/slices/profileSlice';
import { resetCart } from '../../redux/slices/cartSlice';
const { paymentEndpoints } = require('../apis');
const { CAPTURE_PAYMENT, VERIFY_SIGNATURE } = paymentEndpoints;
export const buyCourse = async (token, courses, price, dispatch, navigate, email) => {
  const scriptPromise = new Promise((resolve, reject) => {
    if (document.getElementById('razorpay_script')) {
      resolve();
    } else {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.id = 'razorpay_script';
      document.head.appendChild(script);
      script.onload = () => resolve();
      script.onerror = () => {
        document.head.removeChild(script);
        reject('Error loading razorpay script');
      };
    }
  });
  try {
    await scriptPromise;
    const orderResponse = await apiConnector(
      'POST',
      CAPTURE_PAYMENT,
      { courses, price },
      {
        Authorization: `Bearer ${token}`
      }
    );
    const amount = orderResponse.data.response.amount;
    const currency = orderResponse.data.response.currency;
    const orderID = orderResponse.data.response.id;
    console.log('order response-->', amount);
    const options = {
      key: process.env.REACT_APP_RZP_KEY,
      amount: amount,
      currency: currency,
      order_id: orderID,
      name: 'Study Notion',
      description: 'Thank you for purchasing the course.',
      handler: (response) => {
        console.log('payment success', response);
        verifySignature(token, response, courses, dispatch, navigate, email);
      }
    };
    const rzpWindow = new window.Razorpay(options);
    rzpWindow.open();
  } catch (error) {
    console.log(error);
    toast.error(error.response?.data?.message || error);
  }
};

const verifySignature = async (token, response, courses, dispatch, navigate, email) => {
  const loadingtoast = toast.loading('Loading...');
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = response;
  try {
    const response = await apiConnector(
      'POST',
      VERIFY_SIGNATURE,
      {
        orderId: razorpay_order_id,
        paymentID: razorpay_payment_id,
        signature: razorpay_signature,
        courses,
        email
      },
      {
        Authorization: `Bearer ${token}`
      }
    );
    dispatch(setUser(response.data.updatedUser));
    localStorage.setItem('user', JSON.stringify(response.data.updatedUser));
    dispatch(resetCart());
    navigate('/dashboard/enrolled-courses');
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.message);
  }

  toast.dismiss(loadingtoast);
};
