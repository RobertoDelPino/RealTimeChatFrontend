import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { notify } from "@helpers/notify";
import useAuth from "@hooks/useAuth";
import useChat from "@hooks/useChat";

const CreateGroupChatModal = ({ isOpen, setIsOpen}) => {
    const { searchUserByEmail, getProfilePhoto, auth } = useAuth();
    const { createChat, setSelectedChat, setChats } = useChat();
    const [ users, setUsers ] = useState([]);
    const [ email, setEmail ] = useState("");
    const [ name, setName ] = useState("");

    useEffect(() => {
        setTimeout(() => {
            setEmail("");
            setUsers([]);
            setName("");
        }, 310);
    }, [isOpen]);

    const handleSearchUserToAdd = async (e) => {
        e.preventDefault();
        if(email === ""){
            notify("El email no puede estar vacío", "error");
            return;
        }

        if(email === auth.email){
            notify("No puedes agregarte a ti mismo", "error");
            setEmail("");
            return;
        }
        
        const user = await searchUserByEmail(email);
        if(!user){
            notify("No se encontró el usuario", "error");
            return;
        }
        if(users.find(u => u.id === user.id)){
            notify("No se puede agregar a un usuario ya existente en el grupo", "error");
            return;
        }
        const userAvatar = await getProfilePhoto(user.id);
        user.avatar = userAvatar;
        setUsers([...users, user]);
        setEmail("");
    }

    const handleCreateGroupChat = async () => {
        const finalUsers = [...users, {id: auth._id, name: auth.name, email: auth.email, avatar: auth.avatar}]
        if(finalUsers.length <= 2){
            notify("Para crear un grupo debe de haber 3 personas como mínimo", "error");
            return;
        }

        if(name === ""){
            notify("El nombre del grupo no puede estar vacío", "error");
            return;
        }

        const chatCreated = await createChat(
            {
                chatName: name,
                users: finalUsers.map(user => user.id)
            }
        );

        setChats(prevChats => {
            const othersChat = prevChats.filter(chat => chat._id !== chatCreated._id);
            return [{ 
                _id: chatCreated._id, 
                users: chatCreated.users, 
                messages: [], 
                isGroup: chatCreated.isGroup, 
                groupName: chatCreated.groupName
            }, ...othersChat];
        
        })
        setSelectedChat(chatCreated);
        setIsOpen(false);
    }

    const handleRemoveUserFromGroup = (e) => {
        const userId = e.target.parentElement.parentElement.id;
        const newUsers = users.filter(user => user.id !== userId);
        setUsers(newUsers);
    }


    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog
                as="div"
                className="fixed inset-0 z-20 overflow-y-auto"
                onClose={() => setIsOpen(false)}
            >
                <Transition.Child
                    as={Fragment}
                    enter="transition-opacity ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
                </Transition.Child>

                <Transition.Child
                    as={Fragment}
                    enter="transition-transform ease-in-out duration-300"
                    enterFrom="transform scale-95"
                    enterTo="transform scale-100"
                    leave="transition-transform ease-in-out duration-300"
                    leaveFrom="transform scale-100"
                    leaveTo="transform scale-95"
                >
                    <div className="flex justify-center items-center h-screen">
                        <div className="rounded-lg bg-highlight text-white h-[600px] w-82 md:w-[500px] p-4 shadow-lg z-50 absolute my-3">
                            <button
                                type="button"
                                className="absolute top-0 right-0 m-2 text-white hover:text-slate-200"
                                onClick={() => setIsOpen(false)}
                            >
                                <img src="close-icon.svg" className="w-6 transition-all ease-in-out duration-300 hover:w-7" alt="" />
                            </button>
                            <h2 className="text-xl font-semibold mb-5">Crear un grupo</h2>

                            <div>
                                <label htmlFor="name" className="block mb-2">Nombre del grupo</label>
                                <input 
                                    type="text"
                                    id="name" 
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full p-2 mb-4 rounded-md text-black" />
                            </div>

                            <form onSubmit={handleSearchUserToAdd} >
                                <label htmlFor="email" className="block mb-2">Email</label>
                                <input
                                    type="text"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-7/12 mr-5 p-2 mb-4 rounded-md text-black"
                                    placeholder="Busca un usuario"
                                />
                                <button
                                    type="submit"
                                    className="w-4/12 p-2 rounded-md bg-focus text-white hover:bg-slate-200 transition-all ease-in-out duration-300"
                                > Agregar </button>
                            </form>

                            <h2 className="text-lg mt-3 font-bold">Usuarios del grupo</h2>

                            <section className="flex flex-col gap-2 mt-2 h-[240px] overflow-y-scroll">
                                { users.length === 0 && <p>No hay usuarios en el grupo</p> }
                                { users.length !== 0 && users.map((user) => {
                                    if(user.id === auth.id) return;
                                    return ( <article id={user.id} key={user.id} className="flex items-center justify-between bg-focus p-4 rounded-md">
                                                <div className="w-11/12 flex justify-start items-center">
                                                    <img className="w-12 h-12 mr-2 md:mr-8 rounded-full object-cover" src={user.avatar} alt="" />
                                                    <div className="w-7/12 inline-block">
                                                        <p>{user.name}</p>
                                                        <p>{user.email}</p>
                                                    </div>
                                                </div>
                                                <button
                                                    className="ml-2 w-1/12"
                                                    type="button"
                                                    onClick={handleRemoveUserFromGroup}
                                                >
                                                    <img src="close-icon.svg" className="w-5 transition-all ease-in-out duration-300 hover:w-6" alt="" />
                                                </button>
                                            </article>
                                )})}
                            </section>

                            <button
                                type="button"
                                onClick={handleCreateGroupChat}
                                className="w-full p-2 mt-4 rounded-md bg-focus text-white hover:bg-slate-200 transition-all ease-in-out duration-300"
                            >Crear</button>

                        </div>
                    </div>
                </Transition.Child>
            </Dialog>
        </Transition.Root>
    );
}

export default CreateGroupChatModal;