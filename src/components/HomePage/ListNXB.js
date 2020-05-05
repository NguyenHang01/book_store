import React, { Component } from "react";
import { Col, Row } from "antd";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CardBox from "../CardBox/index";
import firebase from "firebase";
import NxbItem from "./NxbItem"

class ListNXB extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list_nxb: []
    };
  }

  componentDidMount() {
    let list_nxb = [];
    const db = firebase.firestore();
    db.settings({
      timestampsInSnapshots: true
    });
    db.collection("nxb")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          let data = doc.data();
          data.id = doc.id;
          list_nxb.push(data);
        });
        this.setState({ list_nxb: list_nxb });
      })
      .catch(err => {
        console.log("Error getting documents", err);
      });
  }
  render() {
    const { list_nxb } = this.state;
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
            <CardBox  heading="Nhà xuất bản">
              <Slider {...options1}>
                {list_nxb.map(nxb => (
                  <div key={nxb.id}>
                    <NxbItem nxb={nxb}/>
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

export default ListNXB;
