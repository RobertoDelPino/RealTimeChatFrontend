import useChat from "@hooks/useChat"
import useAuth from "@hooks/useAuth"
import { useState } from "react";
import { notify } from "@helpers/notify";

const MessageInput = () => {

    const { chatOnPage, sendMessage } = useChat();
    const { auth } = useAuth();

    const [message, setMessage] = useState("");

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
        <form className="w-full lg:w-9/12 flex justify-center" onSubmit={handleSubmit}>
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