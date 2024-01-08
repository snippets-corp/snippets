import React from 'react';
import './Post.css';

const Post = (props) => {
  return(
    <>
      <div className='post-box'>
        <img src={props.postObj.url_of_image} />
        <p>{props.postObj.title_of_post}</p>
        <div className='description'>
          <div className="text">
          {props.postObj.notes}
          </div>
        </div>
      </div>
    </>
  )
};

export default Post;