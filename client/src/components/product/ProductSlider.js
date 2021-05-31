import React from "react";
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import ImageGallery from 'react-image-gallery';
import './slider.scss';

const ProductSlider = ({data}) => {
    const images = data.images ? data.images.map(item => {
    return {
        original: item,
        thumbnail: item
    }
    } 
    ) : [];
   return (
    <div className="product-slider">
        {images? <ImageGallery items={images} thumbnailPosition="left" showNav={false} showBullets={true}
            showFullscreenButton={false}
            showPlayButton={false}
        /> : null}
        {    console.log(images)}
    </div>
   );
};
ProductSlider.propTypes = {
    data: PropTypes.object.isRequired
   };
   const mapStateToProps = state => ({
    data: state.product.data
  });
  
  export default connect(
    mapStateToProps,
    {}
  )(ProductSlider);
   
