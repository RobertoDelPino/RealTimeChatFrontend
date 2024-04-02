/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import useAuth from '@hooks/useAuth';
import useChat from '@hooks/useChat';

const ChatHeader = () => {
    const { selectedChat} = useChat();
    const { auth, getProfilePhoto } = useAuth();
    const [avatar, setAvatar] = useState("defaultAvatar.webp");
    const chatName = selectedChat.users.length > 2 
        ? selectedChat.groupName 
        : selectedChat.users.find(user => user._id !== auth._id).name;

    useEffect(() => {
        const fetchPhoto = async () => {
            if(selectedChat.users.length === 2) {
                const user = selectedChat.users.find(user => user._id !== selectedChat._id);
                const photo = await getProfilePhoto(user._id);
                setAvatar(photo);
            }
        };
    
        fetchPhoto();
    }, [getProfilePhoto, selectedChat]);

    return (
        <div className="flex items-center p-4">
            <img src={avatar} alt="Profile" className="w-10 h-10 object-cover rounded-full mr-4" />
            <div>
                <h2 className="text-xl font-bold max-w-[170px] md:max-w-none pr-2 overflow-hidden">{chatName}</h2>
                <p className="text-sm text-gray-400">
                    {selectedChat.users.length > 2 
                        ? selectedChat.users.map(user => {
                            if(user._id !== auth._id) return user.name;
                            return "Tú"
                        }).join(", ") 
                        : selectedChat.users.find(user => user._id !== auth._id).email
                    }
                </p>
            </div>
        </div>
    );
};

export default ChatHeader;