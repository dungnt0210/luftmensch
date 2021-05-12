import React, {useEffect, useState} from "react";
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { Radio , Button, Typography, Collapse } from 'antd';
import {
    HeartOutlined,
    ShoppingOutlined
  } from '@ant-design/icons';

const ProductInfo = ({data, loading}) => {
    const [size, setSize] = useState('XS');
    const onSizeChange = e => {
        setSize(e.target.value);
    }

    const [sizes, setSizes] = useState([
        {label: 'XS', value: 'XS', disabled: false},
        {label: 'S', value: 'S', disabled: false},
        {label: 'M', value: 'M', disabled: false},
        {label: 'L', value: 'L', disabled: false},
        {label: 'XL', value: 'XL', disabled: false},
        {label: 'XXL', value: 'XXL', disabled: false}
    ]);
  
   return (
    <div className="product-info">
        <Typography.Title level={4}>{data.name}</Typography.Title>
        <Typography.Paragraph>${data.finalPrice ? data.finalPrice: data.price}</Typography.Paragraph>
        <Typography.Paragraph>Size: {size}</Typography.Paragraph>
        <Radio.Group
          options={sizes}
          onChange={onSizeChange}
          value={size}
          optionType="button"
          buttonStyle="solid"
        />
        <div className="product-action">
        <Button type="primary" size="large">Add to cart <ShoppingOutlined/></Button>
        <Button type="primary" size="large"><HeartOutlined/></Button>
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
    data: state.product.data
  });
   export default connect(
    mapStateToProps,
    {}
  )(ProductInfo);
   
