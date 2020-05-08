import React, { Component } from "react";
import { Col, Row, Card, Button, Input, notification } from "antd";
import firebase from "firebase";
import BooktItemForCart from "../../components/BookItemForCart";
import { Link } from "react-router-dom";

const db = firebase.firestore();
class ListCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listBook: [],
      isClickCost: 0,
      totalCost: 0
    };
  }

  getListIdBook = async uid => {
    let listIdBook = [];
    await db
      .collection("gio_hang")
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
    this.setState({ listBook: listIdBook });
  }

  openNotificationWithIcon = (type, message) => {
    notification[type]({
      message: message
    });
  };

  getCostBookById = async id_book => {
    let data = {};
    await db
      .doc(`sach/${id_book}`)
      .get()
      .then(snapshot => {
        data = snapshot.data();
        data.id = snapshot.id;
      })
      .catch(err => {
        console.log("Error getting documents", err);
      });
    return Math.floor(data.gia_bia * (1 - data.chiet_khau/100)) ;
  };

  handleTotal =async () => {
    const { listBook, isClickCost } = this.state;
    var totalCost=0;
    await Promise.all( listBook.map(async (book) => {
      let cost = await this.getCostBookById(book.id);
      totalCost = totalCost + cost * book.so_luong;
    }))
    console.log(totalCost);
     this.setState({totalCost:totalCost, isClickCost:1})
  };

  render() {
    const { listBook, isClickCost, totalCost } = this.state;
    return (
      <div>
        <div className="gx-main-content">
          <div>
            <div style={{ float: "left", width: "70%" }}>
              {listBook.map((book, index) => (
                <Row style={{ width: 720 }}>
                  <Col key={index} span={24}>
                    <BooktItemForCart key={index} id_book={book} />
                  </Col>
                </Row>
              ))}
            </div>
            <div style={{ float: "left", width: "30%" }}>
              <Card>
                <Button type="primary" block onClick={this.handleTotal}>
                  Xem tổng tiền{" "}
                </Button>
                {!isClickCost ? null : <h3>Tổng tiền tạm tính: {Number((totalCost).toFixed(1)).toLocaleString()}đ</h3>}
                <Link to={`/order`}>
                  <div>
                    <Button type="primary" block>
                      Đặt hàng ngay{" "}
                    </Button>
                  </div>
                </Link>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ListCart;
