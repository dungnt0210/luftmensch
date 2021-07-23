import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { updateCategory } from "../../../actions/categoryAction";
import { Table, Input, Skeleton , Popconfirm, Form, Typography, Button } from 'antd';
import { Link,useHistory } from "react-router-dom";
import { PlusOutlined } from '@ant-design/icons';
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

const CateTable = ({ updateCategory, loading}) => {
    const newHistory = useHistory();
  const [list, setList] = useState([]);
  const getList = () => {
    axios
    .get("/api/category/all")
    .then(res => {
       let nextList = res.data.map(resItem => ({...resItem, 
        parentName: resItem.parentCate ? resItem.parentCate.name : "",
        isMain: resItem.mainCate ? "Yes" : "No"
    }))
       console.log(nextList);
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
      await updateCategory(id, row);
      getList();
      setEditingKey('');
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };
  const columns = [
    {
      title: 'Category name',
      dataIndex: 'name',
      editable: true,
    },
    {
      title: 'Parent',
      dataIndex: 'parentName',
      editable: false,
    },
    {
        title: 'Description',
        dataIndex: 'description',
        editable: true,
    },
    {
        title: 'Is main cate?',
        dataIndex: 'isMain',
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
                  <Link to={`/admin/category/update/${record._id}`}>Update</Link>
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
      <Button icon ={<PlusOutlined/>} type="primary" onClick={e => newHistory.push("/admin/category/create")}>Create new category</Button>
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
    loading: state.category.loading,
});

export default connect(
    mapStateToProps,
    { updateCategory })
(CateTable);
