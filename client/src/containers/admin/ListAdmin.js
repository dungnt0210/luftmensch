import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { listAdmin, deleteAdmin, updateAdmin } from "../../actions/adminAction";
import { Table, Input, Skeleton , Popconfirm, Form, Typography, Button } from 'antd';

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

const ListAdmin = ({ listAdmin, deleteAdmin, updateAdmin, list, loading, isAuthenticated}) => {
   useEffect(() => {
     console.log(isAuthenticated);
    listAdmin();
    }, [listAdmin]);
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

  const handleDelete = async (record) => {
    await deleteAdmin(record._id);
    listAdmin();
  };

  const save = async (id) => {
    try {
      const row = await form.validateFields();
      await updateAdmin(id, row);
      listAdmin();
      setEditingKey('');
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };
  const columns = [
    {
      title: 'Username',
      dataIndex: 'username',
      width: '10%',
      editable: false,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      width: '15%',
      editable: true,
    },
    {
      title: 'Full name',
      dataIndex: 'fullname',
      width: '20%',
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
                  Edit
                  </Button>
                </Typography.Link>
                <Popconfirm title="Sure to delete this admin?" onConfirm={() => handleDelete(record)}>
                  <Button
                    style={{
                      marginRight: 8,
                    }}
                  >
                  Delete  
                  </Button>
                </Popconfirm>
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
    list: state.adminer.list,
    loading: state.adminer.adminLoading || state.adminer.adminsLoading,
    isAuthenticated: state.adminer.isAuthenticated
});

export default connect(
    mapStateToProps,
    { listAdmin, updateAdmin, deleteAdmin })
(ListAdmin);
