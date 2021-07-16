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
    const [ftPrice, setFtPrice] = useState([0, 100]);
    const [sortType, setSortType] = useState("position");
    const [direction, setDirection] = useState(true);
    useEffect(() => {
      if (list)
      setListing(list);
   }, [list]); 
    const filterListing = async (ftColors, ftSize, min, max) => {
      let nextListing = [...list];
      if (ftColors.length) {
        nextListing = await list.filter(item => {
          let itemColors = item.options.map(option => option.color.hexCode);
          return ftColors.some(chosenColor => itemColors.includes(chosenColor));
        });
      }
      if (ftSize) {
        nextListing = await nextListing.filter(item => {
          let qtySize = 0;
          item.options.forEach(option => {
            option.color.sizes.forEach(optionSize => {
              if (optionSize.size === ftSize) {
                qtySize+= optionSize.count;
              }
            })
          });
          return qtySize > 0;
        })
      }
      nextListing = await nextListing.filter(item => item.finalPrice >= min && item.finalPrice <= max);
      if (sortType === "price") {
        nextListing = await nextListing.sort( (itemA, itemB) => {
          return itemB.finalPrice - itemA.finalPrice;
        });
      } else if (sortType==="name") {
        nextListing = await nextListing.sort( (itemA, itemB) => {
          let x = itemA.name.toLowerCase();
          let y = itemB.name.toLowerCase();
          if (x < y) {return -1;}
          if (x > y) {return 1;}
          return 0;
        });
      }
      if (!direction) nextListing = await nextListing.reverse();

      setListing(nextListing);
    }
    const toggleFilterColor = (index, checked) => {
        let nextColors = [...filterColors];
        nextColors[index].checked = !checked;
        setFilterColors(nextColors);
        let ftColors = nextColors.filter(item => item.checked).map(item => item.value);
        filterListing(ftColors, chosenSize, ftPrice[0], ftPrice[1]);
    }
    const [chosenSize, setChosenSize] = useState("");
    const handleFilterSize = e => {
       setChosenSize(e.target.value);
       let ftColors = filterColors.filter(item => item.checked).map(item => item.value);
       filterListing(ftColors, e.target.value, ftPrice[0], ftPrice[1]);
    }
    const handleFilterPrice = value => {
      setFtPrice(value);
      let ftColors = filterColors.filter(item => item.checked).map(item => item.value);
      filterListing(ftColors, chosenSize, value[0], value[1]);
   }
   const handleCloseSize = () =>{
    setChosenSize("");
   }
   const toggleDirection = async (value) => {
     setDirection(value);
     let nextListing = [...listing].reverse();
     setListing(nextListing);
   } 
   const toggleSortType = async (value) => {
     setSortType(value);
     let nextListing = [...listing];
     if (value === "position") {
       nextListing = list;
      let ftColors = filterColors.filter(item => item.checked).map(item => item.value);
      if (ftColors.length) {
        nextListing = await list.filter(item => {
          let itemColors = item.options.map(option => option.color.hexCode);
          return ftColors.some(chosenColor => itemColors.includes(chosenColor));
        });
      }
      if (chosenSize) {
        nextListing = await nextListing.filter(item => {
          let qtySize = 0;
          item.options.forEach(option => {
            option.color.sizes.forEach(optionSize => {
              if (optionSize.size === chosenSize) {
                qtySize+= optionSize.count;
              }
            })
          });
          return qtySize > 0;
        })
      }
      nextListing = await nextListing.filter(item => item.finalPrice >= ftPrice[0] && item.finalPrice <=  ftPrice[1]);
    } else if (value==="name") {
      nextListing = await nextListing.sort( (itemA, itemB) => {
        let x = itemA.name.toLowerCase();
        let y = itemB.name.toLowerCase();
        if (x < y) {return -1;}
        if (x > y) {return 1;}
        return 0;
      });
    } else if (setSortType==="price") {
     nextListing = await nextListing.sort( (itemA, itemB) => {
        return itemB.finalPrice - itemA.finalPrice;
      });
    }
    if(!direction) nextListing = await nextListing.reverse();
    setListing(nextListing);
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
          sortType={sortType}
          toggleSortType={toggleSortType}
          direction={direction}
          toggleDirection={toggleDirection}
          />
        </Col>
      <Col span={18}>
        <ProductList listing={listing} isAuthenticated={isAuthenticated} />
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
  
