import React, { useState, useEffect } from "react";
import { Table, Input, Skeleton , Popconfirm, Form, Typography, Button } from 'antd';
import CustomerForm from "../../../components/admin/customer/CustomerForm";
import { connect } from "react-redux";
import { updateAddress, deleteAddress, createAddress } from "../../../actions/addressAction";
import { getCustomerById } from "../../../actions/customerAction";

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

const CustomerUpdate = ({
    customer,
    getCustomerById,
    createAddress,
    updateAddress,
    deleteAddress,
    addressLoading,
    match
}) => {
  const customerId = match.params.id;
  useEffect(() => {
      getCustomerById(customerId);
   }, [match, getCustomerById, customerId]);
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');
  
  const isEditing = (record) => record._id === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      detail: '',
      commune: '',
      district: '',
      province: '',
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
      await updateAddress(id, row);
      getCustomerById(customerId);
      setEditingKey('');
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  }; 
  
  const handleDelete = async (record) => {
    await deleteAddress(record._id);
    getCustomerById(customerId);
  };

  const columns = [
    {
      title: 'Detail',
      dataIndex: 'detail',
      width: '10%',
      editable: true,
    },
    {
      title: 'Commune',
      dataIndex: 'commune',
      width: '15%',
      editable: true,
    },
    {
    title: 'District',
    dataIndex: 'district',
    width: '15%',
    editable: true,
    },
    {
    title: 'Province',
    dataIndex: 'province',
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
                  Edit
                  </Button>
                  <Popconfirm title="Sure to delete this admin?" onConfirm={() => handleDelete(record)}>
                  <Button
                    style={{
                      marginRight: 8,
                    }}
                  >
                  Delete  
                  </Button>
                </Popconfirm>
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
    <>
    <CustomerForm customerId={customerId}/>
    <Skeleton active loading={addressLoading}>
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={customer.addresses}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{
            onChange: cancel,
          }}
        />
      </Form>
    </Skeleton></>
   );
};

const mapStateToProps = state => ({
    customer: state.customer.data,
    addressLoading: state.customer.customerLoading || state.customer.addressLoading
  });
  
export default connect(
   mapStateToProps,
   { getCustomerById, createAddress, updateAddress, deleteAddress }
)(CustomerUpdate);
