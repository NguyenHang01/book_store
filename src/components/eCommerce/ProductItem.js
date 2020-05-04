import React from "react";

const ProductItem = ({product, grid}) => {
  const {thumb, name, price, mrp, offer, description} = product;
  return (
    <div className={`gx-product-item  ${grid ? 'gx-product-vertical' : 'gx-product-horizontal'}`}>
      <div className="gx-product-image">
        <div className="gx-grid-thumb-equal">
          <span className="gx-link gx-grid-thumb-cover">
            <img alt="Remy Sharp" src={thumb}/>
          </span>
        </div>
      </div>

      <div className="gx-product-body">
        <h3 className="gx-product-title">{name}
        </h3>
        <div className="ant-row-flex">
          <h4>{price} </h4>
          <h5 className="gx-text-muted gx-px-2">
            <del>{mrp}</del>
          </h5>
          <h5 className="gx-text-success">{offer} off</h5>
        </div>
        <p>{description}</p>
      </div>
    </div>
  )
};

export default ProductItem;

