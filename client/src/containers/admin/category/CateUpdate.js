import React, {useEffect, useState} from "react";
import CateForm from "./CateForm";
import axios from "axios"; 
const CateUpdate = ({match}) => {
    const [cateData, setCateData] = useState({isEmpty: true})
    useEffect(() => {
        axios
        .get(`/api/category/${match.params.id}`)
        .then(res => {
           if (res.error) {
               console.log(res.message)
           } else {
               setCateData(res.data)
           }
        })
        .catch(err => {
            console.log(err)
        });
     }, [match.params.id]);
   return (
      <CateForm data={cateData} />
   );
};

export default CateUpdate;
