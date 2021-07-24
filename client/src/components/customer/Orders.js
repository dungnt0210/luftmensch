import React, {useEffect, useState} from "react";
import { Table, Typography } from 'antd';
import { Link } from "react-router-dom";
import { EyeOutlined } from '@ant-design/icons';
const { Column } = Table;

const Orders = ({orders}) => {
    const [lsOrders, setLsOrders] = useState([]);
    const formatContact = contact => {
        return contact.detail+ ", "+contact.commune.label+ ", "+ contact.district.label+ ", "+contact.province.label;
    }
    useEffect (() => {
        if(orders) 
            setLsOrders(orders?.map(item => 
                ({orderId: item._id, address: item && item.contact ? formatContact(item.contact) : "", 
                    total:item.total, createdAt: item.createdAt, status: item.status})
            ))
    }, [orders]);
    return (
        <>
        {
            orders ?
            <Table dataSource={lsOrders}>
                <Column title="ID" dataIndex="orderId" key=" orderId" />
                <Column title="Address" dataIndex="address" key="address" />
                <Column title="Status" dataIndex="status" key="status" />
                <Column title="Total" dataIndex="total" key="total" />
                <Column title="Order At" dataIndex="createdAt" key="createdAt" />
                <Column
                title="Action"
                key="action"
                fixed="right"
                render={(_, record) => (
                    <Link to={`/customer/orders/${record._id}`}>View <EyeOutlined/></Link>
                )}
                />
            </Table>
         : <Typography.Title level={3}>You don't have any orders</Typography.Title>
        }
        </>
    );
}

export default Orders;