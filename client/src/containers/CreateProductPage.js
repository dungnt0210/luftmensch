import React, {useState} from "react";
import { connect } from "react-redux";
import { createProduct } from "../actions/productAction";
import PropTypes from "prop-types";

const CreateProductPage = ({ loading, createProduct, history }) => {
    const [product, setProduct] = useState({
        name: "",
        qty: "",
        price: "",
        collar: ""
     });
  
     const handleChange = e => {
        setProduct({
           ...product,
           [e.target.name]: e.target.value
        });
     };
     const handleSubmit = e => {
        e.preventDefault();
        const { name, qty, price, collar  } = product;
        createProduct({ name, qty, price, collar  }, history);
     };
  
     return (
        <form onSubmit={handleSubmit}>
            Name: <input type="text" name="name" onChange={handleChange}/>
            Qty: <input type="number" name="qty" onChange={handleChange}/>
            Price: <input type="number" name="price" onChange={handleChange}/>
            Collar: <input type="text" name="collar" onChange={handleChange}/>
            <button type="submit">Submit</button>
        </form>
     );
  };
  const mapStateToProps = state => ({
    loading: state.product.productLoading,
 });
 CreateProductPage.propTypes = {
    createProduct: PropTypes.func.isRequired
 };
 
 export default connect(
    mapStateToProps,
    { createProduct }
 )(CreateProductPage);
  