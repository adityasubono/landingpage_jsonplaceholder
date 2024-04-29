import { useState } from 'react';
import PropTypes from 'prop-types';

const AddEditPost = (props) => {
    const { onSubmit, initialValues } = props;
    const [formData, setFormData] = useState(initialValues || { title: '', body: '' });

    const handleChange = (e) => {
        console.log("initialvalues",initialValues);
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Title:</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange}/>
            </div>
            <div>
                <label>Body:</label>
                <textarea name="body" value={formData.body} onChange={handleChange}/>
            </div>
            <button type="submit">{initialValues ? 'Update Post' : 'Add Post'}</button>
        </form>
    );
};

AddEditPost.propTypes = {
    onSubmit: PropTypes.func,
    initialValues: PropTypes.object
};

export default AddEditPost;
