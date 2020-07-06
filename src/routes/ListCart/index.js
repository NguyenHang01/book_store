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

  getListIdBook = async () => {
    const uid = localStorage.getItem("user_id");
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
    const listIdBook = await this.getListIdBook();
    this.setState({ listBook: listIdBook });
  }

  openNotificationWithIcon = (type, message) => {
    notification[type]({
      message: message
    });
  };

  handleTotal = async () => {
    const { isClickCost } = this.state;
    const listBook = await this.getListIdBook();
    let totalCost = 0;
    listBook.map(book => {
      totalCost += book.gia_ban * book.so_luong;
    });
    this.setState({ totalCost: totalCost, isClickCost: 1 });
  };

  renderListBook = listBook => {
    return (
      <div style={{ float: "left", width: "70%" }}>
        {listBook.map((book, index) => (
          <Row style={{ width: 720 }}>
            <Col key={index} span={24}>
              <BooktItemForCart key={index} id_book={book} />
            </Col>
          </Row>
        ))}
      </div>
    );
  };

  renderEmpty = () => {
    return (
      <div style={{ float: "left", width: "70%" }}>
        <Card>
        <Row style={{ width: 720 }}>
          <Col span={24}>
            <div>Không có sản phẩm nào trong giỏ hàng</div>
          </Col>
        </Row>
        </Card>
      </div>
    );
  };

  render() {
    const { listBook, isClickCost, totalCost } = this.state;
    return (
      <div>
        <div className="gx-main-content">
          <div>
            {listBook.length === 0
              ? this.renderEmpty()
              : this.renderListBook(listBook)}
            <div style={{ float: "left", width: "30%" }}>
              <Card>
                <Button type="primary" block onClick={this.handleTotal}>
                  Xem tổng tiền{" "}
                </Button>
                {!isClickCost ? null : (
                  <h3>
                    Tổng tiền tạm tính:{" "}
                    {Number(totalCost.toFixed(1)).toLocaleString()}đ
                  </h3>
                )}
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
