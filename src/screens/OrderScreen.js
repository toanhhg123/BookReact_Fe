import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "./../components/Header";
import { PayPalButton } from "react-paypal-button-v2";
import Loading from "./../components/LoadingError/Error";
import Message from "../components/LoadingError/Error";
import { useDispatch, useSelector } from "react-redux";
import {
  getOrderDetails,
  payOrder,
  successOrder,
} from "../Redux/Actions/OrderActions";
import moment from "moment";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ORDER_PAY_RESET } from "../Redux/Constants/OrderConstants";

const OrderScreen = ({ match }) => {
  window.scrollTo(0, 0);
  const [sdkReady, setSdkReady] = useState(false);
  const orderId = match.params.id;
  const dispatch = useDispatch();
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderDetails);
  const { loading: loadingPay, success: successPay } = orderPay;
  if (!loading) {
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    order.imtemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );

    order.shippingPrice = addDecimals(
      order?.shippingAddress?.city === "Hà Nội" ? 50000 : 30000
    );

    order.taxPrice = addDecimals(Number(0.05 * order.imtemsPrice));

    order.totalPrice =
      Number(order.imtemsPrice) +
      Number(order.shippingPrice) +
      Number(order.taxPrice);
  }

  console.log({ order });
  useEffect(() => {
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/config/paypal`
      );
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (!order || successPay) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, orderId, successPay, order]);

  const successPaymentHandler = (paymentResult) => {
    toast.success("Thanh toán thành công", {
      pauseOnFocusLoss: false,
      draggable: false,
      pauseOnHover: false,
      autoClose: 2000,
    });
    setTimeout(window.location.reload(), 3000);
    console.log(paymentResult);
    dispatch(payOrder(orderId, paymentResult));
  };

  function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
      (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16)
    );
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
      />
      <Header />
      <div className="container">
        {loading ? (
          <Loading />
        ) : error ? (
          <Message variant="alert-danger">{error}</Message>
        ) : (
          <>
            {" "}
            <div className="row  order-detail">
              <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
                <div className="row">
                  <div className="col-md-4 center">
                    <div className="alert-success order-box">
                      <i className="fas fa-user"></i>
                    </div>
                  </div>
                  <div className="col-md-8 center">
                    <h5>
                      <strong>Khách hàng</strong>
                    </h5>
                    <p>{order.user.name}</p>
                    <p>
                      <a href={`mailto:${order.user.email}`}>
                        {order.user.email}
                      </a>
                    </p>
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
                    <p>Quốc gia: {order.shippingAddress.country}</p>
                    <p>
                      Phương thức thanh toán:{" "}
                      {order.paymentMethod === "Cash"
                        ? "Tiền Mặt"
                        : order.paymentMethod}
                    </p>
                    {order.isPaid ? (
                      <div className="bg-info p-2 col-12">
                        <p className="text-white text-center text-sm-start">
                          Thanh toán: {moment(order.paidAt).calendar()}
                        </p>
                      </div>
                    ) : (
                      <div className="bg-danger p-2 col-12">
                        <p className="text-white text-center text-sm-start">
                          Đang chờ
                        </p>
                      </div>
                    )}
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
                      <strong>Giao hàng</strong>
                    </h5>
                    <p>
                      Địa chỉ:{""}
                      {order.shippingAddress.address}, {""}
                      {order.shippingAddress.city}, {""}
                      {order.shippingAddress.postalCode}
                    </p>
                    {order.isDelivered ? (
                      <div className="bg-info p-2 col-12">
                        <p className="text-white text-center text-sm-start">
                          Đã giao hàng: {moment(order.deliveredAt).calendar()}
                        </p>
                      </div>
                    ) : (
                      <div className="bg-danger p-2 col-12">
                        <p className="text-white text-center text-sm-start">
                          Đang chuẩn bị
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="row order-products justify-content-between">
              <div className="col-lg-8">
                {order.orderItems.length === 0 ? (
                  <Message variant="alert-info mt-5">
                    Đơn hàng của bạn đang trống
                  </Message>
                ) : (
                  <>
                    {order.orderItems.map((item, index) => (
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
                      <td>{order.imtemsPrice.toLocaleString()} VND</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Phí ship</strong>
                      </td>
                      <td>{order.shippingPrice.toLocaleString()} VND</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>GTGT</strong>
                      </td>
                      <td>{order.taxPrice.toLocaleString()} VND</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Tổng cộng</strong>
                      </td>
                      <td>{order.totalPrice.toLocaleString()} VND</td>
                    </tr>
                  </tbody>
                </table>
                {!order.isPaid && order.paymentMethod === "PayPal" && (
                  <div className="col-12">
                    {loadingPay && <Loading />}
                    {!sdkReady ? (
                      <Loading />
                    ) : (
                      <>
                        <PayPalButton
                          amount={order.totalPrice}
                          onSuccess={successPaymentHandler}
                        />
                      </>
                    )}
                  </div>
                )}

                {!order.isPaid && order.paymentMethod === "Cash" && (
                  <button
                    onClick={() => {
                      successPaymentHandler({
                        id: uuidv4(),
                        status: "Chúng tôi đã nhận dược hàng",
                        update_time: Date.now(),
                        email_address: order.user.email,
                      });
                      dispatch(successOrder(orderId));
                    }}
                  >
                    Đã nhận được hàng
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default OrderScreen;
