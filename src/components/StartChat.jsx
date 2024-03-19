/*
    ¿Cómo deberia de ser?
    1. Buscar un usuario por el email
    2. Si se encuentra, preguntar si se quiere iniciar una conversación, si pulsa si, se crea en la base de datos
    3. Si no se encuentra, mostrar mensaje de error
*/

import { useState } from "react";
import useChat from "@hooks/useChat";
import useAuth from "@hooks/useAuth";

const StartChat = () => {

    const { findUser, setChatOnPage, findChatId, getChatMessages, setChats, chats, setSelectedChat } = useChat();
    const { auth } = useAuth();

    const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const getUserInfo = async () => {
        try {
            if(email == "") return showError("Debes introducir un email")

            const userResult = await findUser(email);

            const connectedUserId = auth._id
            if(userResult.data._id == connectedUserId){
                showError("No puedes iniciar una conversación contigo mismo")
                return
            }

            const findChatResult = await findChatId(connectedUserId, userResult.data._id)
            if(findChatResult.data.chatId){
                var chatFinded = findChat(findChatResult.data.chatId)
                if(chatFinded){
                    setSelectedChat(chatFinded)
                    await getChatMessages(findChatResult.data.chatId)
                    setEmail("")
                    return
                }

                const chatId = findChatResult.data.chatId
                const usersId = findChatResult.data.users
                const usersChat = usersId.map(userId => ({_id: userId}))
                setChats([...chats, {_id: chatId, users: usersId, messages: []}])
                setSelectedChat({_id: chatId, users: usersChat, messages: []})
                await getChatMessages(chatId)
                setEmail("")
                return

                function findChat(chatId){
                    const chatResult = chats.find(chat => chat._id == chatId)
                    return chatResult ? chatResult : null
                }
            }

            const users = [{_id: userResult.data._id}, {_id: connectedUserId}]
            setChatOnPage({
                _id: "",
                users: users,
                messages: []
            })

            setEmail("")
        } catch (error) {
            if(error.response.status == 404){
                showError("No se ha encontrado ningun usuario con ese email")
            }
        }

        function showError(errorMessage){
            setErrorMessage(errorMessage)
            document.getElementById("errorMessage").classList.remove("hidden")
            document.getElementById("errorMessage").classList.add("inline-block")

            setTimeout(() => {
                document.getElementById("errorMessage").classList.add("hidden")
                document.getElementById("errorMessage").classList.remove("inline-block")
            }, 3000)
        }
    }

  return (
    <section className="flex justify-center flex-wrap">
        <section className="w-11/12 flex items-center bg-highlight rounded-lg my-2">
            <input 
                className="w-full rounded-l-lg p-3 bg-highlight placeholder-primary-500 focus:bg-focus focus:placeholder-primary-100 focus:outline-none" 
                type="text" 
                placeholder="Introduce un email para añadir un contacto"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button 
                className="p-3 right-0 -top-px hover:scale-125 transition"
                onClick={getUserInfo}
            >
                <svg className="w-6 fill-primary-500 hover:fill-primary-100 font-bold" viewBox="0 0 488.4 488.4">
                    <g>
                        <g>
                            <path d="M0,203.25c0,112.1,91.2,203.2,203.2,203.2c51.6,0,98.8-19.4,134.7-51.2l129.5,129.5c2.4,2.4,5.5,3.6,8.7,3.6
                                s6.3-1.2,8.7-3.6c4.8-4.8,4.8-12.5,0-17.3l-129.6-129.5c31.8-35.9,51.2-83,51.2-134.7c0-112.1-91.2-203.2-203.2-203.2
                                S0,91.15,0,203.25z M381.9,203.25c0,98.5-80.2,178.7-178.7,178.7s-178.7-80.2-178.7-178.7s80.2-178.7,178.7-178.7
                                S381.9,104.65,381.9,203.25z"/>
                        </g>
                    </g>
                </svg>
            </button>
        </section>
        
        <p id="errorMessage" className="hidden text-center font-semibold text-primary bg-red-500 p-2 mx-auto">{errorMessage}</p>
    </section>
    
  )
}

export default StartChat