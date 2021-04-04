import { SyntheticEvent, useState } from "react";
import { Redirect } from "react-router";
import Wrapper from "./Wrapper";

const ProductsCreate = () => {

    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [redirect, setRedirect] = useState(false);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        await fetch('http://localhost:8000/api/products', {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                title,
                image
            })
        })

        setRedirect(true);
    };

    if (redirect) {
        return <Redirect to={'/admin/products'} />
    }

    return (
        <Wrapper>
            <form onSubmit={ submit }  className="form-group">
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" id="title" className="form-control"
                        onChange={ e => setTitle(e.target.value) }
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="image">Image</label>
                    <input type="text" name="image" id="image" className="form-control"
                         onChange={ e => setImage(e.target.value) }
                    />
                </div>
                <div className="mt-2">
                    <button className="btn btn-outline-secondary">Save</button>
                </div>
            </form>
        </Wrapper>
    );
};

export default ProductsCreate;