import React from "react";

const CalltoActionSection = () => {
  return (
    <div className="subscribe-section bg-with-black">
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <div className="subscribe-head">
              <h2>Bạn có muốn nhận được tin tức mới nhất?</h2>
              <p>Đăng ký miễn phí và nhận các tin tức mới nhất từ cửa hàng.</p>
              <form className="form-section">
                <input placeholder="Nhập Email của bạn..." name="email" type="email" />
                <input value="Đăng ký" name="subscribe" type="submit" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalltoActionSection;
