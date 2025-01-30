import React, { useState } from "react";
import Gallery2 from "./Gallery2";
import drone4 from '../assets/drone4.png';
import drone5 from '../assets/drone5.png';
import drone6 from '../assets/drone6.png';
import drone7 from '../assets/drone7.png';
import drone8 from '../assets/drone8.png';
import drone9 from '../assets/drone9.png';
import drone10 from '../assets/drone10.png';
import drone11 from '../assets/drone11.png';
import './gallery1.css';
import Navbar from "../NavBar";
import Footer from "../Footer";

const Gallery = () => {

  const localImages = [
    { src: drone4, alt: "Image 1" },
    { src: drone5, alt: "Image 2" },
    { src: drone6, alt: "Image 3" },
    { src: drone7, alt: "Image 4" },
    { src: drone8, alt: "Image 5" },
    { src: drone9, alt: "Image 6" },
    { src: drone10, alt: "Image 7" },
    { src: drone11, alt: "Image 8" },
  ];


  // Combine local images and fetched images
  const allImages = [...localImages];

  // Calculate placeholders required to push the last image to the next row
  const columns = 4; // Match your breakpoint (default: 4 columns)
  const placeholdersNeeded = (columns - (allImages.length % columns)) % columns;

  const adjustedImages = [
    ...allImages,
    ...Array(placeholdersNeeded).fill({ src: "", alt: "Placeholder" }),
  ];

  return (
    <>
    <Navbar />
      <div className="gallery-container">
        <h1>Gallery</h1>
          <Gallery2 images={adjustedImages} />
      </div>
      <Footer />
    </>
  );
};

export default Gallery;