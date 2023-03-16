import React from "react";
import "./ImageList.css";
import ImageCard from "./ImageCard";

const ImageList = (props) => {
  if (props.images.length > 0) {
    const images = props.images.map((image) => {
      return <ImageCard key={image.id} image={image} />;
    });
    return <div className="image-list">{images}</div>;
  } else {
    return <div>No Images found for your search!</div>;
  }
};

export default ImageList;
