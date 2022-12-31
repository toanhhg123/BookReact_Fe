import React, { useEffect, useState } from "react";
import Header from "./../components/Header";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removefromcart } from "../Redux/Actions/cartActions";

const CartScreen = ({ match, location, history }) => {
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  window.scrollTo(0, 0);
  const dispatch = useDispatch();
  const productId = match.params.id;

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  const qty = location.search ? Number(urlParams.get("qty")) : 1;
  const sizeParams = location.search ? urlParams.get("size") : "";
  const colorParams = location.search ? urlParams.get("color") : "";

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  console.log({ cart });

  const total = cartItems.reduce((a, i) => a + i.qty * i.price, 0);

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty, sizeParams, colorParams));
    }
  }, [dispatch, productId, qty, size, color, sizeParams, colorParams]);

  const checkOutHandler = () => {
    history.push("/login?redurect=shipping");
  };

  const removeFromCartHandle = (id) => {
    dispatch(removefromcart(id));
  };

  return (
    <>
      <Header />
      {/* Cart */}
      <div className="container">
        {cartItems.length === 0 ? (
          <div className=" alert alert-info text-center mt-3">
            Giỏ hàng bạn đang trống
            <Link
              className="btn btn-success mx-5 px-5 py-3"
              to="/"
              style={{
                fontSize: "12px",
              }}
            >
              Bắt đầu mua sắm
            </Link>
          </div>
        ) : (
          <>
            {" "}
            <div className=" alert alert-info text-center mt-3">
              Tổng số sản phẩm giỏ hàng
              <Link className="text-success mx-2" to="/cart">
                ({cartItems.length})
              </Link>
            </div>
            {/* cartiterm */}
            {cartItems.map((item, i) => (
              <div key={i} className="cart-iterm row">
                <div
                  onClick={() => removeFromCartHandle(item.product)}
                  className="remove-button d-flex justify-content-center align-items-center"
                >
                  <i className="fas fa-times"></i>
                </div>
                <div className="cart-image col-md-2">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="cart-text col-md-3 d-flex align-items-center">
                  <Link to={`/products/${item.product}`}>
                    <h4>{item.name}</h4>
                  </Link>
                </div>
                <div className="cart-qty col-md-2 col-sm-5 mt-md-1 mt-1 mt-md-0 d-flex flex-column justify-content-center">
                  <h6>SỐ LƯỢNG</h6>
                  <input
                    type="number"
                    name="qty"
                    defaultValue={item.qty}
                    onChange={(e) => {
                      dispatch(
                        addToCart(
                          item.product,
                          Number(e.target.value),
                          size,
                          color
                        )
                      );
                    }}
                  ></input>
                </div>
                <div className="cart-qty col-md-1 col-sm-5 mt-md-1 mt-1 mt-md-0 d-flex flex-column justify-content-center">
                  <h6>Tình trạng</h6>
                  <select
                    className="form-control"
                    defaultValue={item.size ? item.size : "Mới"}
                    onChange={(e) => {
                      setSize(e.target.value);
                      dispatch(
                        addToCart(item.product, qty, e.target.value, color)
                      );
                    }}
                  >
                    <option value="Mới">Mới</option>
                    <option value="Như mới">Như mới</option>
                    <option value="Cũ">Cũ</option>
                  </select>
                </div>
                <div className="cart-qty col-md-1 col-sm-5 mt-md-1 mt-1 mt-md-0 d-flex flex-column justify-content-center">
                  <h6> Loại sách </h6>
                  <select
                    className="form-control"
                    defaultValue={item.color ? item.color : "Tiếng Việt"}
                    onChange={(e) => {
                      setColor(e.target.value);
                      dispatch(
                        addToCart(item.product, qty, size, e.target.value)
                      );
                    }}
                  >
                    <option value="Tiếng anh">Tiếng anh</option>
                    <option value="Tiếng Việt">Tiếng Việt</option>
                  </select>
                </div>
                <div className="cart-price mt-1 mt-md-1 col-md-2 align-items-sm-end align-items-start  d-flex flex-column justify-content-center col-sm-7">
                  <h6>Giá</h6>
                  <h4>{item.price.toLocaleString()} VNĐ</h4>
                </div>
              </div>
            ))}
            {/* End of cart iterms */}
            <div className="total">
              <span className="sub">Tổng cộng:</span>
              <span className="total-price">{total.toLocaleString()} VNĐ</span>
            </div>
            <hr />
            <div className="cart-buttons d-flex align-items-center row">
              <Link to="/" className="col-md-6 ">
                <button>Tiếp tục mua sắm</button>
              </Link>
              {total > 0 && (
                <div className="col-md-6 d-flex justify-content-md-end mt-3 mt-md-0">
                  <button onClick={checkOutHandler}>Thanh toán</button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CartScreen;
