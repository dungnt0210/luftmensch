import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { listCustomers, updateCustomer } from "../../../actions/customerAction";
import { Table, Input, Skeleton , Popconfirm, Form, Typography, Button } from 'antd';
import { Link } from "react-router-dom";
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
    const inputNode = <Input />;
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
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
};

const CustomerTable = ({ listCustomers, updateCustomer, list, loading}) => {
   useEffect(() => {
    listCustomers();
    }, [listCustomers]);
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');
  
  const isEditing = (record) => record._id === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      name: '',
      email: '',
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
      await updateCustomer(id, row);
      listCustomers();
      setEditingKey('');
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };
  const columns = [
    {
      title: 'Full name',
      dataIndex: 'name',
      width: '10%',
      editable: true,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      width: '15%',
      editable: true,
    },
    {
        title: 'Created At',
        dataIndex: 'createdAt',
        width: '15%',
        editable: false,
    },
    {
        title: 'Updated At',
        dataIndex: 'updatedAt',
        width: '15%',
        editable: false,
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
              <a>Cancel</a>
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
                 <Typography.Link disabled={editingKey !== ''}>      
                  <Link to={`/admin/dashboard/customer/update/${record._id}`}>Update</Link>
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
    <Skeleton active loading={loading}>
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

const mapStateToProps = state => ({
    list: state.customer.list,
    loading: state.customer.customerLoading || state.adminer.customersLoading,
    isAuthenticated: state.adminer.isAuthenticated
});

export default connect(
    mapStateToProps,
    { listCustomers, updateCustomer })
(CustomerTable);
