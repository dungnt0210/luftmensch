import React, {useEffect, useState} from "react";
import BlogForm from "./BlogForm";
import axios from "axios"; 
const BlogUpdate = ({match}) => {
    const [blogData, setBlogData] = useState({isEmpty: true})
    useEffect(() => {
        axios
        .get(`/api/blog/${match.params.id}`)
        .then(res => {
           if (res.error) {
               console.log(res.message)
           } else {
               setBlogData(res.data)
           }
        })
        .catch(err => {
            console.log(err)
        });
     }, [match.params.id]);
   return (
      <BlogForm data={blogData} />
   );
};

export default BlogUpdate;
