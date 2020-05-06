import React from "react";
import { Link } from "react-router-dom";

const NxbItem = ({ nxb }) => {
  const { anh, ten } = nxb;
  return (
    <Link to={`/id_nxb/${nxb.id}`}>
    <div className="gx-classic-testimonial gx-slide-item">
      <div style={{ width: 225, height: 225 }}>
        <img src={anh} alt="..." />
      </div>
      <h3 className="gx-title">{ten}</h3>
    </div>
    </Link>
  );
};

export default NxbItem;
