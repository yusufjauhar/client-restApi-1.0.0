import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [kodeBuku, setKodeBuku] = useState("");
  const [isbn, setIsbn] = useState("");
  const [judulBuku, setJudulBuku] = useState("");
  const [pengarang, setPengarang] = useState("");
  const [sekilasIsi, setSekilasIsi] = useState("");
  const [tanggalMasuk, setTanggalMasuk] = useState("");
  const [stock, setStock] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const loadImage = (e) => {
    const image = e.target.files[0];
    setFile(image);
    setPreview(URL.createObjectURL(image));
  };

  const saveProduct = async (e) => {
    e.preventDefault();
    if (!kodeBuku || !isbn || !judulBuku || !pengarang || !sekilasIsi || !tanggalMasuk || !stock) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("kode_buku", kodeBuku);
    formData.append("isbn", isbn);
    formData.append("judul_buku", judulBuku);
    formData.append("pengarang", pengarang);
    formData.append("sekilas_isi", sekilasIsi);
    formData.append("tanggal_masuk", tanggalMasuk);
    formData.append("stock", stock);

    try {
      await axios.post(`https://enthusiastic-happiness-production.up.railway.app/products`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/");
    } catch (error) {
      setError("Error saving product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="columns is-centered mt-5">
      <div className="column is-half">
        <form onSubmit={saveProduct}>
          {error && <div className="notification is-danger">{error}</div>}
          <div className="field">
            <label className="label">Kode Buku</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={kodeBuku}
                onChange={(e) => setKodeBuku(e.target.value)}
                placeholder="Kode Buku"
                required
              />
            </div>
          </div>
          <div className="field">
            <label className="label">ISBN</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={isbn}
                onChange={(e) => setIsbn(e.target.value)}
                placeholder="ISBN"
                required
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Judul Buku</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={judulBuku}
                onChange={(e) => setJudulBuku(e.target.value)}
                placeholder="Judul Buku"
                required
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Pengarang</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={pengarang}
                onChange={(e) => setPengarang(e.target.value)}
                placeholder="Pengarang"
                required
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Sekilas Isi</label>
            <div className="control">
              <textarea
                className="textarea"
                value={sekilasIsi}
                onChange={(e) => setSekilasIsi(e.target.value)}
                placeholder="Sekilas Isi"
                required
              ></textarea>
            </div>
          </div>
          <div className="field">
            <label className="label">Tanggal Masuk</label>
            <div className="control">
              <input
                type="date"
                className="input"
                value={tanggalMasuk}
                onChange={(e) => setTanggalMasuk(e.target.value)}
                placeholder="Tanggal Masuk"
                required
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Stock</label>
            <div className="control">
              <input
                type="number"
                className="input"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                placeholder="Stock"
                required
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Gambar</label>
            <div className="control">
              <div className="file">
                <label className="file-label">
                  <input
                    type="file"
                    className="file-input"
                    onChange={loadImage}
                  />
                  <span className="file-cta">
                    <span className="file-label">Pilih file...</span>
                  </span>
                </label>
              </div>
            </div>
          </div>
          {preview && (
            <figure className="image is-128x128">
              <img src={preview} alt="Preview" />
            </figure>
          )}
          <div className="field">
            <div className="control">
              <button type="submit" className="button is-success" disabled={loading}>
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
