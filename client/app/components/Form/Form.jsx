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
  // function to close the form
    close();
    location.reload();
  };

  return(
    <>
      <div className="center-popup">
        <Popup trigger={<button>Add Post</button>} position="center middle" modal nested>{
            close => (
              <>
                <div className="modal">
                <div className="TopBarForm">
                    <button onClick={
                      () => {
                        close();
                        location.reload();
                      }
                    } className="xButton">
                      X
                    </button>
                  </div>
                  <form onSubmit={handleClick}>
                    <label>
                      Title of Post
                    </label>
                    <br />
                    <input id="title_of_post"className="inputOptions" required/>
                    <br />
                    <label>
                      Description
                    </label>
                    <br />
                    <input id="notes" className="inputOptions" required />
                    <br />
                    <input type="file" id="imagefile" required />
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
                      Publish
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