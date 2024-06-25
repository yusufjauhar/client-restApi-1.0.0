import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const response = await axios.get(`https://enthusiastic-happiness-production.up.railway.app/products`);
    setProducts(response.data);
  };

  const deleteProduct = async (productId) => {
    try {
      await axios.delete(`https://enthusiastic-happiness-production.up.railway.app/products/${productId}`);
      getProducts();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-5">
      <Link to="/add" className="button is-success">
        Tambah Baru
      </Link>
      <div className="columns is-multiline mt-2">
        {products.map((product) => (
          <div className="column is-one-quarter" key={product.id}>
            <div className="card">
              <div className="card-image">
                <figure className="image is-4by3">
                  <img src={product.url} alt="Gambar Produk" />
                </figure>
              </div>
              <div className="card-content">
                <div className="media">
                  <div className="media-content">
                    <p className="title is-4">{product.judul_buku}</p>
                    <p className="subtitle is-6">{product.pengarang}</p>
                  </div>
                </div>
                <div className="content">
                  <p>Kode Buku: {product.kode_buku}</p>
                  <p>ISBN: {product.isbn}</p>
                  <p>Stok: {product.stock}</p>
                  <p>{product.sekilas_isi}</p>
                  <time dateTime={product.tanggal_masuk}>
                    Tanggal Masuk: {new Date(product.tanggal_masuk).toLocaleDateString()}
                  </time>
                </div>
              </div>

              <footer className="card-footer">
                <Link to={`edit/${product.id}`} className="card-footer-item">
                  Edit
                </Link>
                <a
                  onClick={() => deleteProduct(product.id)}
                  className="card-footer-item"
                >
                  Hapus
                </a>
              </footer>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
