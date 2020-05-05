import React, { Component } from "react";
import { Col, Row, Pagination } from "antd";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import firebase from "firebase";
import BookItem from "../BookItem";
import CardBox from "../CardBox";

class ListBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list_book: [],
    };
  }

  getListBook = db => {
    let list_book = [];

    db.collection("sach")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          let data = doc.data();
          data.id = doc.id;
          list_book.push(data);
        });
        this.setState({ list_book: list_book });
      })
      .catch(err => {
        console.log("Error getting documents", err);
      });
  };

  componentDidMount() {
    const db = firebase.firestore();
    db.settings({
      timestampsInSnapshots: true
    });
    this.getListBook(db);
  }
  render() {
    const { list_book, page, totalPage } = this.state;
    return (
      <div>
        <CardBox heading="Tất cả sách">
          <Row>
            {list_book.map((book, index) => (
              <Col key={index} xl={6} md={8} sm={12} xs={24}>
                <BookItem key={index} grid book={book} />
              </Col>
            ))}
          </Row>
          {/* <div>
            <Pagination
              current={page}
              defaultPageSize={page_size}
              total={2} //total number of card data available
              onChange={this.onChangePage}
            />
          </div> */}
        </CardBox>
      </div>
    );
  }
}

export default ListBook;
