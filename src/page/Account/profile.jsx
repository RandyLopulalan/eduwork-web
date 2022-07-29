import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrder } from "../../features/order/orderSlice";
import { me } from "../../features/auth/authSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.auth);

  // ==================== useEffect ======================
  useEffect(() => {
    dispatch(me());
    dispatch(getOrder());
  }, [dispatch]);

  return (
    <div>
      <h1>Profile</h1>

      {profile.map(({ _id, full_name, email }) => {
        return (
          <section key={_id}>
            <h3> full name: {full_name}</h3>
            <h3> email: {email}</h3>
          </section>
        );
      })}
    </div>
  );
};

export default Profile;
