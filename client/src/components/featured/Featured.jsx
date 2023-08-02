import React from "react";
import "./Featured.scss";

function Featured() {
  return (
    <div className="featured">
      <div className="container">
        <div className="left">
          <h1>
            Find the perfect <span>salon</span> services at your door step!
          </h1>
          <div className="search">
            <div className="searchInput">
              <img src="./img/search.png" alt="" />
              <input type="text" placeholder='Try "building mobil app"' />
            </div>
            <button>Search</button>
          </div>
          <div className="popular">
            <span>Popular:</span>
            <button>Bridal Makeup</button>
            <button>Makeup Artists</button>
            <button>Salon at Home</button>
            <button>Bride Services</button>
          </div>
        </div>
        <div className="right">
          <img
            src="https://res.cloudinary.com/dx78ez1cn/image/upload/v1677665008/edf-removebg-preview_ufor4a.png"
            alt=""
          />
          {/* <img
            src="https://res.cloudinary.com/dx78ez1cn/image/upload/v1677665008/edf-removebg-preview_ufor4a.png"
            alt=""
          /> */}
        </div>
      </div>
    </div>
  );
}

export default Featured;
