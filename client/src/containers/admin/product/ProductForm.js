import React, {useEffect, useState} from "react";
import { connect } from 'react-redux';
import { Form, Input, Upload, Button, Select, Switch, Modal, InputNumber, Tag, Space, Divider } from 'antd';
import {  PlusOutlined } from "@ant-design/icons";
import { colors as colorOptions, sizes as sizeOptions } from "../../../utils/constants";
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { getCategories } from './../../../actions/categoryAction';

const tagRender = (props) => {
    const { label, value, closable, onClose } = props;
    const onPreventMouseDown = event => {
      event.preventDefault();
      event.stopPropagation();
    };
    return (
      <Tag
        color={value}
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{ marginRight: 3 }}
      >
        {label}
      </Tag>
    );
  }
  

const ProductForm = ({data, cateList, getCategories}) => {
    const newHistory = useHistory();
    const [previewVisible, setPreviewVisible] = useState(false);
    const [active, setActive] = useState(true);
    const [promo, setPromo] = useState(true);
    const [vignette, setVignette] = useState(true);
    const [pickColors, setPickColors] = useState([]);

    const [form] = Form.useForm();
    const [previewImage, setPreviewImage] = useState('');
    const [imgFront, setImgFront] = useState([]);
    const [imgBehind, setImgBehind] = useState([]);
    const [imgLeft, setImgLeft] = useState([]);
    const [imgRight, setImgRight] = useState([]);
    const [cateOptions, setCateOptions] = useState([]);
    useEffect( () => {
      getCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    useEffect( () => {
        if (cateList) {
          let childCates = [];
          cateList.forEach(cateItem => childCates = childCates.concat(cateItem.childCate));
          let nxCateOptions = childCates.map(fCate => ({value: fCate._id, label: fCate.name}))
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

    const handleChangeFront = ({ fileList: newFileList }) => {
         if (newFileList.length === 0) {
            setImgFront([]);
         } else {
            setImgFront([newFileList[newFileList.length-1]]);
         }
    };
    const handleChangeBehind = ({ fileList: newFileList }) => {
        if (newFileList.length === 0) {
            setImgBehind([]);
         } else {
            setImgBehind([newFileList[newFileList.length-1]]);
        }
    };
    const handleChangeLeft = ({ fileList: newFileList }) => {
        if (newFileList.length === 0) {
            setImgLeft([]);
         } else {
            setImgLeft([newFileList[newFileList.length-1]]);
         }
    };
    const handleChangeRight = ({ fileList: newFileList }) => {
        if (newFileList.length === 0) {
            setImgRight([]);
         } else {
            setImgRight([newFileList[newFileList.length-1]]);
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
        if (imgFront.length && imgFront[0].originFileObj) {
        formData.append("img-front", imgFront[0].originFileObj);
        }
        if (imgBehind.length && imgBehind[0].originFileObj) {
        formData.append("img-behind", imgBehind[0].originFileObj);
        }
        if (imgLeft.length && imgLeft[0].originFileObj) {
        formData.append("img-left", imgLeft[0].originFileObj);
        }
        if (imgRight.length && imgRight[0].originFileObj) {
        formData.append("img-right", imgRight[0].originFileObj);
        }
        const config = {
            headers: {
              "content-type": "multipart/form-data"
            }
          };
         axios({
            method: "POST",
            url: `http://localhost:3000/api/product/upload/${id}`,
            data: formData,
            config
          }).then(res => {
            if (res.data.error) {
                console.log(res.data.message)
            } else {
                newHistory.push(`/admin/product/update/${id}`);
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
         url: `http://localhost:3000/api/product/create/`,
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
         url: `/api/product/update/${data._id}`,
         data: values,
         config
       }).then(res => {
         uploadImage(res.data._id)
       }).catch(err => {
         console.log(err);
       });
    }
    const submitProduct = e => {
      e.preventDefault();
      form
          .validateFields()
          .then((values) => {
            let lsValues = {...values, active: active, promo: promo, vignette: vignette};
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
    const hanldePickColors = (valuePk) => {
        let szNxOptions = sizeOptions.map(szItem => ({size: szItem.value, count: 0}));
        let orOptions = !data.isEmpty ? data.options.map(orItem => orItem.color.hexCode) : [];
        let nxOptions = valuePk.map(clItem => {
            let nxClItem = { color: {hexCode: clItem.value, name: clItem.label, 
                sizes: szNxOptions}};
            return nxClItem;
        });
        if (data) {
          nxOptions = nxOptions.map(item => {
            if (orOptions.includes(item.color.hexCode)) {
              let newItem = data.options.find(orOption => orOption.color.hexCode === item.color.hexCode);
              return newItem;
            }
            else {
              return item;
            }
          });
        }
        setPickColors(valuePk);
        form.setFieldsValue({options: nxOptions})
    };
    useEffect( () => {
        if (data && !data.isEmpty) {
            let nxPkColors =data.options ? data.options.map(optItem => ({value: optItem.color.hexCode, label: optItem.color.name})) : [];
            setPickColors(nxPkColors);
            form.setFieldsValue({pickColors: nxPkColors});
            form.setFieldsValue({...data});
            if (data.images) {
              setImgFront([{uid: 'img-front', url: data.images[0], status: 'done'}])
              setImgBehind([{uid: 'img-front', url: data.images[1], status: 'done'}])
              setImgLeft([{uid: 'img-front', url: data.images[2], status: 'done'}])
              setImgRight([{uid: 'img-front', url: data.images[3], status: 'done'}])
            }
            setActive(data.active);
            setPromo(data.promo);
            setVignette(data.vignette);
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
          label="Product name"
          rules={[
            {
              required: true,
              message: 'Please input product name',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="price"
          labelCol={{span:3}}
          label="Price"
          rules={[
            {
              required: true,
              message: 'Please input price',
            },
          ]}
        >
          <InputNumber min={0}/>
        </Form.Item>
        <Form.Item 
        name="category" label="Category" 
        labelCol={{span:3}}
        >
        <Select
            style={{ width: '50%' }}
            options={cateOptions}
        />
        </Form.Item>
        <Form.Item
          label="Active"
          labelCol={{span:3}}
        >
          <Switch checked={active} onChange={e => setActive(!active)}/>
        </Form.Item>
        <Form.Item
          label="Promo"
          labelCol={{span:3}}
        >
          <Switch checked={promo} onChange={e => setPromo(!promo)}/>
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
        name="pickColors" label="Colors" 
        labelCol={{span:3}}
        >
        <Select
            mode="multiple"
            showArrow
            tagRender={tagRender}
            labelInValue={true}
            style={{ width: '50%' }}
            onChange={value => hanldePickColors(value)}
            options={colorOptions}
        />
        </Form.Item>
        <Divider/>
        <Form.List name="options">
        {fields => (
          <>
            {fields.map((field,index) => (
              <Space key={field.key}>
                <Form.Item style={{width: 50 }} label={pickColors[index]? pickColors[index].label :""}/>
                <Form.Item
                  {...field}
                  name={[field.name, 'color', 'hexCode']}
                  fieldKey={[field.fieldKey, 'color', 'hexCode']}
                  hidden={true}
                  initialValue={pickColors[index] ? pickColors[index].value: ""}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  {...field}
                  name={[field.name, 'color', 'name']}
                  fieldKey={[field.fieldKey, 'color', 'name']}
                  hidden={true}
                  initialValue={pickColors[index]? pickColors[index].label :""}
                >
                  <Input />
                </Form.Item>
                <Form.List name={[field.name, 'color', 'sizes']} layout="horizontal">
                    {fieldSizes => (
                    <>
                        {fieldSizes.map((fieldSize, szIndex) => (
                        <Space key={fieldSize.key} align="baseline">
                            <Form.Item
                            {...fieldSize}
                            name={[fieldSize.name, 'size']}
                            hidden={true}
                            fieldKey={[fieldSize.fieldKey, 'size']}
                            initialValue={sizeOptions[szIndex].value}
                            >
                            <Input />
                            </Form.Item>
                            <Form.Item
                            {...fieldSize}
                            label={sizeOptions[szIndex].value}
                            name={[fieldSize.name, 'count']}
                            fieldKey={[fieldSize.fieldKey, 'count']}
                            initialValue={0}
                            >
                            <InputNumber min={0} />
                            </Form.Item>
                        </Space>
                        ))}
                    </>
                    )}
                    </Form.List>
              </Space>
            ))}
          </>
        )}
        </Form.List>
        <Divider/>
        <Form.Item
          labelCol={{span:3}}
          label="Image front"
        >
          <Upload
            listType="picture-card"
            fileList={imgFront}
            onPreview={handlePreview}
            onChange={handleChangeFront}
            >
            {uploadButton}
         </Upload>
        </Form.Item>
        <Form.Item
          labelCol={{span:3}}
          label="Image behind"
        >
          <Upload
            listType="picture-card"
            fileList={imgBehind}
            onPreview={handlePreview}
            onChange={handleChangeBehind}
            >
            {uploadButton}
         </Upload>
        </Form.Item>
        <Form.Item
          labelCol={{span:3}}
          label="Image left"
        >
          <Upload
            listType="picture-card"
            fileList={imgLeft}
            onPreview={handlePreview}
            onChange={handleChangeLeft}
            >
            {uploadButton}
         </Upload>
        </Form.Item>
        <Form.Item
          labelCol={{span:3}}
          label="Image right"
        >
          <Upload
            listType="picture-card"
            fileList={imgRight}
            onPreview={handlePreview}
            onChange={handleChangeRight}
            >
            {uploadButton}
         </Upload>
        </Form.Item>
        <Form.Item
          name="collar"
          label="Collar type"
          labelCol={{span:3}}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Vignette"
          labelCol={{span:3}}
        >
          <Switch checked={vignette} 
          onChange={e => {
              setVignette(!vignette)
              }}/>
        </Form.Item>
        <Form.Item
          name="style"
          label="Style"
          labelCol={{span:3}}
        >
          <Input />
        </Form.Item>
        <Form.Item>
            <Button onClick={e => submitProduct(e)}>Submit</Button>
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
)(ProductForm);
   
