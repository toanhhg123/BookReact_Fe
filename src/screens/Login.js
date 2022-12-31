import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Message from "../components/LoadingError/Error";
import { login } from "../Redux/Actions/userActions";
import Header from "./../components/Header";

console.log(process.env.REACT_APP_LOGIN_GOOGlE_SERVER);
const Login = ({ location, history }) => {
  window.scrollTo(0, 0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const userLogin = useSelector((state) => state.userLogin);

  const { loading, error, userInfo } = userLogin;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  const handleLoginGoogle = async () => {
    window.open(
      `${process.env.REACT_APP_LOGIN_GOOGlE_SERVER}/login/federated/google`,
      "_self"
    );
  };
  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [userInfo, history, redirect]);

  return (
    <>
      <Header />
      <div className="container d-flex flex-column justify-content-center align-items-center login-center">
        {error && <Message variant="alert-danger">{error}</Message>}
        {loading && (
          <Message variant="alert-info">Đăng nhập thành công</Message>
        )}
        <form
          className="Login col-md-8 col-lg-4 col-11"
          onSubmit={submitHandler}
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Đăng nhập</button>
          <button type="button" onClick={handleLoginGoogle}>
            Login with Google
          </button>

          <p>
            <Link
              to={redirect ? `/register?redirect=${redirect}` : "/register"}
            >
              Tạo tài khoản
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
