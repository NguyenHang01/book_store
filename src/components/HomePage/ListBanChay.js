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

  subString=(arr_key)=>{
    const arr_result = [];
    for (let i = 0; i < arr_key.length; i++) {
      let key = "";
      for (let j = i; j < arr_key.length; j++) {
        key+=arr_key[j]+' ';
        arr_result.push(key);
      }
    }
    return arr_result;
  }
  addArraySubString=()=>{
    const db = firebase.firestore();
    db.collection("sach")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          let data = doc.data();
          let id = doc.id;
          let name = data.ten.toLowerCase();
          const arr_key = [];
          name.split(' ').forEach(a => {
            arr_key.push(a);
          });
          let arr_result=this.subString(arr_key);
          db.collection('sach').doc(id).update({arr_result: arr_result})
        });
      });
  }

  componentDidMount() {
    let bestSellerList = [];
    const db = firebase.firestore();
   // this.addArraySubString();
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
            <CardBox>
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
