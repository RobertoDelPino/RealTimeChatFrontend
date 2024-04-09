import useChat from "@hooks/useChat"
import useAuth from "@hooks/useAuth"
import EmojiPicker from 'emoji-picker-react';
import { useState } from "react";
import { notify } from "@helpers/notify";

const MessageInput = () => {

    const { chatOnPage, sendMessage } = useChat();
    const { auth } = useAuth();

    const [message, setMessage] = useState("");
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(message == ""){
            notify("Debe escribir un mensaje para poder enviarlo", "error")
            return // Hay que mostrar alerta o algo para indicar que es necesario escribir algo
        }

        const messageInfo = {
            message,
            chatId: chatOnPage._id,
            sender: auth._id,
            users: chatOnPage.users,
            receivers: chatOnPage.users.filter(user => user._id != auth._id).map(user => user._id),
            isGroup: chatOnPage.isGroup,
            groupName: chatOnPage.groupName
        }

        await sendMessage(messageInfo)
        setMessage("")
    }

  return (
    <section className="bg-focus h-20 w-full lg:w-9/12  fixed bottom-0 flex justify-center items-center border-t border-black">
        <form className="w-full lg:w-9/12 flex justify-center items-center" onSubmit={handleSubmit}>
            <div className="mr-5 flex items-center">
                <button type="button" onClick={() => setOpenEmojiPicker(!openEmojiPicker)}>
                    <svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" class="" version="1.1" x="0px" y="0px" enable-background="new 0 0 24 24"><title>smiley</title><path fill="currentColor" d="M9.153,11.603c0.795,0,1.439-0.879,1.439-1.962S9.948,7.679,9.153,7.679 S7.714,8.558,7.714,9.641S8.358,11.603,9.153,11.603z M5.949,12.965c-0.026-0.307-0.131,5.218,6.063,5.551 c6.066-0.25,6.066-5.551,6.066-5.551C12,14.381,5.949,12.965,5.949,12.965z M17.312,14.073c0,0-0.669,1.959-5.051,1.959 c-3.505,0-5.388-1.164-5.607-1.959C6.654,14.073,12.566,15.128,17.312,14.073z M11.804,1.011c-6.195,0-10.826,5.022-10.826,11.217 s4.826,10.761,11.021,10.761S23.02,18.423,23.02,12.228C23.021,6.033,17.999,1.011,11.804,1.011z M12,21.354 c-5.273,0-9.381-3.886-9.381-9.159s3.942-9.548,9.215-9.548s9.548,4.275,9.548,9.548C21.381,17.467,17.273,21.354,12,21.354z  M15.108,11.603c0.795,0,1.439-0.879,1.439-1.962s-0.644-1.962-1.439-1.962s-1.439,0.879-1.439,1.962S14.313,11.603,15.108,11.603z"></path></svg>
                </button>
                <div className="absolute -top-[410px] left-10">
                    <EmojiPicker 
                        open={openEmojiPicker} 
                        width={"300px"} 
                        height={"400px"} 
                        theme="dark"
                        onEmojiClick={(emojiObject, event) => setMessage((prevInput) => prevInput + emojiObject.emoji)}
                        emojiStyle="apple"
                    />
                </div>
            </div>
            <input
                type="text" 
                className="bg-highlight h-8 w-9/12 p-1 resize-none rounded-md"  
                placeholder="Empieza a escribir"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button 
                type="submit"
                onClick={handleSubmit}
                className="ml-5 w-6 transition transform hover:scale-110 hover:translate-x-1"
            >
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 2L2 8.66667L11.5833 12.4167M22 2L15.3333 22L11.5833 12.4167M22 2L11.5833 12.4167" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>
        </form>
       
    </section>
  )
}

export default MessageInput