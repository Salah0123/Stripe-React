import './App.css';
import StripeCheckout from 'react-stripe-checkout';
import React, {useState} from 'react';
import axios from 'axios';

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";






const MySwal = withReactContent(Swal);

function App() {

  const [product,setProduct] = useState({
    name: 'ProdOne',
    price: 10
  })
  const priceForStripe = product.price * 100;
  const  handleSuccess = ()=>{
    MySwal.fire({
      icon: 'success',
      title: 'Payment was successfully',
      time: 4000,
    });
  }
  const handleFailure=()=>{
    MySwal.fire({
      icon: "error",
      title: "Payment was not successfully",
      time: 4000,
    });
  }
  const payNow = async token =>{
    try {
      const response = await axios({
        url: "https://stripe-ohlx.onrender.com/payment",
        method: "post",
        data: {
          amount: product.price * 100,
          token,
        },
      });
      if(response.status === 200){
        handleSuccess();
        console.log('Your payment was successful')
      }
    } catch (error) {
      handleFailure();
      console.log(error)
    }
  }
  return (
    <div className="container">
      <h2>Complete React & Stripe payment integration</h2>
      <p>
        <span>Product: </span>
        {product.name}
      </p>
      <p>
        <span>Price: </span>
        {product.price}$
      </p>
      <StripeCheckout
        stripeKey="pk_test_51MQCBUEwQJXCe3Mmc3FzTRZYqCMdD0Zuv4DOLtIGqNgPleXebjlaiU7YTIqWPkIk1AW3smZQAqZQDalZIwWqyqXC00fjMq75eL"
        label="Pay Now"
        name="Pay With Credit Card"
        billingAddress
        shippingAddress
        amount={priceForStripe}
        description={`Your total is $${product.price}`}
        token={payNow}
      />
    </div>
  );
}

export default App;
