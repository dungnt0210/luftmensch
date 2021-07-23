import React, {useEffect, useState} from "react";
import { Row, Col, Typography } from "antd";
import { connect } from "react-redux";
import axios from 'axios';
import ProductList from "../components/product/ProductList";
import { Link } from "react-router-dom";
const Maincate = ({isAuthenticated, match}) => {
    const [doc, setDoc] = useState({name: "", _id: "", listing: []});
    const getDoc = (id) => {
        axios
        .get(`/api/product/main-cate/${id}`)
        .then(res => {
            setDoc(res.data);
        })
        .catch(err => {
           console.log(err)
        });
      }
    useEffect( () => {
        getDoc(match.params.id);
    }, [match.params.id])
   return (
       <>
        <Row gutter={[24,24]}>
            <Col span={24} style={{ textAlign: "center", paddingTop: "20px"}}>
                <Typography.Title level={1}>{doc.name}</Typography.Title>
            </Col>
            <Col span={24}  style={{ textAlign: "center", padding: "0"}}>
                <img style={{ width: "100vw"}} src="https://picsum.photos/1800/500" alt="cate-banner"/>
            </Col>
            {doc && doc.listing ? doc.listing.map(item => 
                {
                    if(item.list.length) {
                        return <>
                    <Col span={24} style={{ textAlign: "center"}}>
                        <Typography.Title level={1}><Link to={`/category/${item.cate._id}`}>{item.cate.name}</Link></Typography.Title>
                    </Col>
                    <Col span={24}>
                        <ProductList listing={item.list} isAuthenticated={isAuthenticated} column={5}/>
                    </Col>
                    </>
                    }  
                    else return (<></>)}
            ): null}
        </Row>
    </>
   );
};

const mapStateToProps = state => ({
    isAuthenticated: state.customer.isAuthenticated
  });
  
export default connect(
mapStateToProps,
{}
)(Maincate);