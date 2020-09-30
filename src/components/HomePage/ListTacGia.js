import React, { Component } from "react";
import { Col, Row } from "antd";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CardBox from "../CardBox/index";
import firebase from "firebase";
import TacGiaItem from "./TacGiaItem";

class ListTacGia extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list_tac_gia: []
    };
  }

  componentDidMount() {
    const user = firebase.auth().currentUser;
    console.log(user);
    let list_tac_gia = [];
    const db = firebase.firestore();
    db.collection("tac-gia")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          let data = doc.data();
          data.id = doc.id;
          list_tac_gia.push(data);
        });
        this.setState({ list_tac_gia: list_tac_gia });
      })
      .catch(err => {
        console.log("Error getting documents", err);
      });
  }
  render() {
    const { list_tac_gia } = this.state;
    const options1 = {
      dots: true,
      infinite: false,
      speed: 400,
      marginLeft: 5,
      marginRight: 5,
      slidesToShow: 4,
      slidesToScroll: 1
    };

    return (
      <div className="gx-main-content">
        <Row>
          <Col span={24}>
            <CardBox  heading="Tác giả">
              <Slider {...options1}>
                {list_tac_gia.map(tac_gia => (
                  <div key={tac_gia.id}>
                    <TacGiaItem tac_gia={tac_gia}  />
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

export default ListTacGia;
