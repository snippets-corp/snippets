import React from 'react';

import './Form.css';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import { createClient } from '@supabase/supabase-js';
const supabase = createClient(
  process.env.REACT_APP_supabaseURL,
  process.env.REACT_APP_supabaseKey
);

const Form = () => {

  // function to grab image url
  // function to push all information to db

  const handleClick = async (e) => {
    e.preventDefault();
    // function to push images up
    const grabPhotoElement = document.getElementById('imagefile');
    const imageFile = grabPhotoElement.files[0];
    console.log(imageFile);
    const value = Math.floor(Math.random() * 900000).toString();
    await supabase.storage.from('images').upload(value, imageFile);
    // function to grab image url
    const findImageURLFromDB = await supabase.storage.from('images').getPublicUrl(value);
    const url_of_image = findImageURLFromDB.data.publicUrl;
    // grabs content from form 
    const title_of_post = document.getElementById('title_of_post').value;
    const notes = document.getElementById('notes').value;
    const select_type = document.getElementById('select_type').value;
    // adds to DB;
    const { data, error } = await supabase.from('posts').insert([{
      title_of_post,
      url_of_image,
      notes,
      select_type
  }]).single();
  };

  return(
    <>
      <div className="center-popup">
        <Popup trigger={<button>Open Me</button>} position="center middle" modal nested>{
            close => (
              <>
                <div className="modal">
                  <form onSubmit={handleClick}>
                    <h3>Create Post Here</h3>
                    <button onClick={() => { 
                      close();
                      location.reload();
                      }} className="form-button">
                      X
                    </button>
                    <br />
                    <input placeholder='title of post' id="title_of_post" required/>
                    <br />
                    <input type="file" id="imagefile" required />
                    <br />
                    <input placeholder="notes" id="notes" required />
                    <br />
                    <select id="select_type">
                      <option value="React">
                        React
                      </option>
                      <option value="Angular">
                        Angular
                      </option>
                      <option value="Vue">
                        Vue
                      </option>
                      <option value="HTML">
                        HTML
                      </option>
                      <option value="CSS">
                        CSS
                      </option>
                      <option value="Node">
                        Node
                      </option>
                      <option value="MongoDB">
                        MongoDB
                      </option>
                      <option vaue="JavaScript">
                        JavaScript
                      </option>
                      <option value="TypeScript">
                        TypeScript
                      </option>
                      <option value="Python">
                        Python
                      </option>
                      <option value="Java">
                        Java
                      </option>
                      <option value="Other">
                        Other
                      </option>
                    </select>
                    <br />
                    <button>
                      Add Post
                    </button>
                  </form>
                </div>
              </>
            )
          }
        </Popup>
      </div>
    </>
  );
};

export default Form;