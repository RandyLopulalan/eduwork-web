import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { createAddress, updateAddress } from "../../features/address/addressSlice";
import { FaSave } from "react-icons/fa";

const AddressForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { address } = useSelector((state) => state.address);
  const [createData, setCreateData] = useState({
    alamat: String,
    kelurahan: String,
    kecamatan: String,
    kabupaten: String,
    provinsi: String,
    detail: String,
  });

  const { alamat, kelurahan, kecamatan, kabupaten, provinsi, detail } =
    createData;

  // ================= onChange input addrress ===================
  const onChange = (e) => {
    setCreateData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // ==================== Edit address ======================
  const editAddress = (e) => {
    e.preventDefault();
    const _id = id;

    const newAddress = {
      _id,
      alamat,
      kelurahan,
      kecamatan,
      kabupaten,
      provinsi,
      detail,
    };

    dispatch(updateAddress(newAddress));
    navigate("/account");

    setCreateData({
      alamat: String,
      kelurahan: String,
      kecamatan: String,
      kabupaten: String,
      provinsi: String,
      detail: String,
    });
  };

  // ==================== Add/Create address ======================
  const addNewAddress = (e) => {
    e.preventDefault();
    const newAddress = {
      alamat,
      kelurahan,
      kecamatan,
      kabupaten,
      provinsi,
      detail,
    };

    dispatch(createAddress(newAddress));

    setCreateData({
      alamat: String,
      kelurahan: String,
      kecamatan: String,
      kabupaten: String,
      provinsi: String,
      detail: String,
    });
    
    navigate("/account");
  };

  return (
    <div className="form">
      <h1>Address Form</h1>
      {id ? (
        address
          .filter((list) => list._id.includes(id))
          .map((data) => {
            return (
              <form key={data._id} onSubmit={editAddress}>
                <h5>Edit Form</h5>
                <div className="form-group">
                  <input
                    id="alamat"
                    name="alamat"
                    type="text"
                    placeholder={data.alamat}
                    className="form-control"
                    defaultValue={data.alamat}
                    onChange={(e) => onChange(e)}
                  />
                </div>
                <div className="form-group">
                  <input
                    id="kelurahan"
                    name="kelurahan"
                    type="text"
                    placeholder={data.kelurahan}
                    className="form-control"
                    defaultValue={data.kelurahan}
                    onChange={(e) => onChange(e)}
                  />
                </div>
                <div className="form-group">
                  <input
                    id="kecamatan"
                    name="kecamatan"
                    type="text"
                    placeholder={data.kecamatan}
                    className="form-control"
                    defaultValue={data.kecamatan}
                    onChange={(e) => onChange(e)}
                  />
                </div>
                <div className="form-group">
                  <input
                    id="kabupaten"
                    name="kabupaten"
                    type="text"
                    placeholder={data.kabupaten}
                    className="form-control"
                    defaultValue={data.kabupaten}
                    onChange={(e) => onChange(e)}
                  />
                </div>
                <div className="form-group">
                  <input
                    id="provinsi"
                    name="provinsi"
                    type="text"
                    placeholder={data.provinsi}
                    className="form-control"
                    defaultValue={data.provinsi}
                    onChange={(e) => onChange(e)}
                  />
                </div>
                <div className="form-group">
                  <input
                    id="detail"
                    name="detail"
                    type="text"
                    placeholder={data.detail}
                    className="form-control"
                    defaultValue={data.detail}
                    onChange={(e) => onChange(e)}
                  />
                </div>
                <button className="btn">
                  <FaSave /> Simpan
                </button>
              </form>
            );
          })
      ) : (
        <form onSubmit={addNewAddress}>
          <h5>Create Form</h5>
          <div className="form-group">
            <input
              id="alamat"
              name="alamat"
              type="text"
              placeholder="alamat"
              className="form-control"
              defaultValue={alamat}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              id="kelurahan"
              name="kelurahan"
              type="text"
              placeholder="kelurahan"
              className="form-control"
              defaultValue={kelurahan}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              id="kecamatan"
              name="kecamatan"
              type="text"
              placeholder="kecamatan"
              className="form-control"
              defaultValue={kecamatan}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              id="kabupaten"
              name="kabupaten"
              type="text"
              placeholder="kabupaten"
              className="form-control"
              defaultValue={kabupaten}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              id="provinsi"
              name="provinsi"
              type="text"
              placeholder="provinsi"
              className="form-control"
              defaultValue={provinsi}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              id="detail"
              name="detail"
              type="text"
              placeholder="detail"
              className="form-control"
              defaultValue={detail}
              onChange={(e) => onChange(e)}
            />
          </div>
          <button className="btn">
            <FaSave /> Simpan
          </button>
        </form>
      )}
    </div>
  );
};

export default AddressForm;
