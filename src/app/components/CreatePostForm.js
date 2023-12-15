import { useState } from 'react';
import styles from './components.module.css';

const CreatePostForm = ({createPostFunction}) => {
    const [imageUpload, setImageUpload] = useState();
    return (
        <div className={styles.postHeader}>
            <h4>
                <a className={styles.ohneul}>[oh:neul] </a>
                in korean translates to "today" 
            </h4>
            <h4>share your day through your sketches </h4>

            <form 
            className = {styles.Form} 
            onSubmit={(e) => createPostFunction(e, imageUpload)}
            >
            <label htmlFor="postContent">today was...</label>
            <input type="text" id="postContent" name="postContent" />

            <label htmlFor="image">your sketch</label>
            <input 
            type="file"
            id="image"
            name="image"
            placeholder="choose image"
            accept='image/png,image/jpeg,image/jpg,image/gif,image/png'
            onChange={(e) => 
                setImageUpload(e.target.files[0]
            )} 
        />
            <button type = "submit">post</button>
        </form>
    </div>
    );
};

export default CreatePostForm;
