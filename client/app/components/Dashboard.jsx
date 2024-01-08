import React from 'react';
import './Global.css';
import {useEffect, useState} from 'react';

import Form from './deeperComponents/Form.jsx';
import Post from './deeperComponents/Post.jsx';

import { createClient } from '@supabase/supabase-js';
const supabase = createClient(
  process.env.REACT_APP_supabaseURL,
  process.env.REACT_APP_supabaseKey
);

const Dashboard = () => {

  const [renderedPosts, setRenderedPosts] = useState([]);

  useEffect(() => {
    (async function () {
      const {data, error} = await supabase.from('posts').select();
      const holdingPosts = [];
      if (data) {
        for (let i = 0; i < data.length; i++) {
          holdingPosts.push(
            <Post postObj={data[i]}/>
          )
        }
        setRenderedPosts(holdingPosts);
      }
    })();
  }, []);

  return(
    <>
    <div className="TopBar">
      <p>snippets</p>
      <Form />
    </div>
    <div className="outerDiv">
      <div className='postContainerDiv'>
      {renderedPosts}
      </div>
    </div>
    </>
  )
};

export default Dashboard;