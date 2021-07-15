import React, {useEffect, useState} from "react";
import { connect } from 'react-redux';
import {listProductByCategory} from '../actions/productAction';
import ProductList from "../components/product/ProductList";
import { Col, Row } from "antd";
import Filter from "../components/product/Filter";
import { sizes, colors } from "../utils/constants";
const CategoryPage = ({
  listProductByCategory, 
  list, 
  match,
  isAuthenticated,
  loading}) => {
    useEffect(() => {
        listProductByCategory(match.params.id);
     }, [listProductByCategory, match]);
    const [filterColors, setFilterColors] = useState(colors);
    const [listing, setListing] = useState(list);
    const filterListing = (lsColor, size, min, max) => {
      listing.filter(item => {
        
      })
    }
    const toggleFilterColor = (index, checked) => {
        let nextColors = [...filterColors];
        nextColors[index].checked = !checked;
        setFilterColors(nextColors);
    }
    const [chosenSize, setChosenSize] = useState("");
    const handleFilterSize = e => {
       setChosenSize(e.target.value);
    }
    const handleFilterPrice = value => {
      console.log(value);
   }
   const handleCloseSize = () =>{
    setChosenSize("");
   }
   return (

    <div className="site-card-wrapper">
    <Row gutter={24}>
      <Col span={6}>
          <Filter 
          toggleFilterColor={toggleFilterColor} 
          filterColors={filterColors}
          filterSizes={sizes}
          chosenSize={chosenSize}
          hanldeFilterPrice={handleFilterPrice}
          handleFilterSize={handleFilterSize}
          handleCloseSize={handleCloseSize}
          />
        </Col>
      <Col span={18}>
        <ProductList listing={list} isAuthenticated={isAuthenticated} />
      </Col>
    </Row>
  </div>
   );
};

const mapStateToProps = state => ({
  list: state.product.list,
  isAuthenticated: state.customer.isAuthenticated,
  loading: state.product.productLoading || state.product.productsLoading
});

export default connect(
  mapStateToProps,
  {listProductByCategory}
)(CategoryPage);
  
