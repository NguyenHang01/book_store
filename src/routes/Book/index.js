import React, { Component } from "react";
import { Col, Row, Card, Button, Input, notification } from "antd";
import firebase from "firebase";

const db = firebase.firestore();
class BookDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      book: {},
      quantity: 1,
    };
  }

  componentDidMount() {
    // get sach voi id=this.props.match.params.id
    const id_sach = this.props.match.params.id;
    db.collection("sach")
      .doc(id_sach)
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
        if (quantity >= book.so_luong)
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
    const id_sach = this.props.match.params.id;
    const uid = firebase.auth().currentUser.uid;
    const {quantity, book} = this.state;
    const gia_ban= Math.floor(book.gia_bia * (1 - book.chiet_khau / 100));
    db.collection("gio_hang")
      .doc(uid)
      .collection("sach")
      .doc(id_sach)
      .set({ so_luong: quantity, gia_ban: gia_ban, ten:book.ten})
      .then(() => {
        this.openNotificationWithIcon(
          "success",
          "Thêm vào giỏ hàng thành công"
        );
      })
      .catch(err => {
        console.log(err);
      });

  };

  render() {
    const { book, quantity } = this.state;
    const { chi_tiet } = book;
    const gia_ban= Math.floor(book.gia_bia * (1 - book.chiet_khau / 100));
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
                    {Number(gia_ban).toLocaleString()}đ{" "}
                  </h2>
                  <h5 className="gx-text-muted gx-px-2">
                    <del>{Number(book.gia_bia).toLocaleString()}đ</del>
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
                <Button
                  style={{ marginTop: 25 }}
                  type="primary"
                  size={14}
                  onClick={this.addCart}
                >
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
