import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { List, Card, Row, Col, Divider, Button, Typography } from 'antd';
import { EditOutlined, PlusOutlined , CheckOutlined, DeleteOutlined } from '@ant-design/icons';
import Address from "./Address";

const data = [
  {
    title: 'Title 1',
  },
  {
    title: 'Title 2',
  },
  {
    title: 'Title 3',
  },
  {
    title: 'Title 4',
  },
  {
    title: 'Title 5',
  },
  {
    title: 'Title 6',
  },
];

const Addresses = ({}) => {
    return (
        <>
        <Row gutter={16}>
            <Col span={6}>
              <Button type="primary" icon={<PlusOutlined />}  key="new-address" >New Address</Button>
            </Col>
        </Row>
        <Divider />
        <Row gutter={16}>
            <Col span={12}>
                <Card title="Default address" className="d" extra={[<Button icon={<EditOutlined />}  key="edit-address" >Edit</Button>]}>
                Card content
                </Card>
            </Col>
        </Row>
        <Divider />
        <Row>
            <Typography.Title level={3}>More addresses</Typography.Title>
            <Col span={24}>
                <List
                grid={{
                gutter: 16,
                column: 2
                }}
                dataSource={data}
                renderItem={item => (
                <List.Item>
                    <Card title={item.title} actions={
                      [
                        <Button icon={<CheckOutlined />} type="primary" key={`set-default-address-${item.index}`}>Set as default</Button>,
                        <Button icon={<EditOutlined />} key={`edit-address-${item.index}`} >Edit</Button>,
                        <Button icon={<DeleteOutlined />} type="danger" key={`delete-address-${item.index}`}>Remove</Button>,
                      ]
                    }>
                    Card content
                    </Card>
                </List.Item>
                )}
            />
            </Col>
        </Row>
        </>
    );
}
export default connect(null, {})(Addresses);