/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';

const ChatHeader = (props) => {
    const { user, getProfilePhoto } = props;
    const [avatar, setAvatar] = useState("defaultAvatar.webp");

    useEffect(() => {
        const fetchPhoto = async () => {
          const photo = await getProfilePhoto(user._id);
          setAvatar(photo);
        };
    
        fetchPhoto();
    }, [getProfilePhoto, user]);

    
    return (
        <div className="flex items-center p-4">
            <img src={avatar} alt="Profile" className="w-10 h-10 object-cover rounded-full mr-4" />
            <h2 className="text-xl font-bold max-w-[170px] md:max-w-none pr-2 overflow-hidden">{user.name}</h2>
        </div>
    );
};

export default ChatHeader;