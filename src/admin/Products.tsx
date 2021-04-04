import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from './interfaces/Product';
import Wrapper from './Wrapper';

const Products = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        (
            async () => {

                const response = await fetch('http://localhost:8000/api/products');
                const data = await response.json();
                setProducts(data);

            }
        )();
    }, []);

    const del = async (id: number) => {

        if (window.confirm('Are you sure that you want to delete this product ?')) {
            await fetch(`http://localhost:8000/api/products/${id}`, {
                method: 'DELETE'
            });

            setProducts(products.filter((p: Product) => p.id !== id));
        }
    };

    return (
        <Wrapper>
            <div className="pt-3 pb-2 mb-3 border-bottom">
                <div className="btn-toolbar mb-2 mb-md-0" >
                    <Link to="/admin/products/create" className="btn btn-outline-secondary">Add</Link>
                </div>
            </div>

            <div>
                <h2>Product Details</h2>
                <div className="table-responsive">
                    <table className="table table-striped table-sm">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Image</th>
                                <th>Title</th>
                                <th>Likes</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                products.map(
                                    (p: Product) => {
                                        return (
                                            <tr key={p.id}>
                                                <td>{p.id}</td>
                                                <td> <img src={p.image} height="180" alt="" /> </td>
                                                <td>{p.title}</td>
                                                <td>{p.likes}</td>
                                                <td>
                                                    <div className="btn-group mr-2">
                                                        <Link to={`/admin/products/${p.id}/edit`}
                                                            className="btn btn-sm btn-outline-secondary"
                                                        >Edit</Link>
                                                        <button className="btn btn-sm btn-outline-secondary"
                                                            onClick={() => del(p.id)}
                                                        >Delete</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                        </tbody>
                    </table>
                </div>
            </div>
        </Wrapper>
    );
};

export default Products;