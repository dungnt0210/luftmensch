import React, { useEffect, useState } from "react";
import { Table, Skeleton } from 'antd';
import axios from 'axios';

const ReviewTable = () => {
  const [list, setList] = useState([]);
  const getList = () => {
    axios
    .get("/api/review/")
    .then(res => {
       let nextList = res.data.map(resItem => ({...resItem, 
        customerName: resItem.customer ? resItem.customer.name : "",
        productName: resItem.product ? resItem.product.name : "",
        reviewed: resItem.reviewed ? "Yes" : "No"
    }))
       setList(nextList);
    })
    .catch(err => {
       console.log(err)
    });
  }
   useEffect(() => {
        getList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  
  const columns = [
    {
      title: 'Customer',
      dataIndex: 'customerName',
    },
    {
      title: 'Product',
      dataIndex: 'productName',
    },
    {
        title: 'Rate',
        dataIndex: 'rate',
    },
    {
        title: 'Is reviewed?',
        dataIndex: 'reviewed',
    },
    {
        title: 'Content',
        dataIndex: 'content',
    }
  ];

   return (
    <Skeleton active loading={!list}>
        <Table
          bordered
          dataSource={list}
          columns={columns}
          rowClassName="editable-row"
        />
    </Skeleton> 
   );
};

export default ReviewTable;
