import React, {useEffect} from "react";
import { List, Button, Slider, Collapse, Radio, Tag } from 'antd';
import {
    CheckOutlined,
    MinusOutlined,
    FilterOutlined
  } from '@ant-design/icons';
import "./filter.scss";
const { Panel } = Collapse;
const Filter = ({
  toggleFilterColor,
  filterColors, 
  filterSizes, 
  handleFilterSize, 
  chosenSize, 
  hanldeFilterPrice,
  handleCloseSize
}) => {
   return (
    <Collapse ghost expandIconPosition="right" className="filter-block">
      {filterSizes.length ? 
        (<List
        grid={{
        gutter: 10
          }}
          dataSource={filterSizes}
          renderItem={(item, index) => (
            <Tag
              key={item.value}
              color="blue"
              visible={item.value === chosenSize}
              closable={true}
              onClose={handleCloseSize}
            >
              size: {item.label}
            </Tag>
          )}
        />) : null
      }
      {filterColors.length ? 
        (<List
        grid={{
        gutter: 10
          }}
          dataSource={filterColors}
          renderItem={(item, index) => (
            <Tag
              key={item.value}
              color={item.value}
              visible={item.checked}
              closable={true}
              onClose={() => toggleFilterColor(index, true)}
            >
              color: {item.label}
            </Tag>
          )}
        />) : null
      }
      <Panel header="Color" key="color-filter">
      <List
        grid={{
        gutter: 10,
        column: 8
        }}
        dataSource={filterColors}
        renderItem={(item, index) => (
        <List.Item>
            <Button shape="circle" 
            style={{backgroundColor: item.value, color: item.textColor}} 
            icon={item.checked ? <CheckOutlined /> : <MinusOutlined />}
            onClick={e => toggleFilterColor(index, item.checked)}
            />
        </List.Item>
        )}
      />
      </Panel>
      <Panel header="Size" key="size-filter">
      <Radio.Group
          options={filterSizes}
          onChange={handleFilterSize}
          value={chosenSize}
          optionType="button"
          buttonStyle="solid"
        />
      </Panel>
      <Panel header="Price" key="price-filter">       
        <Slider
          range
          min={0}
          max={100}
          marks={{
            0: "0",
            100: "100$"
          }}
          defaultValue={[0,100]}
          onChange={value => hanldeFilterPrice(value)}
        />
      </Panel>
    </Collapse>
   );
};
export default Filter;
   
