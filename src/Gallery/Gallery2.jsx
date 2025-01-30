import React from "react";
import Masonry from "react-masonry-css";
import "./Gallery.css";

const Gallery2 = ({ images }) => {
  const breakpointColumnsObj = {
    default: 3, // 3 columns for large screens
    1100: 3,    // 3 columns for medium screens
    700: 2,     // 2 columns for small screens
    500: 1,     // 1 column for extra small screens
  };

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="gallery-masonry"
      columnClassName="gallery-column"
    >
      {images.map((image, index) => (
        <div className="gallery-item" key={index}>
          {image.src && <img src={image.src} alt={image.alt || `Image ${index}`} />}
        </div>
      ))}
    </Masonry>
  );
};

export default Gallery2;