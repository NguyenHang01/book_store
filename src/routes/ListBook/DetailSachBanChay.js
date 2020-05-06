import React, { Component } from "react";
import BooktItem from "../../components/BookItem";
import { Col, Row } from "antd";
import firebase from "firebase";
import BookItem from "../../components/BookItem";

class DetailSachBanChay extends Component {
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

    return (
      <div className="gx-main-content">
        <Row>
          {bestSellerList.map((book, index) => (
            <Col key={index} span={20} pull={2} push={2}>
              <BooktItem key={index} book={book} />
            </Col>
          ))}
        </Row>
      </div>
    );
  }
}

export default DetailSachBanChay;
