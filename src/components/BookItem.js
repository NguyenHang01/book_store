import React from "react";

const BooktItem = ({book, grid}) => {
  const {anh, ten, gia_bia, chiet_khau} = book;
  return (
    <div className={`gx-product-item  ${grid ? 'gx-product-vertical' : 'gx-product-horizontal'}`}>
      <div className="gx-product-image">
        <div className="gx-grid-thumb-equal">
          <span className="gx-link gx-grid-thumb-cover">
            <img alt="book" src={anh}/>
          </span>
        </div>
      </div>

      <div className="gx-product-body">
        <h3 className="gx-product-title">{ten}
        </h3>
        <div className="ant-row-flex">
          <h4>{gia_bia*( 1-chiet_khau/100)}đ </h4>
          <h5 className="gx-text-muted gx-px-2">
            <del>{gia_bia}đ</del>
          </h5>
          <h5 className="gx-text-success">{chiet_khau} off</h5>
        </div>
      </div>
    </div>
  )
};

export default BooktItem;

