import useAuth from "@hooks/useAuth"
import useChat from "@hooks/useChat"
import Logout from "@components/Logout";
import PersonalUserPhoto from "@components/PersonalUserPhoto";
import StartChat from "@components/StartChat";
import UserPhoto from "@components/UserPhoto";
import DoubleCheckGray from "@assets/double_check_gray.svg"
import DoubleCheckBlue from "@assets/double_check_blue.svg"

const PrevisualizeChats = () => {
    const { 
        getSortedChats, 
        isLoading, 
        selectedChat,
        setSelectedChat, 
        chatsWithNewMessages, 
        updateMessagesStatus, 
        removeChatWithNewMessages 
    } = useChat();
    const { 
        auth, 
        getProfilePhoto, 
        changePhoto 
    } = useAuth();

    const sortedChats = getSortedChats();
    
    const handleSelectChat = async (chat) => {
        await updateMessagesStatus(chat)
        setSelectedChat(chat)
        removeChatWithNewMessages(chat._id)
    }
 
    if(isLoading)
        return <div className="h-full flex justify-center items-center">Cargando...</div> 

    return  (
            <article className="w-full h-full flex flex-col border-black border-r ">
                <StartChat/>
                <div>
                    {
                        Object.keys(sortedChats).length == 0 || sortedChats.length == 0
                        ? <div className="text-center" >Comience una nueva conversacion</div> 
                        : (
                            sortedChats.map((chat) => {
                                return chat.users.map( (user, index) => {
                                    if(user._id != auth._id){
                                        return chat.messages.length == 0
                                            ? "" 
                                            :   <article 
                                                    className={"w-11/12 my-1 mx-auto p-2 rounded-md flex hover:cursor-pointer hover:bg-highlight " + (selectedChat._id == chat._id ? "bg-highlight" : "")} 
                                                    onClick={() => handleSelectChat(chat)}
                                                    key={index}>
                                                        <div className="w-[90%] flex items-center">
                                                            <div className="w-10 h-10 min-w-[40px] flex items-center">
                                                                <UserPhoto getProfilePhoto={getProfilePhoto}/>
                                                            </div>
                                                            <div className="w-[85%] overflow-hidden">
                                                                <p className="w-full mx-3 font-bold text-lg whitespace-nowrap overflow-hidden">{user.name} </p>
                                                                <div className="w-full mx-3">
                                                                    <section className="flex justify-between">
                                                                        {
                                                                            chat.messages[0].sender == auth._id
                                                                                ? <p className="w-8 whitespace-nowrap">
                                                                                    {chat.messages[0].readed
                                                                                        ? <img src={DoubleCheckBlue} alt="" /> 
                                                                                        : <img src={DoubleCheckGray} alt="" /> }
                                                                                </p>
                                                                                : ""
                                                                        }
                                                                        <p className="w-full inline-block whitespace-nowrap overflow-hidden">
                                                                            {chat.messages[0].message }
                                                                        </p>
                                                                    </section>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="w-[10%] text-center">
                                                            <p>
                                                                {new Date(chat.messages[0].createdAt).toLocaleTimeString("es-ES", {hour: '2-digit', minute:'2-digit'})}
                                                            </p>
                                                            {
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
                            })
                        )
                    }
                </div>
                <section className="h-20 mt-auto p-1 border-t border-black bg-focus flex justify-between">
                    <PersonalUserPhoto user={auth} getProfilePhoto={getProfilePhoto} changePhoto={changePhoto}/>
                    <Logout/>
                </section>
            </article>
        )
}

export default PrevisualizeChats