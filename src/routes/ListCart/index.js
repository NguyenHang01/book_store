import React, { Component } from "react";
import { Col, Row, Card, Button, Input, notification } from "antd";
import firebase from "firebase";
import { object } from "prop-types";
import BooktItemForCart from "../../components/BookItemForCart";

const db = firebase.firestore();
class ListCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listBook: []
    };
  }

  getListIdBook = async uid => {
    let listIdBook = [];
    await db.collection("gio_hang")
      .doc(uid)
      .collection("sach")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          let data = doc.data();
          data.id = doc.id;
          listIdBook.push(data);
        });
      })
      .catch(err => {
        console.log("Error getting documents", err);
      });
    return listIdBook;
  };

  async componentDidMount() {
    const uid = firebase.auth().currentUser.uid;
    const listIdBook = await this.getListIdBook(uid);
    // let listBook = [];
    // for (let i = 0; i < listIdBook.length; i++) {
    //   listBook.push(await this.getBookById(listIdBook[i]));
    // }
    this.setState({ listBook: listIdBook });
  }

  openNotificationWithIcon = (type, message) => {
    notification[type]({
      message: message
    });
  };

  render() {
    const { listBook } = this.state;
    console.log(listBook);
    return (
      <div>
        <div className="gx-main-content">
          <div>
            <div style={{ float: "left", width: "70%" }}>
              {listBook.map((book, index) => (
                <Row style={{ width: 720 }}>
                  <Col key={index} span={24}>
                    <BooktItemForCart
                      key={index}
                      id_book={book}
                    />
                  </Col>
                </Row>
              ))}
            </div>
            <div style={{ float: "left", width: "30%" }}>
              <Card>
                <div>
                  <img src="https://i.pinimg.com/564x/dd/a5/0b/dda50bb0b5a78b869f2f6a4a5c2fd5c8.jpg"/>
                  <Button type="primary" block>Đặt hàng ngay </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ListCart;
