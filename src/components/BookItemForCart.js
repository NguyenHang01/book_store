import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Card, Button, Input, notification, Popconfirm } from "antd";
import firebase from "firebase";

const db = firebase.firestore();
class BooktItemForCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id_book: this.props.id_book,
      book:{},
    };
  }

  getBookById = async id_book => {
    let data = {};
    await db
      // .collection("sach")
      .doc(`sach/${id_book.id}`)
      .get()
      .then(snapshot => {
        data = snapshot.data();
        data.id = snapshot.id;
      })
      .catch(err => {
        console.log("Error getting documents", err);
      });
    data.quantity = id_book.so_luong; //so luong sach co id=book.id trong gio hang
    return data;
  };

  async componentDidMount(){
    const {id_book} = this.state;
    const book= await this.getBookById(id_book);
    this.setState({book:book});
  }
  openNotificationWithIcon = (type, message) => {
    notification[type]({
      message: message
    });
  };

  changeQuantity = e => {
    const { book } = this.state;
    let quantity=book.quantity;
    switch (e.target.id) {
      case "tang":
        if (quantity === book.so_luong)
          this.openNotificationWithIcon(
            "warning",
            "Không thể mua quá số lượng trong kho"
          );
        else  quantity= quantity + 1 ;
        break;
      case "giam":
        if (quantity > 1)  quantity= quantity - 1;
        break;
    }
    book.quantity=quantity;
    this.setState({book: book});
  };

  UpdateCart=()=>{

  }

  confirm=(e)=>{

  }

  render() {
    const { anh, ten, gia_bia, chiet_khau, id, quantity } = this.state.book;
    return (
      <div
        style={{ marginLeft: 10 }}
        className={`gx-product-item gx-product-horizontal`}
      >
        <div style={{ width: 160, height: 210 }} className="gx-product-image">
          <img
            style={{
              height: 200,
              width: 170,
              marginRight: 5,
              marginLeft: 10,
              marginBottom: 3
            }}
            alt="book"
            src={anh}
          />
        </div>
        <Link to={`/book/${id}`}>
          <div className="gx-product-body">
            <div style={{ height: 60, width: 145 }}>
              <h4>{ten}</h4>
            </div>
            <div className="ant-row-flex">
              <h4>{Math.floor(gia_bia * (1 - chiet_khau / 100))}đ </h4>
              <h5 className="gx-text-muted gx-px-2">
                <del>{gia_bia}đ</del>
              </h5>
              <h5 className="gx-text-success">{chiet_khau}% off</h5>
            </div>
          </div>
        </Link>
        <div>
          <div style={{ float: "inline-start" }}>
            <Input.Group compact>
              <Button
                id="tang"
                style={{ width: "18%" }}
                onClick={this.changeQuantity}
              >
                +
              </Button>
              <Input style={{ width: "14%" }} value={quantity} />
              <Button
                id="giam"
                style={{ width: "18%" }}
                onClick={this.changeQuantity}
              >
                -
              </Button>
            </Input.Group>
          </div>
          <div style={{ float: "inline-start" }}>
            <Popconfirm
              title="Bạn có muốn xóa sản phẩm này ra khỏi giỏ hàng?"
              onConfirm={this.confirm}
              okText="Yes"
              cancelText="No"
            >
              <Button type="primary" danger >
                Xóa
              </Button>
            </Popconfirm>
          </div>
        </div>
      </div>
    );
  }
}

export default BooktItemForCart;
