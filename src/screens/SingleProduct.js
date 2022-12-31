import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Rating from "../components/homeComponents/Rating";
import {
  createProductReview,
  listProductDetails,
} from "../Redux/Actions/ProductActions";
import { PRODUCT_CREATE_REVIEW_RESET } from "../Redux/Constants/ProductConstants";
import Header from "./../components/Header";
import {
  default as Loading,
  default as Message,
} from "./../components/LoadingError/Error";

const SingleProduct = ({ history, match }) => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");

  const productId = match.params.id;
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    loading: loadingCreateReview,
    error: errorCreateReview,
    success: successCreateReview,
  } = productReviewCreate;

  useEffect(() => {
    if (successCreateReview) {
      alert("Đánh giá đã gửi");
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(listProductDetails(productId));
  }, [dispatch, productId, successCreateReview]);

  const AddToCartHandle = (e) => {
    e.preventDefault();
    const isEmpty = Object.values({
      productId,
      qty,
      size,
      color,
    }).some((x) => !x);
    console.log({ isEmpty });

    if (isEmpty)
      alert(
        "Không được bỏ trống các trường Tình Trang,, Loại sách, Số lượng..."
      );
    else
      history.push(`/cart/${productId}?qty=${qty}&size=${size}&color=${color}`);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createProductReview(productId, { rating, comment }));
  };

  console.log(product);

  return (
    <>
      <Header />
      <div className="container single-product">
        {loading ? (
          <div>
            <Loading />
          </div>
        ) : error ? (
          <Message variant="alert-danger">{error}</Message>
        ) : (
          <>
            <div className="row">
              <div className="col-md-6">
                <div className="single-image">
                  <img src={product.image} alt={product.name} />
                </div>
              </div>
              <div className="col-md-6">
                <div className="product-dtl">
                  <div className="product-info">
                    <div className="product-name">{product.name}</div>
                    <div className="product-count col-lg-7 mb-3">
                      <div className="flex-box d-flex justify-content-between align-items-center">
                        <h6>Giá</h6>
                        <span>{product?.price?.toLocaleString()} VND</span>
                      </div>
                      <div className="flex-box d-flex justify-content-between align-items-center">
                        <h6>Số lượng</h6>
                        <span>{product.countInStock}</span>
                      </div>
                      <div className="flex-box d-flex justify-content-between align-items-center">
                        <h6>Nhận xét</h6>
                        <Rating
                          value={product.rating}
                          text={`${product.numReviews} đánh giá`}
                        />
                      </div>
                      <div className="flex-box d-flex justify-content-between align-items-center">
                        <h6>Tình trạng</h6>
                        <select
                          id="product_size"
                          className="form-select"
                          required
                          onChange={(e) => setSize(e.target.value)}
                        >
                          <option value="">Chọn tình trạng</option>
                          {product?.size?.map((size, i) => (
                            <option key={i} value={size.label}>
                              {size.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="flex-box d-flex justify-content-between align-items-center">
                        <h6>Loại sách</h6>
                        <select
                          id="product_color"
                          className="form-select"
                          required
                          onChange={(e) => setColor(e.target.value)}
                        >
                          <option value="">Chọn loại sách</option>
                          {product?.color?.map((color) => (
                            <option value={color.label}>{color.label}</option>
                          ))}
                        </select>
                      </div>
                      {product.countInStock > 0 ? (
                        <>
                          <div className="flex-box d-flex justify-content-between align-items-center">
                            <h6>Số lượng</h6>
                            <input
                              type="number"
                              name="qty"
                              min="1"
                              max={product.countInStock}
                              onChange={(e) => {
                                if (e.target.value > product.countInStock) {
                                  e.target.value = product.countInStock;
                                }
                                setQty(e.target.value);
                              }}
                            />
                          </div>
                          <button
                            onClick={AddToCartHandle}
                            className="round-black-btn"
                          >
                            Thêm vào giỏ hàng
                          </button>
                        </>
                      ) : null}
                    </div>
                  </div>
                  <span className="product-name">Mô tả</span>
                  <p>{product.description}</p>
                </div>
              </div>
            </div>
          </>
        )}

        {/* RATING */}
        <div className="row my-5">
          <div className="col-md-6">
            <h6 className="mb-3">ĐÁNH GIÁ</h6>
            {product?.reviews?.length === 0 && (
              <Message variant={"alert-info mt-3"}>Chưa có đánh giá</Message>
            )}
            {product?.reviews?.map((review) => (
              <div
                key={review._id}
                className="mb-5 mb-md-3 bg-light p-3 shadow-sm rounded"
              >
                <strong>{review.name}</strong>
                <Rating value={review.rating} />
                <span>{moment(review.createdAt).calendar()}</span>
                <div className="alert alert-info mt-3">{review.comment}</div>
              </div>
            ))}
          </div>
          <div className="col-md-6">
            <h6>VIẾT BÀI ĐÁNH GIÁ CỦA KHÁCH HÀNG</h6>
            <div className="my-4">
              {loadingCreateReview && <Loading />}
              {errorCreateReview && (
                <Message variant="alert-danger">{error}</Message>
              )}
            </div>
            {userInfo ? (
              <form onSubmit={submitHandler}>
                <div className="my-4">
                  <strong>Xếp hạng</strong>
                  <select
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    className="col-12 bg-light p-3 mt-2 border-0 rounded"
                  >
                    <option value="">Lựa chọn...</option>
                    <option value="1">1 - Tệ</option>
                    <option value="2">2 - Tạm ổn</option>
                    <option value="3">3 - Tốt</option>
                    <option value="4">4 - Rất tốt</option>
                    <option value="5">5 - Tuyệt vời</option>
                  </select>
                </div>
                <div className="my-4">
                  <strong>Nhận xét</strong>
                  <textarea
                    row="3"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="col-12 bg-light p-3 mt-2 border-0 rounded"
                  ></textarea>
                </div>
                <div className="my-3">
                  <button
                    disabled={loadingCreateReview}
                    className="col-12 bg-black border-0 p-3 rounded text-white"
                  >
                    THÊM
                  </button>
                </div>
              </form>
            ) : (
              <div className="my-3">
                <Message variant={"alert-warning"}>
                  Xin vui lòng{" "}
                  <Link to="/login">
                    " <strong>Đăng nhập</strong> "
                  </Link>{" "}
                  để viết bình luận{" "}
                </Message>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
