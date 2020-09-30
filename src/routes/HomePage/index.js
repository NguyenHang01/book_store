import React from "react";
import ListBanChay from "../../components/HomePage/ListBanChay";
import BookGrid from "../../components/HomePage/BookGrid"
import ListTacGia from "../../components/HomePage/ListTacGia";
import ListNXB from "../../components/HomePage/ListNXB";
import ListTheLoai from "../../components/HomePage/ListTheLoai";

const HomePage = () => {
  return (
    <div>
      {/* <ListBanChay /> */}
      <BookGrid />
      <ListTacGia/>
      <ListNXB/>
      <ListTheLoai/>
    </div>
  );
};

export default HomePage;
