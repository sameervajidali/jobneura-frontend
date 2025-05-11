
import React, { useEffect, useState } from 'react';
import UserDetailsCard from "../../../components/admin/UserDetailsCard.jsx";
import { useParams, useNavigate } from "react-router-dom";
import API from '../../../services/axios';


export default function UserDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    API.get(`/admin/users/${id}`)
      .then(res => setUser(res.data.user))
      .catch(() => navigate('/admin/users'));
  }, [id]);

  if (!user) return <p>Loading…</p>;

  return (
    <>
      <button onClick={() => navigate(-1)} className="text-indigo-600 underline mb-4">
        ← Back to users
      </button>
      <UserDetailsCard user={user} />
    </>
  );
}
