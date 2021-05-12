import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Table, Input, InputNumber, Popconfirm, Form, Typography } from 'antd';
import { listProducts, deleteProduct } from "../../actions/productAction";

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
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
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

const ProductTable = ({ listProducts, deleteProduct, products }) => {
   useEffect(() => {
    listProducts();
    }, [listProducts]);

    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState('');

    const deleteItem = (e, id) => { 
        e.stopPropagation();
        e.preventDefault();
        deleteProduct(id);
    }
    const isEditing = (record) => record.key === editingKey;

    const edit = (record) => {
        form.setFieldsValue({
          name: '',
          age: '',
          address: '',
          ...record,
        });
        setEditingKey(record.key);
      };

    const cancel = () => {
    setEditingKey('');
    };

   return (
        <div>
        <table>
            <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Collar</th>
                <th>Action</th>
            </tr>
        {products.map(
            item => (
                <tr>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>{item.qty}</td>
                    <td>{item.collar}</td>
                    <td>
                        <a href={'/update-product/' + item._id}>Update</a>
                        <button onClick={e => deleteItem(e, item._id)}>Delete</button>
                    </td>
                </tr>
            )
        )
        }
        </table>
        </div>
        
   );
};

const mapStateToProps = state => ({
    products: state.product.lists
});

export default connect(
    mapStateToProps,
    { listProducts, deleteProduct })
(ProductTable);
