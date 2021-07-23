import React, {useEffect, useState} from "react";
import { Form, Input, Upload, Button, Modal } from 'antd';
import {  PlusOutlined } from "@ant-design/icons";
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Editor } from 'react-draft-wysiwyg';
import '../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const BlogForm = ({data}) => {
    const newHistory = useHistory();
    const [previewVisible, setPreviewVisible] = useState(false);

    const [form] = Form.useForm();
    const [previewImage, setPreviewImage] = useState('');
    const [prImage, setPrImage] = useState([]);

    const getBase64 = (file) =>  {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
          });
    }

    const handlePreview = async file => {
        if (!file.url && !file.preview) {
          file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewVisible(true);
      };

    const handleChangePr = ({ fileList: newFileList }) => {
         if (newFileList.length === 0) {
            setPrImage([]);
         } else {
            setPrImage([newFileList[newFileList.length-1]]);
         }
    };
    const handleCancel = () => setPreviewVisible(false);
    const uploadButton = (
    <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
    </div>
    );
    
    const uploadImage = (id) => {
        let formData = new FormData();
        if (prImage.length && prImage[0].originFileObj) {
        formData.append("previewImage", prImage[0].originFileObj);
        }
        const config = {
            headers: {
              "content-type": "multipart/form-data"
            }
          };
         axios({
            method: "POST",
            url: `http://localhost:3000/api/category/upload/${id}`,
            data: formData,
            config
          }).then(res => {
            if (res.data.error) {
                console.log(res.data.message)
            } else {
                newHistory.go(0);
            }
          }).catch(err => {
            console.log(err);
          });

    }

    const onCreate = (values) => {
      const config = {
         headers: {
           "content-type": "application/json"
         }
       };
      axios({
         method: "POST",
         url: `http://localhost:3000/api/blog/create/`,
         data: values,
         config
       }).then(res => {
         uploadImage(res.data._id)
       }).catch(err => {
         console.log(err);
       });
    }
    const onUpdate = (values) => {
      const config = {
         headers: {
           "content-type": "application/json"
         }
       };
      axios({
         method: "PATCH",
         url: `/api/blog/update/${data._id}`,
         data: values,
         config
       }).then(res => {
         uploadImage(res.data._id)
       }).catch(err => {
         console.log(err);
       });
    }
    const submitCate = e => {
      e.preventDefault();
      form
          .validateFields()
          .then((values) => {
            if (data._id) {
              onUpdate(values);
            } else {
              onCreate(values);
            }
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
    }

    useEffect( () => {
        if (data && !data.isEmpty) {
            form.setFieldsValue({...data});
            if (data.prImages) {
              setPrImage([{uid: 'pr', url: data.prImage, status: 'done'}])
            }
        }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [data]);
    return (
        <Form
        form={form}
        labelAlign="left"
        >
        <Form.Item
          name="title"
          labelCol={{span:3}}
          label="Title"
          rules={[
            {
              required: true,
              message: 'Please input title',
            },
          ]}
        >
          <Input />
        </Form.Item>
          <Editor />
        <Form.Item
          labelCol={{span:3}}
          label="Preview Image"
        >
          <Upload
            listType="picture-card"
            fileList={prImage}
            onPreview={handlePreview}
            onChange={handleChangePr}
            >
            {uploadButton}
         </Upload>
        </Form.Item>
        <Form.Item>
            <Button onClick={e => submitCate(e)}>Submit</Button>
        </Form.Item>   
        <Modal
            visible={previewVisible}
            title="Upload Image"
            footer={null}
            onCancel={handleCancel}
            >
            <img alt="example" accept=".png" style={{ width: '100%' }} src={previewImage} />
        </Modal>
        </Form>
   );
};
export default BlogForm;
   
