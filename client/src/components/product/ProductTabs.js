import React, { useEffect, useState, List } from "react";
import { connect } from 'react-redux';
import { Tabs, Rate } from 'antd';
import './tabs.scss';
const { TabPane } = Tabs;
const data = [
    {
        rate: 1,
        name: "Customer ",
        content: "Review content "
    },
    {
        rate: 2,
        name: "Customer ",
        content: "Review content "
    },
    {
        rate: 3,
        name: "Customer ",
        content: "Review content "
    },
    {
        rate: 4,
        name: "Customer ",
        content: "Review content "
    },
    {
        rate: 5,
        name: "Customer ",
        content: "Review content "
    }
  ]
const ProductTabs = ({data}) => {

   return (
    <div className="card-tabs-container">
        <Tabs type="card">
      <TabPane tab="Tab Title 1" key="1">
        <p>Content of Tab Pane 1</p>
        <p>Content of Tab Pane 1</p>
        <p>Content of Tab Pane 1</p>
      </TabPane>
      <TabPane tab="Tab Title 2" key="2">
      <List
        itemLayout="vertical"
        size="large"
        dataSource={data}
        renderItem={item => (
        <List.Item
            key={item.name}
            actions={[
            <Rate value={item.rate}/>,
            ]}
            extra={
            <img
                width={272}
                alt="logo"
                src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
            />
            }
        >
            <List.Item.Meta
                title={item.name}
                description={item.content}
            />
            {item.content}
        </List.Item>
        )}
        />
      </TabPane>
      <TabPane tab="Tab Title 3" key="3">
        <p>Content of Tab Pane 3</p>
        <p>Content of Tab Pane 3</p>
        <p>Content of Tab Pane 3</p>
      </TabPane>
    </Tabs>
    </div>
   );
};

const mapStateToProps = state => ({
    data: state.product.data
});
  
export default connect(
    mapStateToProps,
    {}
)(ProductTabs);
   
