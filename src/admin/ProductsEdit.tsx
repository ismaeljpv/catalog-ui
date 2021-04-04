import { SyntheticEvent, useEffect, useState, PropsWithRef } from "react";
import { Redirect } from "react-router";
import { Product } from "./interfaces/Product";
import Wrapper from "./Wrapper";

const ProductsEdit = (props: PropsWithRef<any>) => {

    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {

        (
            async () => {

                const response = await fetch(`http://localhost:8000/api/products/${props.match.params.id}`);
                const product: Product = await response.json();
                setTitle(product.title);
                setImage(product.image);

            }
        )();

    }, []);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        await fetch(`http://localhost:8000/api/products/${props.match.params.id}`, {
            method: 'PUT',
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
                        defaultValue={ title }
                        onChange={ e => setTitle(e.target.value) }
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="image">Image</label>
                    <input type="text" name="image" id="image" className="form-control"
                         defaultValue={ image }
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

export default ProductsEdit;