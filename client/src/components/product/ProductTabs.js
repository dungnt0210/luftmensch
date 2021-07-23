import React, {useEffect, useState} from "react";
import { connect } from 'react-redux';
import { Tabs, Rate, List, Typography, Image, Form, Input, Upload, Modal, Button, Divider } from 'antd';
import { PlusOutlined } from "@ant-design/icons";
import axios from 'axios';
import './tabs.scss';
const { TabPane } = Tabs;

const ProductTabs = ({data, customerId, isAuthenticated}) => {
    const [apiReviews, setApiReviews] = useState([]);
    const [aveRate, setAveRate] = useState(0);
    const [myReview, setMyReview] = useState({isEmpty: true});
    useEffect(() => {
      let totalT = 0;
      for(let i = 0; i < apiReviews.length; i++) {
        totalT += parseInt(apiReviews[i].rate);
      }
      console.log(totalT);
      console.log(apiReviews.length);
      if (apiReviews.length)
        setAveRate(totalT / apiReviews.length);
    }, [apiReviews])
    useEffect(() => {
        const config = {
            headers: {
              "content-type": "application/json"
            }
          };
        if (data._id) {
          axios({
            method: "GET",
            url: `http://localhost:3000/api/review/product/${data._id}`,
            config
          }).then(res => {
            let nextApiReviewed = res.data.filter(resItem => resItem.reviewed);
            setApiReviews(nextApiReviewed);
            if (customerId) {
              let myReviewIndex = res.data.findIndex(resMItem => resMItem.customer._id === customerId);
              if (myReviewIndex !== -1) setMyReview(res.data[myReviewIndex]);
            }
          }).catch(err => {
            console.log(err);
          });
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, customerId]);
    const [previewVisible, setPreviewVisible] = useState(false);
    const [form] = Form.useForm();
    const [removeFiles, setRemoveFiles] = useState([]);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState([]);
      useEffect( () => {
        if (!myReview.isEmpty) {
          if(myReview.images) {
            setFileList(myReview.images.map((item, index) => ({url: item, uid: index, status:'done'})))
          }
          if(myReview.content) {
            form.setFieldsValue({content: myReview.content});
          }
          if(myReview.rate) {
            form.setFieldsValue({rate: myReview.rate});
          }
        }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [myReview])
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
      // console.log(aveRate);
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
         url: `http://localhost:3000/api/review/update/${myReview._id}`,
         data: formData,
         config
       }).then(res => {
         console.log(res);
       }).catch(err => {
         console.log(err);
       });
    }
    const submitReview = e => {
      e.preventDefault();
      form
          .validateFields()
          .then((values) => {
            onCreate(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
    }
   return (
    <div className="card-tabs-container">
    <Tabs type="card">
      <TabPane tab="Description" key="1">
          {data.description}
      </TabPane>
      <TabPane tab={`Reviews(${apiReviews.length})`} key="2">
        {apiReviews.length ? (
          <>
          <Rate value={aveRate} disabled={true} allowHalf/>
          <Divider />
          <List
          itemLayout="vertical"
          size="large"
          dataSource={apiReviews}
          renderItem={item => (
            <List.Item
                key={item._id}
                actions={[
                <Rate value={item.rate} disabled={true} />,
                ]}
                extra={
                <img
                    width={200}
                    alt="logo"
                    src={item.images[0]}
                />
                }
            >
                <List.Item.Meta
                    title={item.customer.name}
                />
                <>
                  <Typography.Paragraph>{item.content}</Typography.Paragraph>
                      {item.images.map(imgItem => 
                      (<Image
                        width={50}
                        height={50}
                        src={imgItem}
                      />)
                      )}
                  </>
            </List.Item>
            )}
            />
            </>
        ): <Typography.Paragraph>This product has no review</Typography.Paragraph>}

      </TabPane>
      <TabPane tab="Your Review" key="3">
        {!myReview.isEmpty ? 
          (        
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
                <Form.Item>
                    <Button onClick={e => submitReview(e)}>Submit</Button>
                </Form.Item>
              </Form>)
        : <Typography.Paragraph>You haven't purchase this product</Typography.Paragraph>
        }
      </TabPane>
    </Tabs>
    </div>
   );
};
const mapStateToProps = state => ({
    data: state.product.data,
    loading: state.product.productLoading || state.customer.customerLoading,
    isAuthenticated: state.customer.isAuthenticated,
    customerId: state.customer.logData._id || state.customer.logData.customerId
  });
export default connect(
    mapStateToProps,
    {}
)(ProductTabs);
   
