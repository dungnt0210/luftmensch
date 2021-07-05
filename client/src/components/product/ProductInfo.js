import React, {useState} from "react";
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import {addToWishlist, addToCart} from '../../actions/customerAction';
import { Radio , Button, Typography, Collapse, message, InputNumber } from 'antd';
import {
    HeartOutlined,
    ShoppingOutlined
  } from '@ant-design/icons';
import './info.scss';
const ProductInfo = ({data, cart, wishlist, loading,  isAuthenticated, addToCart, addToWishlist, history}) => {
    const [size, setSize] = useState('');
    const [sizeIndex, setSizeIndex] = useState(-1);
    const [color, setColor] = useState('');
    const [colorIndex, setColorIndex] = useState(-1);

    const [maxQty, setMaxQty] = useState(0);
    const [qty, setQty] = useState(1);
    const [sizes, setSizes] = useState([
      {label: 'XS', value: 'XS', disabled: false, count: 10},
      {label: 'S', value: 'S', disabled: false, count: 10},
      {label: 'M', value: 'M', disabled: false, count: 10},
      {label: 'L', value: 'L', disabled: false, count: 10},
      {label: 'XL', value: 'XL', disabled: false, count: 10},
      {label: 'XXL', value: 'XXL', disabled: false, count: 10}
  ]);

    const onSizeChange = e => {
      if (color) {
        setSize(e.target.value);
        let sizeKey = sizes.findIndex(item => item.value === e.target.value);
        setSizeIndex(sizeKey);
        setMaxQty(sizes[sizeKey].count);
        setQty(1);
      } else {
        message.error("Please pick your favorite color first");
      }
    }
    const onColorChange = e => {
      let colorKey = data.options.findIndex(item => item.color.name === e.target.value);
      setColorIndex(colorKey);
      setColor(e.target.value);
      setQty(1);
      if (data) {
        let newSizes = data.options[colorKey].color.sizes.map(item => ({label: item.size, value: item.size, disabled: item.count === 0, count:item.count}));
        setSizes(newSizes);
        if (size) {
          let sizeKey = sizes.findIndex(item => item.value === size);
          if (sizes[sizeKey].disabled) {
            setSize('');
          }
        }
      }
    }
    const onClickWishlist = e => {
      if (wishlist.findIndex(item => item._id === data._id) === -1) {
        addToWishlist(data._id, wishlist, isAuthenticated, history);
      } else {
        message.warning("Product is already added to your wishlist");
      }
    }
    const handleQtyChange = value => {
      setQty(value)
    }
    const onClickCart = e => {
      e.stopPropagation();
      e.preventDefault();
      if (size && color) {
        let product = {
          productId: {
            _id: data._id,
            name: data.name,
            price: data.price
            },
          options: {
            size: size,
            qty: qty,
            color: color,
            maxQty: maxQty,
            sizeIndex: sizeIndex,
            colorIndex: colorIndex,
            price: data.finalPrice
          }
        }
        addToCart(product, cart, isAuthenticated);
      } else {
        message.error("Please pick color and size before add to cart");
      }
    }
    let colors = data.options ? data.options.map(
      item => { 
        return { value: item.color.name, 
          hexCode: item.color.hexCode,
          label: item.color.name
        }}
    ) : [];
  
   return (
    <div className="product-info">
        <Typography.Title level={4}>{data.name}</Typography.Title>
        <Typography.Paragraph>${data.finalPrice ? data.finalPrice: data.price}</Typography.Paragraph>
        <Typography.Paragraph>Color: {color}</Typography.Paragraph>
        <Typography.Paragraph>Size: {size}</Typography.Paragraph>
        <Typography.Paragraph>Qty: <InputNumber value={qty} disabled={!maxQty} max={maxQty} min={1} onChange={handleQtyChange}/></Typography.Paragraph>
        <Radio.Group
          onChange={onColorChange}
          value={color}
        >
          {colors.map(item =>
            (<Radio.Button value={item.value} style={{backgroundColor: item.hexCode}} 
            className="color-picker" />)
          )}
        </Radio.Group>
        <Radio.Group
          options={sizes}
          onChange={onSizeChange}
          value={size}
          optionType="button"
          buttonStyle="solid"
          className="size-picker"
        />
        <div className="product-action">
        <Button type="primary" size="large" onClick={onClickCart}>Add to cart <ShoppingOutlined/></Button>
        <Button type="primary" size="large" onClick={onClickWishlist}><HeartOutlined/></Button>
        </div>
        <Collapse>
            <Collapse.Panel header="Description" key="description">
            <p>{data.description}</p>
            </Collapse.Panel>
            <Collapse.Panel header="Details" key="details">
            <p>Collar: {data.collar}</p>
            <p>Vignette: {data.vignette? <span>yes</span> : <span>no</span>}</p>
            <p>Brand: {data.brand}</p>
            </Collapse.Panel>
            <Collapse.Panel header="Material" key="material">
             {data.material ? data.material.map(item =>
                    (<p>{item.name}: {item.percent}%</p>)
                 ) : null
             }
            </Collapse.Panel>
        </Collapse>
    </div>
   );
};
ProductInfo.propTypes = {
    data: PropTypes.object.isRequired
   };
   const mapStateToProps = state => ({
    data: state.product.data,
    loading: state.product.productLoading || state.customer.customerLoading,
    cart: state.customer.cart,
    wishlist: state.customer.wishlist,
    isAuthenticated: state.customer.isAuthenticated
  });
   export default connect(
    mapStateToProps,
    {addToCart, addToWishlist}
  )(ProductInfo);
   
