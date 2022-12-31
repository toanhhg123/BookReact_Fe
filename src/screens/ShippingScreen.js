import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import Header from "../components/Header";
import {saveShippingAddress} from "../Redux/Actions/cartActions";

const ShippingScreen = ({history}) => {
    window.scrollTo(0, 0);

    const cart = useSelector((state) => state.cart);
    const {shippingAddress} = cart;

    const dispatch = useDispatch();

    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    const [country, setCountry] = useState(shippingAddress.country);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({address, city, postalCode, country}));
        history.push("/payment");
    };
    return (
        <>
            <Header/>
            <div className="container d-flex justify-content-center align-items-center login-center">
                <form
                    className="Login col-md-8 col-lg-4 col-11"
                    onSubmit={submitHandler}
                >
                    <h6>ĐỊA CHỈ GIAO HÀNG</h6>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Nhập địa chỉ"
                        value={address}
                        required
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    <select
                        className="form-select form-control-lg mt-3"
                        style={{height: "66px"}}
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    >
                        <option value="Hà Nội">Hà Nội</option>
                        <option value="Hồ Chí Minh">Hồ Chí Minh</option>
                    </select>
                    <input
                        type="text"
                        placeholder="Mã bưu điện"
                        value={postalCode}
                        required
                        onChange={(e) => setPostalCode(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Số điện thoại"
                        value={country}
                        required
                        onChange={(e) => setCountry(e.target.value)}
                    />
                    <button type="submit">
                        <Link to="/payment" className="text-white">
                            TIẾP TỤC
                        </Link>
                    </button>
                </form>
            </div>
        </>
    );
};

export default ShippingScreen;
