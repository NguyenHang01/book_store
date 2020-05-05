import React, { Component } from "react";
import { Col, Row } from "antd";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CardBox from "../CardBox/index";
import firebase from "firebase";
import TheLoaiItem from "./TheLoaiItem"

class ListTheLoai extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list_the_loai: []
    };
  }

  componentDidMount() {
    let list_the_loai = [];
    const db = firebase.firestore();
    db.settings({
      timestampsInSnapshots: true
    });
    db.collection("the-loai")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          let data = doc.data();
          data.id = doc.id;
          list_the_loai.push(data);
        });
        this.setState({ list_the_loai: list_the_loai });
      })
      .catch(err => {
        console.log("Error getting documents", err);
      });
  }
  render() {
    const { list_the_loai } = this.state;
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
            <CardBox  heading="Thể loại">
              <Slider {...options1}>
                {list_the_loai.map(the_loai => (
                  <div key={the_loai.id}>
                    <TheLoaiItem the_loai={the_loai}/>
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

export default ListTheLoai;
