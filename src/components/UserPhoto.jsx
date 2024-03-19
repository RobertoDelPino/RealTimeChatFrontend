/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';

const UserPhoto = ({ getProfilePhoto }) => {
  const [avatar, setAvatar] = useState("defaultAvatar.webp");

  useEffect(() => {
    const fetchPhoto = async () => {
      const photo = await getProfilePhoto();
      setAvatar(photo);
    };

    fetchPhoto();
  }, [getProfilePhoto]);

  return avatar && <img className='w-full h-full rounded-full object-cover bg-slate-600' src={avatar} alt="Foto de perfil" />
};

export default UserPhoto