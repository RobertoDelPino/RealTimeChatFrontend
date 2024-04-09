import React from 'react'
import useAuth from '@hooks/useAuth';
import useChat from '@hooks/useChat';
import UserPhoto from './UserPhoto';
import DoubleCheckGray from "@assets/double_check_gray.svg"
import DoubleCheckBlue from "@assets/double_check_blue.svg"

const SingleChat = ({chat, handleSelectedChat}) => {

    const { 
        selectedChat,
        chatsWithNewMessages, 
    } = useChat();
    const { 
        auth, 
        getProfilePhoto, 
    } = useAuth();

    return (
        chat.users.map((user, index) => {
            if(user._id != auth._id){
                return <article 
                    className={"w-11/12 my-1 mx-auto p-2 rounded-md flex hover:cursor-pointer hover:bg-highlight " + (selectedChat._id == chat._id ? "bg-highlight" : "")} 
                    onClick={() => handleSelectedChat(chat)}
                    key={index}>
                        <div className="w-[85%] flex items-center">
                            <div className="w-10 h-10 min-w-[40px] flex items-center">
                                <UserPhoto getProfilePhoto={getProfilePhoto} user={user}/>
                            </div>
                            <div className="w-[90%] overflow-hidden">
                                <p className="w-full mx-3 font-bold text-lg whitespace-nowrap overflow-hidden">{user.name} </p>
                                <div className="w-full mx-3">
                                    <section className="flex justify-between">
                                        {
                                            chat.messages.length !== 0 
                                                ?   chat.messages[0].sender == auth._id
                                                        ? <p className="w-8 whitespace-nowrap">
                                                            {chat.messages[0].readed
                                                                ? <img src={DoubleCheckBlue} alt="" /> 
                                                                : <img src={DoubleCheckGray} alt="" /> }
                                                        </p>
                                                        : ""
                                                : <p className="mx-3">Comienza enviando un mensaje</p>
                                        }
                                        {
                                            chat.messages.length !== 0
                                            ? <p className="w-full inline-block whitespace-nowrap overflow-hidden">
                                                    {chat.messages[0].message }
                                            </p>
                                            : ""
                                        }
                                    </section>
                                </div>
                            </div>
                        </div>

                        <div className="w-[15%] text-center">
                            {
                                chat.messages.length !== 0
                                    ? <p>
                                        {new Date(chat.messages[0].createdAt).toLocaleTimeString("es-ES", {hour: '2-digit', minute:'2-digit'})}
                                    </p>
                                    : ""
                            }
                            {
                                chat.messages.length !== 0 &&
                                (chatsWithNewMessages.includes(chat._id) || 
                                    (!chat.messages[0].readed && chat.messages[0].sender != auth._id)) && (
                                    <div className="flex justify-center">
                                        <div className="w-5 h-5 rounded-full bg-red-500"></div>
                                    </div>
                                )
                            }
                        </div>
                        
                </article>
            }
        })
    )
}

export default SingleChat