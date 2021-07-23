import React, { useEffect, useState } from "react";
import { Form, Input, Modal, Rate, Upload} from 'antd';
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";

const ReviewForm = ({
    data,
    visible,
    onCancel,
    onSave
  }) => {
    const [previewVisible, setPreviewVisible] = useState(false);
    const [form] = Form.useForm();
    const [removeFiles, setRemoveFiles] = useState([]);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState([]);
      useEffect( () => {
        if(data.images) {
          setFileList(data.images.map((item, index) => ({url: item, uid: index, status:'done'})))
        }
        if(data.content) {
          form.setFieldsValue({content: data.content});
        }
        if(data.rate) {
          form.setFieldsValue({rate: data.rate});
        }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [data])
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

      const handleChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
      };      
      const handleCancel = () => setPreviewVisible(false);
      const uploadButton = (
        <div>
          <PlusOutlined />
          <div style={{ marginTop: 8 }}>Upload</div>
        </div>
      );
    const [rate, setRate] = useState(5);
    const onRemove = file => {
        setRemoveFiles([...removeFiles, file.url]);
    }
    
    const onCreate = (values) => {
      let formData = new FormData();
      formData.append("content", values.content);
      formData.append("rate", rate);
      formData.append("removeLs", removeFiles);
      if (removeFiles) {
        removeFiles.forEach(fileIndex => {
          formData.append("removeLs", fileIndex);
        })
      }
      if (fileList) {
        fileList.forEach(img => {
          if (img.originFileObj) formData.append("image", img.originFileObj);
        })
      }

      const config = {
         headers: {
           "content-type": "multipart/form-data"
         }
       };
      axios({
         method: "POST",
         url: `http://localhost:3000/api/review/update/${data._id}`,
         data: formData,
         config
       }).then(res => {
         console.log(res);
         onSave();
       }).catch(err => {
         console.log(err);
       });
    }
  
    return (
      <Modal
      visible={visible}
      title="Submit your review"
      okText="Save"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
        <Form
         form={form}
        layout="vertical"
        >
        <Form.Item>
            <Rate value={rate} onChange={setRate}/>
        </Form.Item>
        <Form.Item
          name="content"
          rules={[
            {
              required: true,
              message: 'Please input your comment',
            },
          ]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item >
            <Upload
            name="images"
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
            onRemove={onRemove}
            >
            {fileList.length >= 4 ? null : uploadButton}
            </Upload>
            <Modal
            visible={previewVisible}
            title="Upload Image"
            footer={null}
            onCancel={handleCancel}
            >
            <img alt="example" accept=".png" style={{ width: '100%' }} src={previewImage} />
            </Modal>
        </Form.Item>
      </Form>
    </Modal>
    );
 };
 
 export default ReviewForm;