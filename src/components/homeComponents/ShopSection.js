import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Rating from "./Rating";
import Pagination from "./pagination";
import {useDispatch, useSelector} from "react-redux";
import {listProduct} from "../../Redux/Actions/ProductActions";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import {listCategories} from "../../Redux/Actions/CategoryActions";

const ShopSection = (props) => {
    const dispatch = useDispatch();
    const [filter, setFilter] = useState();
    const [category, setCategory] = useState("");
    const {keyword, pageNumber} = props;
    const productList = useSelector((state) => state.productList);
    const {loading, error, products, page, pages} = productList;

    const categoriesList = useSelector((state) => state.categoriesList);
    const {categories} = categoriesList;

    useEffect(() => {
        dispatch(listProduct(keyword, pageNumber, filter, category));
        dispatch(listCategories());
    }, [dispatch, keyword, pageNumber, filter, category]);
    return (
        <>

            <div className="container">
                <div className="section">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 article">
                            <div className="shopcontainer row">
                                {loading ? (
                                    <div className="mb-5">
                                        <Loading/>
                                    </div>
                                ) : error ? (
                                    <Message variant="alert-danger">{error}</Message>
                                ) : (
                                    <>
                                        <div className="logun">
                                            <h3> Chào mừng bạn đến với BookShop !!! Chúng tôi cam kết mang đến cho bạn
                                                những sản phẩm vô cùng chất lượng về mẫu mã lẫn giá cả.</h3>
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="product_category" className="form-label">
                                                Phân loại theo danh mục
                                            </label>
                                            <select
                                                id="product_category"
                                                className="form-control"
                                                required
                                                value={category}
                                                onChange={(e) => setCategory(e.target.value)}
                                            >
                                                <option h> --- Chọn danh mục ---</option>
                                                <option value="">Tất cả</option>
                                                {categories.map((category) => (
                                                    <option key={category._id} value={category._id}>
                                                        {category.name}
                                                    </option>
                                                ))}
                                            </select>
                                            <label htmlFor="product_price" className="form-label">
                                                Phân loại theo giá
                                            </label>
                                            <select
                                                id="filter"
                                                value={filter}
                                                className="form-select"
                                                onChange={(e) => setFilter(e.target.value)}
                                            >
                                                <option value="PRICE_HIGH_TO_LOW">
                                                    Giá: từ cao đến thấp
                                                </option>
                                                <option value="PRICE_LOW_TO_HIGH">
                                                    Giá: từ thấp đến cao
                                                </option>
                                            </select>
                                        </div>
                                        {products.map((product) => (
                                            <div
                                                className="shop col-lg-4 col-md-6 col-sm-6"
                                                key={product._id}
                                            >
                                                <div className="border-product">
                                                    <Link to={`/products/${product._id}`}>
                                                        <div className="shopBack">
                                                            <img src={product.image} alt={product.name}/>
                                                        </div>
                                                    </Link>

                                                    <div className="shoptext">
                                                        <p>
                                                            <Link to={`/products/${product._id}`}>
                                                                {product.name}
                                                            </Link>
                                                        </p>

                                                        <Rating
                                                            value={product.rating}
                                                            text={`${product.numReviews} đánh giá`}
                                                        />
                                                        <h3>{product.price.toLocaleString()} VNĐ</h3>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </>
                                )}

                                {/* Pagination */}
                                <Pagination
                                    pages={pages}
                                    page={page}
                                    keyword={keyword ? keyword : ""}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ShopSection;
