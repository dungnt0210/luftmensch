import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { listProducts, deleteProduct } from "../actions/productAction";

const ProductsPage = ({ listProducts, deleteProduct, products }) => {
   useEffect(() => {
    listProducts();
    }, [listProducts]);
    const deleteItem = (e, id) => { 
        e.stopPropagation();
        e.preventDefault();
        deleteProduct(id);
    }
   return (
        <div>
        <table>
            <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Collar</th>
                <th>Action</th>
            </tr>
        {products.map(
            item => (
                <tr>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>{item.qty}</td>
                    <td>{item.collar}</td>
                    <td>
                        <a href={'/update-product/' + item._id}>Update</a>
                        <button onClick={e => deleteItem(e, item._id)}>Delete</button>
                    </td>
                </tr>
            )
        )
        }
        </table>
        </div>
        
   );
};

const mapStateToProps = state => ({
    products: state.product.lists
});

export default connect(
    mapStateToProps,
    { listProducts, deleteProduct })
(ProductsPage);
