import React, {useState } from "react";
import { List, Row, Col, Divider, Button, Typography, Image, Rate } from 'antd';
import ReviewForm from "./ReviewForm";
import { Link } from "react-router-dom";
import { EditOutlined } from '@ant-design/icons';

const Reviews = ({reviews}) => {
     const [isEditing, setIsEditing] = useState(false);
     const [checkedReview, setCheckedReview] = useState({});
     const onCancel = () => {
       setIsEditing(false);
     }
     const onSave = () => {
      setIsEditing(false);
    }
    const editReview = (item) => {
      setIsEditing(true);
      setCheckedReview(item);
    }

    return (
        <>
        <Row gutter={16}>
            <ReviewForm visible={isEditing}
              onCancel={onCancel}
              onSave={onSave}
              data={checkedReview}
              />
        </Row>
        <Divider />
        {
          reviews ?
          ( <>        
            <Row>
                <Col span={24}>
                    <List
                    itemLayout="vertical"
                    pagination={{
                      pageSize: 3
                    }}
                    dataSource={reviews}
                    renderItem={item => (
                      <>
                      <List.Item
                        key={item._id}
                        actions={[
                          <Button icon={<EditOutlined />} onClick={e => editReview(item)} key={`edit-review-${item._id}`} >Edit</Button>,
                        ]}
                        extra={
                          <Image
                            width={200}
                            src={item.product.images[0]}
                          />
                        }
                      >
                        <List.Item.Meta
                          title= {<Link to={`/product/${item.product._id}`}>{item.product.name}</Link>}
                        />
                        {item.reviewed ? (
                          <>
                            <Rate disabled={true} value={item.rate}/>
                            <Typography.Paragraph>{item.content}</Typography.Paragraph>
                                {item.images.map(imgItem => 
                                (<Image
                                  width={50}
                                  height={50}
                                  src={imgItem}
                                />)
                                )}
                          </>
                        ): <Typography.Paragraph>You haven't reviewd this product</Typography.Paragraph>}
                      </List.Item>
                      <Divider />
                      </>
                    )}
                />
                </Col>
            </Row>
            </>
        ) : <Typography.Title level={3}>You don't have any reviews</Typography.Title>
        }
        </>
    );
}

export default Reviews;