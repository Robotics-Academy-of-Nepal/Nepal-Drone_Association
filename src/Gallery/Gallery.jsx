import React, { useState } from "react";
import Gallery2 from "./Gallery2";
import drone12 from '../assets/drone12.jpg';
import drone13 from '../assets/drone13.jpg';
import drone14 from '../assets/drone14.jpg';
import drone15 from '../assets/drone15.png';
import drone16 from '../assets/drone16.jpg';
import drone17 from '../assets/drone17.jpg';
import drone18 from '../assets/drone18.jpg';
import drone19 from '../assets/droned.jpg';
import drone20 from '../assets/drone20.jpg';
import drone22 from '../assets/drone21.jpg';
import drone21 from '../assets/drone22.jpg';
import drone23 from '../assets/drone23.jpg';
import video from '../assets/drone_video.mp4';
import VideoPlayer from "../VideoPlayer";
import './gallery1.css';
import Navbar from "../NavBar";
import Footer from "../Footer";

const Gallery = () => {

  const localImages = [
    { src: drone12, alt:"Image 9"},
    { src: drone13, alt:"Image 10"},
    { src: drone14, alt:"Image 11"},
    { src: drone15, alt:"Image 12"},
    { src: drone16, alt:"Image 13"},
    { src: drone17, alt:"Image 14"},
    { src: drone18, alt:"Image 15"},
    { src: drone19, alt:"Image 16"},
    { src: drone20, alt:"Image 17"},
    { src: drone21, alt:"Image 18"},
    { src: drone23, alt:"Image 20"},
    { src: drone22, alt:"Image 19"},
    
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
        <h1 class="text-3xl font-bold mt-4 mb-4">Gallery</h1>
          <Gallery2 images={adjustedImages} />
          <div className=" p-4">
      <div className="container">
        <VideoPlayer />
      </div>
      </div>
      </div>
      <Footer />
    </>
  );
};

export default Gallery;