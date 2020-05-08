import React from "react";
import { Link } from "react-router-dom";

const BooktItem = ({book, grid}) => {
  const {anh, ten, gia_bia, chiet_khau, chi_tiet} = book;
  const gia_ban= Math.floor(gia_bia*( 1-chiet_khau/100)) ;
  return (
    <Link to={`/book/${book.id}`}>
    <div style={{marginLeft:10}} className={`gx-product-item  ${grid ? 'gx-product-vertical' : 'gx-product-horizontal'}`}>
      <div style={{width:160, height:210}} className="gx-product-image">
      <img style={{height:200, width:150, marginRight:5, marginLeft:10, marginBottom:3}} alt="book" src={anh}/>
      </div>

      <div style={{padding:18}}  className="gx-product-body">
        <div style={{height:35, width:125}}>
        <h5 >{ten}
        </h5>
        </div>
        <div className="ant-row-flex">
          <h4>{Number(gia_ban).toLocaleString() }đ </h4>
          <h5 className="gx-text-muted gx-px-2">
            <del>{Number(gia_bia).toLocaleString()}đ</del>
          </h5>
          <h5 className="gx-text-success">{chiet_khau}% off</h5>
        </div>
        {grid?"":<p>{chi_tiet.slice(0,150)}...</p>}

      </div>
    </div>
    </Link>
  )
};

export default BooktItem;

