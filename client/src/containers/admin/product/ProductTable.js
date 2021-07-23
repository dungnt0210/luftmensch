import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { updateProduct, listProducts } from "../../../actions/productAction";
import { Table, Input, Skeleton, Popconfirm, Form, Typography, Button, Divider } from 'antd';
import { Link, useHistory } from "react-router-dom";
import { PlusOutlined } from '@ant-design/icons';

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

const ProductTable = ({ listProducts, updateProduct, list, loading}) => {
  const newHistory = useHistory();
   useEffect(() => {
    listProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  const formatColors = (listColors) => {
    return "test";
      // return listColors.map(itemCl => itemCl.color.name).join();
  }
  const [form] = Form.useForm();
  const [lsProducts, setLsProducts] = useState([]);
  useEffect(() => {
    if(!loading && list) {
      let nxProducts = list.map(productItem => ({...productItem, cateItem: productItem.category ? productItem.category.name : "", colorLs: formatColors(productItem.options)}))
      setLsProducts(nxProducts)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [list]);
  const [editingKey, setEditingKey] = useState('');
  
  useEffect(() => {
    listProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
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
      await updateProduct(id, row);
      listProducts();
      setEditingKey('');
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      editable: true,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      editable: true,
    },
    {
        title: 'Qty',
        dataIndex: 'qty',
        editable: false,
    },
    {
        title: 'Category',
        dataIndex: 'cateItem',
        editable: false,
    },
    {
        title: 'Color',
        dataIndex: 'colorLs',
        editable: false,
    },
    {
        title: 'Collar',
        dataIndex: 'collar',
        editable: true,
    },
    {
        title: 'Style',
        dataIndex: 'style',
        editable: true,
    },
    {
        title: 'Updated At',
        dataIndex: 'updatedAt',
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
                  Edit Inline
                  </Button>
                </Typography.Link>
                 <Typography.Link disabled={editingKey !== ''}>      
                  <Link to={`/admin/product/update/${record._id}`}>Update</Link>
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
    <Skeleton active loading={loading || !lsProducts}>
      <Form form={form} component={false}>
        <Button icon ={<PlusOutlined/>} type="primary" onClick={e => newHistory.push("/admin/product/create")}>Create new product</Button>
        <Divider />
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={lsProducts}
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
    list: state.product.list,
    loading: state.product.loading,
    isAuthenticated: state.adminer.isAuthenticated
});

export default connect(
    mapStateToProps,
    { updateProduct, listProducts })
(ProductTable);
