import React, {useEffect, useState} from "react";
import { connect } from 'react-redux';
import { Form, Input, Upload, Button, Select, Switch, Modal } from 'antd';
import {  PlusOutlined } from "@ant-design/icons";
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { getCategories } from './../../../actions/categoryAction';  

const CateForm = ({data, cateList, getCategories}) => {
    const newHistory = useHistory();
    const [previewVisible, setPreviewVisible] = useState(false);

    const [form] = Form.useForm();
    const [previewImage, setPreviewImage] = useState('');
    const [bannerImage, setBannerImage] = useState([]);
    const [cateOptions, setCateOptions] = useState([]);
    const [mainCate, setMainCate] = useState(false);

    useEffect( () => {
      getCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    useEffect( () => {
        if (cateList) {          
          let nxCateOptions = cateList.map(fCate => ({value: fCate._id, label: fCate.name}))
          setCateOptions(nxCateOptions);
        }
    }, [cateList])
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

    const handleChangeBanner = ({ fileList: newFileList }) => {
         if (newFileList.length === 0) {
            setBannerImage([]);
         } else {
            setBannerImage([newFileList[newFileList.length-1]]);
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
        if (bannerImage.length && bannerImage[0].originFileObj) {
        formData.append("bannerImage", bannerImage[0].originFileObj);
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
         url: `http://localhost:3000/api/category/create/`,
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
         url: `/api/category/update/${data._id}`,
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
            values.parentCate = mainCate ? "" : values.parentCate;
            let lsValues = {...values, mainCate: mainCate}
            if (data._id) {
              onUpdate(lsValues);
            } else {
              onCreate(lsValues);
            }
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
    }

    useEffect( () => {
        if (data && !data.isEmpty) {
            form.setFieldsValue({...data});
            setMainCate(data.mainCate);
            if (data.bannerImage) {
              setBannerImage([{uid: 'banner', url: data.bannerImage, status: 'done'}])
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
          name="name"
          labelCol={{span:3}}
          label="Category name"
          rules={[
            {
              required: true,
              message: 'Please input cate name',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Is main cate"
          labelCol={{span:3}}
        >
          <Switch checked={mainCate} onChange={e => setMainCate(!mainCate)}/>
        </Form.Item>
        <Form.Item 
        name="parentCate" label="Parent" hidden={mainCate}
        labelCol={{span:3}}
        >
        <Select
            style={{ width: '50%' }}
            options={cateOptions}
        />
        </Form.Item>
        <Form.Item
            name="description"
            labelCol={{span:3}}
            label="Description"
            rules={[
            {
                required: true,
                message: 'Please input description',
            },
            ]}
        >
            <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item
          labelCol={{span:3}}
          label="Banner Image"
        >
          <Upload
            listType="picture-card"
            fileList={bannerImage}
            onPreview={handlePreview}
            onChange={handleChangeBanner}
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
const mapStateToProps = state => ({
  cateList: state.category.list,
});
export default connect(
  mapStateToProps,
  {getCategories}
)(CateForm);
   
