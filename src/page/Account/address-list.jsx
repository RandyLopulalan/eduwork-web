import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteAddress, getAddress } from "../../features/address/addressSlice";

const AddressList = () => {
  const { address } = useSelector((state) => state.address);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ==================== Delete Address ======================
  const deleteHandler = async (id) => {
    await dispatch(deleteAddress(id));
    await dispatch(getAddress());
  };

  return (
    <div className="address">
      {address.map((data) => (
        <section key={data._id} className="address-list">
          <h3>Alamat: {data.alamat}</h3>
          <h3>Kelurahan: {data.kelurahan}</h3>
          <h3>Kecamatan: {data.kecamatan}</h3>
          <h3>Kabupaten: {data.kabupaten}</h3>
          <h3>Provinsi: {data.provinsi}</h3>
          <h3>Detail: {data.detail}</h3>
          <button
            className="btn-address"
            onClick={() => navigate(`/account/address-form/${data._id}`)}
          >
            Edit
          </button>
          <button
            className="btn-address"
            onClick={() => deleteHandler(data._id)}
          >
            Delete
          </button>
        </section>
      ))}
      <button className="btn-add-address" onClick={() => navigate("/account/address-form")}>
        Tambah Alamat
      </button>
    </div>
  );
};

export default AddressList;
