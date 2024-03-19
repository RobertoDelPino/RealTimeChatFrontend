/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react';
import ChangeProfileModal from './Modals/ChangeProfileModal';

const PersonalUserPhoto = ({ getProfilePhoto, changePhoto }) => {
  const [avatar, setAvatar] = useState("defaultAvatar.webp");
  const fileInput = useRef();

  useEffect(() => {
    const fetchPhoto = async () => {
      const photo = await getProfilePhoto();
      setAvatar(photo);
    };

    fetchPhoto();
  }, [getProfilePhoto]);

  const changePhotoHandler = async (e) => {
    await changePhoto(e.target.files[0])
    const photo = await getProfilePhoto();
    setAvatar(photo); 
  }

  const [isOpen, setIsOpen] = useState(false);

  const handleDivClick = () => {
    // fileInput.current.click();
    setIsOpen(true);
  };

  return (
    <div className='my-3 flex justify-center'>
      <div className='flex items-center'>
        {avatar && <img onClick={handleDivClick} className='ml-4 w-10 h-10 rounded-full object-cover hover:bg-black hover:opacity-70 hover:cursor-pointer' src={avatar} alt="Foto de perfil" />}
      </div>
      <input type='file' ref={fileInput} onChange={changePhotoHandler} style={{ display: 'none' }} />

      <ChangeProfileModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default PersonalUserPhoto;