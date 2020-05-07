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

  getBookById = async book => {
    let data = {};
    await db
      .collection("sach")
      .doc(book.id)
      .get()
      .then(snapshot => {
        data = snapshot.data();
        data.id = snapshot.id;
      })
      .catch(err => {
        console.log("Error getting documents", err);
      });
    data.sl_order = book.so_luong; //so luong sach co id=book.id trong gio hang
    return data;
  };

  async componentDidMount() {
    const uid = firebase.auth().currentUser.uid;
    const listIdBook = await this.getListIdBook(uid);
    let listBook = [];
    for (let i = 0; i < listIdBook.length; i++) {
      listBook.push(await this.getBookById(listIdBook[i]));
    }
    this.setState({ listBook: listBook });
  }

  openNotificationWithIcon = (type, message) => {
    notification[type]({
      message: message
    });
  };

  onChange = data => {
    console.log(data);
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
                      book={book}
                      onChange={e => {
                        onchange(e);
                      }}
                    />
                  </Col>
                </Row>
              ))}
            </div>
            <div style={{ float: "left", width: "30%" }}>
              <Card>
                <h3>Tổng tiền tạm tính: </h3>
              </Card>
            </div>
          </div>
        </div>
        {/* <Row>
          <Col span={2}/>
<p>Hello</p>
        </Row> */}
      </div>
    );
  }
}

export default ListCart;
