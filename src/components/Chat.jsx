import { useEffect, useRef } from "react";
import useChat from "@hooks/useChat"
import useAuth from "@hooks/useAuth"
import MessageInput from "@components/MessageInput";
import io from "socket.io-client"
import ChatHeader from "@components/ChatHeader";

let socket;

const Chat = () => {
    const { selectedChat, setSelectedChat, getChatMessages, chatOnPage, setChatOnPage, isGettingChatMessages, chats, setChats, 
            updateChatsState, updateMessagesStatus, latestMessage, setLatestMessage } = useChat();
    const { auth, getProfilePhoto } = useAuth();
    const chatContainerRef = useRef(null);

    useEffect(() => {
        if(Object.keys(selectedChat).length !== 0){
            getChatMessages(selectedChat._id)
        }
    }, [selectedChat])


    useEffect(() => {
        socket = io(import.meta.env.VITE_BACKEND_URL)
    }, [])

    useEffect(() => {
        if(auth && auth._id !== undefined){
            socket.emit("Connected User", auth._id)
        }
    }, [auth])

    useEffect(() => {
        if(chatOnPage == null || latestMessage == null) return
        if(chatOnPage._id == latestMessage.chatId && latestMessage.sender != auth._id){
            const chat = chats.find(chat => chat._id == latestMessage.chatId)
            chat.messages[0] = latestMessage
            updateMessagesStatus(chat)
        }
    }, [chatOnPage, latestMessage])

    useEffect(() => {
        socket.on("Message sent", (message) => {
            if(chats.length != 0 
                && message.users.some((user) => user._id == auth._id) ){
                    setLatestMessage(message)
                    updateChatsState(message)
            }
        })

        socket.on("Message Chat Status Updated", (message) => {
            const chatChanged = chats.find(chat => chat._id == message.chatId)
            if(chatChanged){
                chatChanged.messages[0] = message
                const newChats = chats.map(chat => chat._id == message.chatId ? chatChanged : chat)
                setChats(newChats)
            }
        })
    })

    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [chatOnPage]);

    const closeChat = () => {
        setSelectedChat({})
        setChatOnPage({})
    }
    if(isGettingChatMessages) 
        return  <span className="h-full flex justify-center items-center">
                    <p>Cargando mensajes</p>
                </span>

    if(Object.keys(chatOnPage).length === 0) 
        return  <span className="h-full flex justify-center items-center">
                    <p>Seleccione un chat para poder abrirlo</p>
                </span>

    return (
        <div className="h-full max-h-full">
            <section className="h-[70px] z-10 relative top-0 flex justify-between items-center w-full bg-focus">
                <ChatHeader user={selectedChat.users.find(user => user._id !== auth._id)} getProfilePhoto={getProfilePhoto}/>
                <article className="px-4">
                    <button 
                        className="w-14 h-10 p-2 rounded-md right-0 hover:scale-110 transition"
                        onClick={closeChat}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" 
                            viewBox="0 0 26 26" xmlSpace="preserve">
                            <g>
                                <path fill="#fff" d="M21.125,0H4.875C2.182,0,0,2.182,0,4.875v16.25C0,23.818,2.182,26,4.875,26h16.25
                                    C23.818,26,26,23.818,26,21.125V4.875C26,2.182,23.818,0,21.125,0z M18.78,17.394l-1.388,1.387c-0.254,0.255-0.67,0.255-0.924,0
                                    L13,15.313L9.533,18.78c-0.255,0.255-0.67,0.255-0.925-0.002L7.22,17.394c-0.253-0.256-0.253-0.669,0-0.926l3.468-3.467
                                    L7.221,9.534c-0.254-0.256-0.254-0.672,0-0.925l1.388-1.388c0.255-0.257,0.671-0.257,0.925,0L13,10.689l3.468-3.468
                                    c0.255-0.257,0.671-0.257,0.924,0l1.388,1.386c0.254,0.255,0.254,0.671,0.001,0.927l-3.468,3.467l3.468,3.467
                                    C19.033,16.725,19.033,17.138,18.78,17.394z"/>
                            </g>
                        </svg>
                    </button>
                </article>
            </section>
                
            <section className="relative h-[calc(100%-70px-84px)] flex flex-col-reverse flex-grow overflow-scroll overflow-x-hidden " ref={chatContainerRef}>
                {
                    [...chatOnPage.messages].reverse().map((message, index) => {
                        const timestamp = new Date(message.createdAt)

                        if(auth._id == message.sender){
                            return <article className="text-right pr-4 mb-1 mt-1" key={index}>
                                    <article className="bg-[#336dbb] text-white inline-block rounded-s-md rounded-tr-md p-2 min-w-[100px] max-w-[60%]">
                                        <p className="text-left">{message.message}</p>
                                        <p className=" text-xs font-bold">{timestamp.getHours()}:{timestamp.getMinutes()}</p>
                                    </article>
                                </article>
                        }

                        return <article key={index} className="pl-4 mb-1 mt-1 max-w-[60%]">
                                    <article className="bg-focus inline-block rounded-e-md rounded-tl-md p-2 min-w-[100px]">
                                        <p className="mr-10">{message.message}</p>
                                        <p className="text-xs font-bold text-right">{timestamp.getHours()}:{timestamp.getMinutes()}</p>
                                    </article>
                                </article>
                    })
                }
            </section>
            <MessageInput/>
        </div>
        
    )
}

export default Chat