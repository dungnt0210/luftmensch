import React , {useEffect, useState} from "react";
import  { Link, useHistory } from 'react-router-dom';
import { List, Input, Typography, Row, Image, Divider, Col } from 'antd';
import axios from "axios";
const Search = () => {
    const [query , setQuery] = useState('');
    const [list, setList ] = useState([]);
    const history = useHistory();
    const getList = () => {
        if (query) {
            axios
            .get(`/api/product/search?q=${query}&limit=4`)
            .then(res => {
                setList(res.data);
            })
            .catch(err => {
               console.log(err)
            });
        } else {
            setList([]);
        }
      }
    useEffect( () => {
        getList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query]);
    const onSearch = (value, event) => {
        history.push(`/search?q=${value}`)
    }
   return (
       <div>
            <Row justify="center">
                <Col span={18}>
                <Input.Search placeholder="search your product" value={query} onChange={e => setQuery(e.target.value)} size="large" onSearch={onSearch}/>
            {list && list.length ?
                ( <List
                    itemLayout="vertical"
                    dataSource={list}
                    renderItem={item => (
                      <>
                    <Divider />
                      <List.Item
                        key={item._id}
                        extra={
                          <Image
                            width={100}
                            src={item.images[0]}
                          />
                        }
                      >
                        <List.Item.Meta
                          title= {<Link to={`/product/${item._id}`}>{item.name}</Link>}
                        />
                        <Typography.Paragraph>${item.finalPrice}</Typography.Paragraph>
                        <Typography.Paragraph>{item.description}</Typography.Paragraph>
                      </List.Item>
                      </>
                    )}
                />
                ) : null
            }
                </Col>
            </Row>       
        </div>
   );
};

  
export default Search;
   
