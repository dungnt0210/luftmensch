import React, {useState, useEffect} from "react";
import { connect } from "react-redux";
import { updateProduct, getProductById } from "../actions/productAction";
import PropTypes from "prop-types";

const UpdateProductPage = ({ currentProduct, updateProduct,getProductById, match, history }) => {
    useEffect(() => {
        console.log("start");
        console.log(match.params.id);
        getProductById(match.params.id);
    }, []);

    const [product, setProduct] = useState({
        name: "",
        qty: "",
        price: "",
        collar: ""
     });
    useEffect(() => {
        setProduct(product => ({
            name: currentProduct.name,
            qty: currentProduct.qty,
            price: currentProduct.price,
            collar: currentProduct.collar
        }));
        }, [currentProduct]);    
     const handleChange = e => {
        setProduct({
           ...product,
           [e.target.name]: e.target.value
        });
     };
     const handleSubmit = e => {
        e.preventDefault();
        const { name, qty, price, collar  } = product;
        updateProduct(currentProduct._id, { name, qty, price, collar  }, history);
     };
  
     return (
        <form onSubmit={handleSubmit}>
            Name: <input type="text" name="name" onChange={handleChange} value={product.name}/>
            Qty: <input type="number" name="qty" onChange={handleChange} value={product.qty}/>
            Price: <input type="number" name="price" onChange={handleChange} value={product.price}/>
            Collar: <input type="text" name="collar" onChange={handleChange} value={product.collar}/>
            <button type="submit">Submit</button>
        </form>
     );
  };
  const mapStateToProps = state => ({
    currentProduct: state.product.data,
 });
 UpdateProductPage.propTypes = {
    updateProduct: PropTypes.func.isRequired,
    getProductById: PropTypes.func.isRequired
 };
 
 export default connect(
    mapStateToProps,
    { updateProduct, getProductById }
 )(UpdateProductPage);
  