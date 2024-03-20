/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';

const UserPhoto = ({ getProfilePhoto, user }) => {
  const [avatar, setAvatar] = useState("defaultAvatar.webp");

  useEffect(() => {
    const fetchPhoto = async () => {
      const photo = await getProfilePhoto(user._id);
      setAvatar(photo);
    };

    fetchPhoto();
  }, [getProfilePhoto, user]);

  return avatar && <img className='w-full h-full rounded-full object-cover bg-slate-600' src={avatar} alt="Foto de perfil" />
};

export default UserPhoto