import React, {useEffect} from "react";
import ProductForm from "./ProductForm";
import { connect } from 'react-redux';
import { getProductById } from "../../../actions/productAction";
const ProductUpdate = ({data, getProductById, match}) => {
    useEffect(() => {
        getProductById(match.params.id);
     }, [getProductById, match.params.id]);
   return (
      <ProductForm data={data} />
   );
};
const mapStateToProps = state => ({
    data: state.product.data
  });
export default connect(
    mapStateToProps,
    {getProductById})
(ProductUpdate);
