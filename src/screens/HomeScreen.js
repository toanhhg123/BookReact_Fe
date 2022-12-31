import axios from "axios";
import React, { useEffect } from "react";
import Footer from "./../components/Footer";
import Header from "./../components/Header";
import CalltoActionSection from "./../components/homeComponents/CalltoActionSection";
import ContactInfo from "./../components/homeComponents/ContactInfo";
import ShopSection from "./../components/homeComponents/ShopSection";
import Slider from "./../components/Slider";
import { useDispatch } from "react-redux";
import { login } from "../Redux/Actions/userActions";

const HomeScreen = ({ match }) => {
  const dispatch = useDispatch();
  window.scrollTo(0, 0);
  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber;
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_LOGIN_GOOGlE_SERVER}/login/success`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        const {
          email,
          user: { id },
        } = res.data;
        dispatch(login(email, id));
      });
  }, [dispatch]);
  return (
    <div>
      <Header />
      <Slider />
      <ShopSection keyword={keyword} pageNumber={pageNumber} />
      <CalltoActionSection />
      <ContactInfo />
      <Footer />
    </div>
  );
};

export default HomeScreen;
