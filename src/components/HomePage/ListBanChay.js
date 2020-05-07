import React, { Component } from "react";
import { Col, Row } from "antd";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CardBox from "../CardBox/index";
import firebase from "firebase";
import BookItem from "../BookItem";
import { Link } from "react-router-dom";

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
          console.log(doc.data());
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
            <CardBox  >
              <Link to={`/ban_chay`}>
              <h2>Sách bán chạy</h2>
              </Link>
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
