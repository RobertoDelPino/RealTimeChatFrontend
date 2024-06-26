import Chat from "@pages/Chat/components/Chat/Chat"
import ChatList from "@pages/Chat/components/ChatList/ChatList"
import useChat from "@hooks/useChat"

const ChatPage = () => {
    const { selectedChat } = useChat();
    
    const chatIsSelected = function () {
        return (
            <>
                <section className="lg:w-3/12 w-0 h-full hidden lg:block">
                        <ChatList/>
                    </section>

                <section className="lg:w-9/12 w-full h-full">
                        <Chat/>
                </section>
            </>
        )
    
    };
    
    const chatIsNotSelected = function () {
        return (
            <>
                <section className="lg:w-3/12 w-full h-full">
                    <ChatList/>
                </section>

                <section className="lg:w-9/12 w-0 h-full hidden lg:block">
                    <Chat/>
                </section>
            </>
        )
    }

    return (
        <section className="flex flex-wrap relative h-full bg-background text-primary">
            {
                Object.keys(selectedChat).length !== 0 ? chatIsSelected() : chatIsNotSelected()
            }
        </section>
    )
}

export default ChatPage