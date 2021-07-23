import React, { useEffect, useState } from "react";
import { Table, Select, Skeleton , Popconfirm, Form, Typography, Button } from 'antd';
import { status } from "../../../utils/constants";
import axios from 'axios';
const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{
              margin: 0,
            }}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
            ]}
          >
            <Select options={status} />
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
};

const OrderTable = ({ updateOrder, loading}) => {
  const [list, setList] = useState([]);
  const getList = () => {
    axios
    .get("/api/order/")
    .then(res => {
       let nextList = res.data.map(resItem => ({...resItem, 
        customerName: resItem.contact ? resItem.contact.name : "Guest",
        isGuest: resItem.customer ? "No" : "Yes",
        email: resItem.contact ? resItem.contact.email : "",
        shipping: resItem.shipping ? resItem.shipping.method.value : "",
        payment: resItem.payment ? resItem.payment.value : "" 
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
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');
  
  const isEditing = (record) => record._id === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      ...record,
    });
    setEditingKey(record._id);
  };
  const cancel = () => {
    setEditingKey('');
  };

  const save = async (id) => {
    try {
      const row = await form.validateFields();
      await     
      axios
      .patch(`/api/order/update/${id}`, row)
      .then(res => {
         if (res.data.error) {
             console.log(res.data.message)
         } else {
            getList();
         }
      })
      .catch(err => {
         console.log(err)
      });
      setEditingKey('');
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };
  const columns = [
    {
      title: 'Customer',
      dataIndex: 'customerName',
      editable: false,
    },
    {
      title: 'Guest checkout',
      dataIndex: 'isGuest',
      editable: false,
    },
    {
        title: 'Total',
        dataIndex: 'total',
        editable: false,
    },
    {
        title: 'Shipping',
        dataIndex: 'shipping',
        editable: false,
    },
    {
        title: 'Payment',
        dataIndex: 'payment',
        editable: false,
    },
    {
        title: 'Status',
        dataIndex: 'status',
        editable: true,
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Button
              onClick={() => save(record._id)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Button>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              Cancel
            </Popconfirm>
          </span>
        ) : (
            <span>
                <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                  <Button
                    style={{
                      marginRight: 8,
                    }}
                  >
                  Edit Inline
                  </Button>
                </Typography.Link>
            </span>
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
   return (
    <Skeleton active loading={loading || !list}>
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={list}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{
            onChange: cancel,
          }}
        />
      </Form>
    </Skeleton> 
   );
};

export default OrderTable;
