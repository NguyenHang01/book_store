import React from "react";
import { Link } from "react-router-dom";

const TheLoaiItem = ({ the_loai }) => {
  const { anh, ten } = the_loai;
  return (
    <Link to={`/id_the_loai/${the_loai.id}`}>
    <div className="gx-classic-testimonial gx-slide-item">
      <div style={{ width: 225, height: 225 }}>
        <img src={anh} alt="..." />
      </div>
      <h3 className="gx-title">{ten}</h3>
    </div>
    </Link>
  );
};

export default TheLoaiItem;
