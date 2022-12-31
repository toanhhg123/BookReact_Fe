import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { savePaymentMethod } from "../Redux/Actions/cartActions";
import Header from "./../components/Header";

const PaymentScreen = ({ history }) => {
  window.scrollTo(0, 0);

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress) {
    history.push("/shipping");
  }

  const dispatch = useDispatch();

  const [paymentMethod, setPaymentMethod] = useState("Cash");

  console.log(paymentMethod);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeorder");
  };
  return (
    <>
      <Header />
      <div className="container d-flex justify-content-center align-items-center login-center">
        <form
          className="Login2 col-md-8 col-lg-4 col-11"
          onSubmit={submitHandler}
        >
          <h6>CHỌN PHƯƠNG THỨC THANH TOÁN</h6>
          <div className="payment-container">
            <div className="radio-container">
              <input
                className="form-check-input"
                type="radio"
                name="payment"
                checked={paymentMethod === "PayPal"}
                onChange={(e) => setPaymentMethod("PayPal")}
              />
              <label className="form-check-label">
                PayPal hoặc thẻ tín dụng
              </label>
            </div>
            <div className="radio-container">
              <input
                className="form-check-input"
                type="radio"
                name="payment"
                checked={paymentMethod === "Cash"}
                onChange={(e) => setPaymentMethod("Cash")}
              />
              <label className="form-check-label">
                Thanh toán tiền mặt sau khi nhận hàng
              </label>
            </div>
          </div>

          <button type="submit">
            <Link to="/placeorder" className="text-white">
              TIẾP TỤC
            </Link>
          </button>
        </form>
      </div>
    </>
  );
};

export default PaymentScreen;
