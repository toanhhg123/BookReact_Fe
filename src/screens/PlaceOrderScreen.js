import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header from "./../components/Header";
import Message from "../components/LoadingError/Error";
import { createOrder } from "../Redux/Actions/OrderActions";
import { ORDER_CREATE_RESET } from "../Redux/Constants/OrderConstants";

const PlaceOrderScreen = ({ history }) => {
  const [shippingPrice, setShippingPrice] = useState(0);
  window.scrollTo(0, 0);

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  cart.imtemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  cart.shippingPrice = addDecimals(cart.imtemsPrice > 300 ? 0 : 30);

  cart.taxPrice = addDecimals(Number(0.05 * cart.imtemsPrice));

  cart.totalPrice =
    Number(cart.imtemsPrice) + Number(shippingPrice) + Number(cart.taxPrice);

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
    if (cart.shippingAddress.city === "Hà Nội") {
      setShippingPrice(50000);
    } else if (cart.shippingAddress.city === "Hồ Chí Minh") {
      setShippingPrice(30000);
    }
  }, [history, dispatch, success, order, cart.shippingAddress.city]);

  const placeOrderHandler = (e) => {
    e.preventDefault();
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        imtemsPrice: cart.imtemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  return (
    <>
      <Header />
      <div className="container">
        <div className="row  order-detail">
          <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
            <div className="row ">
              <div className="col-md-4 center">
                <div className="alert-success order-box">
                  <i className="fas fa-user"></i>
                </div>
              </div>
              <div className="col-md-8 center">
                <h5>
                  <strong>Khách hàng</strong>
                </h5>
                <p>{userInfo.name}</p>
                <p>{userInfo.email}</p>
              </div>
            </div>
          </div>
          {/* 2 */}
          <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
            <div className="row">
              <div className="col-md-4 center">
                <div className="alert-success order-box">
                  <i className="fas fa-truck-moving"></i>
                </div>
              </div>
              <div className="col-md-8 center">
                <h5>
                  <strong>Thông tin đặt hàng</strong>
                </h5>
                <p>Số điện thoại: {cart.shippingAddress.country}</p>
                <p>Phương thức thanh toán: {cart.paymentMethod}</p>
              </div>
            </div>
          </div>
          {/* 3 */}
          <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
            <div className="row">
              <div className="col-md-4 center">
                <div className="alert-success order-box">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
              </div>
              <div className="col-md-8 center">
                <h5>
                  <strong>Địa chỉ giao hàng</strong>
                </h5>
                <p>
                  Địa chỉ:{""}
                  {cart.shippingAddress.address}, {""}
                  {cart.shippingAddress.city}, {""}
                  {cart.shippingAddress.postalCode}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="row order-products justify-content-between">
          <div className="col-lg-8">
            {cart.cartItems.length === 0 ? (
              <Message variant="alert-info mt-5">
                Giỏ hàng bạn đang trống
              </Message>
            ) : (
              <>
                {cart.cartItems.map((item, index) => (
                  <div className="order-product row" key={index}>
                    <div className="col-md-2 col-6">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className="col-md-5 col-6 d-flex justify-content-center align-items-center">
                      <Link to={`/products/${item.product}`}>
                        <h6>{item.name}</h6>
                      </Link>
                    </div>
                    <div className="mt-3 mt-md-0 col-md-2 col-1  d-flex align-items-center flex-column justify-content-center ">
                      <h4>SỐ LƯỢNG</h4>
                      <h6>{item.qty}</h6>
                    </div>
                    <div className="mt-3 mt-md-0 col-md-1 col-1  d-flex align-items-center flex-column justify-content-center ">
                      <h4>Tình trạng</h4>
                      <h6>{item.size}</h6>
                    </div>
                    <div className="mt-3 mt-md-0 col-md-2 col-1  d-flex align-items-center flex-column justify-content-center ">
                      <h4>Loại sách</h4>
                      <h6>{item.color}</h6>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
          {/* total */}
          <div className="col-lg-3 d-flex align-items-end flex-column mt-5 subtotal-order">
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <td>
                    <strong>Tạm tính</strong>
                  </td>
                  <td> {cart.imtemsPrice.toLocaleString()} VND</td>
                </tr>
                <tr>
                  <td>
                    <strong>Phí ship</strong>
                  </td>
                  <td>
                    {" "}
                    {cart.shippingAddress.city === "Hà Nội" ? 50000 : 30000} VND
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>GTGT</strong>
                  </td>
                  <td>{cart.taxPrice.toLocaleString()} VND</td>
                </tr>
                <tr>
                  <td>
                    <strong>Tổng cộng</strong>
                  </td>
                  <td>{cart.totalPrice.toLocaleString()} VND</td>
                </tr>
              </tbody>
            </table>

            {cart.cartItems.length === 0 ? null : (
              <button type="submit" onClick={placeOrderHandler}>
                <Link to="/order" className="text-white">
                  ĐẶT HÀNG
                </Link>
              </button>
            )}
            {error && (
              <div className="my-3 col-12">
                <Message variant="alert-danger">
                  Vui lòng điền đầy đủ thông tin
                </Message>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaceOrderScreen;
