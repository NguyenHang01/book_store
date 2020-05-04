import React, { Component } from "react";
import { Col, Row, Form } from "antd";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CardBox from "../CardBox/index";
import firebase from "firebase";
import BookItem from "../BookItem";

class ListBanChay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bestSellerList: []
    };
  }

  componentDidMount() {
    let bestSellerList = [];
    const db = firebase.firestore();
    db.settings({
      timestampsInSnapshots: true
    });
    db.collection("sach")
      .orderBy("da_ban", "desc")
      .limit(15)
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          let data = doc.data();
          data.id = doc.id;
          bestSellerList.push(data);
        });
        this.setState({ bestSellerList: bestSellerList });
      })
      .catch(err => {
        console.log("Error getting documents", err);
      });
  }
  render() {
    console.log(this.state.bestSellerList);
    const { bestSellerList } = this.state;
    const options1 = {
      dots: true,
      infinite: false,
      speed: 400,
      marginLeft: 5,
      marginRight: 5,
      slidesToShow: 6,
      slidesToScroll: 1
    };

    return (
      <div className="gx-main-content">
        <Row>
          <Col span={24}>
            <CardBox styleName="gx-text-center" heading="Sách bán chạy">
              <Slider {...options1}>
                {bestSellerList.map(book => (
                  <div key={book.id}>
                    <BookItem book={book} grid />
                  </div>
                ))}
              </Slider>
            </CardBox>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ListBanChay;
