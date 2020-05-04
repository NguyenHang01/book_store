import React from "react";
import { Col, Row } from "antd";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Classic from "./Classic/index";
import { listBanChay } from "./testimonialsData";
import CardBox from "components/CardBox/index";

const ListBanChay = () => {
  const options1 = {
    dots: true,
    infinite: true,
    speed: 400,
    marginLeft: 5,
    marginRight: 5,
    slidesToShow: 5,
    slidesToScroll: 3
  };

  return (
    <div className="gx-main-content">
      <Row>
        <Col span={24}>
          <CardBox styleName="gx-text-center" heading="Sách bán chạy">
            <Slider {...options1}>
              {listBanChay.map(book => (
                <div key={book.id}>
                  <Classic testimonial={book} />
                </div>
              ))}
            </Slider>
          </CardBox>
        </Col>
      </Row>
    </div>
  );
};

export default ListBanChay;
