import useAuth from "@hooks/useAuth"
import useChat from "@hooks/useChat"
import Logout from "@pages/Chat/components/ChatList/Logout";
import PersonalUserPhoto from "@pages/Chat/components/ChatList/PersonalUserPhoto";
import StartChatComponent from "@pages/Chat/components/ChatList/StartChatComponent";
import GroupChat from "./GroupChat";
import SingleChat from "./SingleChat";

const ChatList = () => {
    const { 
        getSortedChats, 
        isLoading, 
        setSelectedChat, 
        updateMessagesStatus, 
        removeChatWithNewMessages 
    } = useChat();
    const { 
        auth, 
        getProfilePhoto, 
        changePhoto,
    } = useAuth();

    const sortedChats = getSortedChats();
    
    const handleSelectedChat = async (chat) => {
        setSelectedChat(chat)
        if(chat.messages.length !== 0){
            await updateMessagesStatus(chat)
            removeChatWithNewMessages(chat._id)
        }
    }
 
    if(isLoading)
        return <div className="h-full flex justify-center items-center">Cargando...</div> 

    return  (
            <article className="w-full h-full flex flex-col border-black border-r">
                <StartChatComponent/>
                <div className="overflow-y-scroll mt-2">
                    {
                        Object.keys(sortedChats).length == 0 || sortedChats.length == 0
                        ? <div className="text-center" >Comience una nueva conversacion</div> 
                        : (
                            sortedChats.map((chat, index) => {
                                return chat.isGroup 
                                ? <GroupChat chat={chat} handleSelectedChat={handleSelectedChat} key={index} />
                                : <SingleChat chat={chat} handleSelectedChat={handleSelectedChat} key={index} />
                            })
                        )
                    }
                </div>
                <section className="h-20 min-h-20 mt-auto p-1 border-t border-black bg-focus flex justify-between">
                    <PersonalUserPhoto user={auth} getProfilePhoto={getProfilePhoto} changePhoto={changePhoto}/>
                    <Logout/>
                </section>
            </article>
        )
}

export default ChatList