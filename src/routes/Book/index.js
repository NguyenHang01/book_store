import React, { Component } from "react";
import { Col, Row, Card, Button, Input, notification } from "antd";
import firebase from "firebase";
class BookDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      book: {},
      quantity: 1
    };
  }

  componentDidMount() {
    const db = firebase.firestore();
    db.settings({
      timestampsInSnapshots: true
    });

    db.collection("sach")
      .doc(this.props.match.params.id)
      .get()
      .then(snapshot => {
        let data = snapshot.data();
        data.id = snapshot.id;
        this.setState({ book: data });
      })
      .catch(err => {
        console.log("Error getting documents", err);
      });
  }

  openNotificationWithIcon = (type, message) => {
    notification[type]({
      message: message
    });
  };

  changeQuantity = e => {
    let { book, quantity } = this.state;
    switch (e.target.id) {
      case "tang":
        if (quantity === book.so_luong)
          this.openNotificationWithIcon(
            "warning",
            "Không thể mua quá số lượng trong kho"
          );
        else this.setState({ quantity: quantity + 1 });
        break;
      case "giam":
        if (quantity > 1) this.setState({ quantity: quantity - 1 });
        break;
    }
  };

  addCart = () => {
    this.openNotificationWithIcon("success", "Thêm vào giỏ hàng thành công");
  };

  render() {
    const { book, quantity } = this.state;
    const { chi_tiet } = book;
    return (
      <div>
        <Card>
          <Row>
            <Col span={12}>
              <img src={book.anh}></img>
            </Col>
            <Col span={12}>
              <div style={{ marginTop: 30 }}>
                <h1 style={{ fontWeight: "bold" }}>{book.ten}</h1>
                <p>Tác giả: {book.tac_gia}</p>
                <p>Nhà xuất bản: {book.nxb}</p>
                <p>Thể loại: {book.the_loai}</p>
                <div className="ant-row-flex">
                  <h2 style={{ color: "#ff9900" }}>
                    {Math.floor(book.gia_bia * (1 - book.chiet_khau / 100))}đ{" "}
                  </h2>
                  <h5 className="gx-text-muted gx-px-2">
                    <del>{book.gia_bia}đ</del>
                  </h5>
                  <h5 className="gx-text-success">-{book.chiet_khau}%</h5>
                </div>
                <h4>
                  <br />
                  Số lượng: {book.so_luong}
                </h4>
                <div>
                  <Input.Group compact>
                    <Button
                      id="tang"
                      style={{ width: "19%" }}
                      onClick={this.changeQuantity}
                    >
                      +
                    </Button>
                    <Input
                      style={{ width: "12%" }}
                      value={quantity}
                      onChange={this.changeQuantity}
                    />
                    <Button
                      id="giam"
                      style={{ width: "19%" }}
                      onClick={this.changeQuantity}
                    >
                      -
                    </Button>
                  </Input.Group>
                </div>
                <Button type="primary" size={14} onClick={this.addCart}>
                  <i className="icon icon-shopping-cart" />
                  Thêm vào giỏ hàng
                </Button>
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={20} pull={2} push={2}>
              <div style={{ marginTop: 30 }}>{chi_tiet}</div>
            </Col>
          </Row>
        </Card>
      </div>
    );
  }
}

export default BookDetail;
