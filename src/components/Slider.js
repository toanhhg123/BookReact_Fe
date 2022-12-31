import Carousel from 'react-bootstrap/Carousel';

function DarkVariantExample() {
    return (
        <Carousel variant="dark">
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    width={200}
                    height={300}
                    src="https://i.imgur.com/h9RENSO.jpeg"
                    alt="First slide"
                />
                <Carousel.Caption>
                    <h5 className='text-white'>BookShop</h5>
                    <p className="text-white">
                        Cam kết gia hàng tận nơi, đúng giá, đúng sản phẩm.
                    </p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    width={250}
                    height={300}
                    src="https://tse1.mm.bing.net/th?id=OIP.5D7fs36kEsxY2OzRdTX2-gHaE7&pid=Api&P=0&fbclid=IwAR2VvKtB1jGhHJqhD6cAvkhHsUuUMi4UZH5-Q52YrbI7rR6jzVwLHmpQaU4"
                    alt="Second slide"
                />
                <Carousel.Caption>
                <h5 className='text-white'>BookShop</h5>
                    <p className="text-white">
                        Cam kết đầy đủ các chất liệu, mẫu mã các bạn yêu cầu.
                    </p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    width={200}
                    height={300}
                    src="https://tse2.mm.bing.net/th?id=OIP.D_WA9DENMOpdC0e7N0iKiAHaEK&pid=Api&P=0&fbclid=IwAR2-VHkFW4f4maNBCx7uU_V-kJuuquiGYDH2rwSF2H8-Oi0MpNjrMUED76Y"
                    alt="Third slide"
                />
                <Carousel.Caption>
                <h5 className='text-white'>BookShop</h5>
                    <p className="text-white">
                        Cam kết sản phẩm thời thượng, hot nhất trên thị trường.
                    </p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}

export default DarkVariantExample;