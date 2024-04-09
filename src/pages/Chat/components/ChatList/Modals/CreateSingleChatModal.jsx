import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { notify } from "@helpers/notify";
import useAuth from "@hooks/useAuth";
import useChat from "@hooks/useChat";

const CreateSingleChatModal = ({ isOpen, setIsOpen}) => {
    const { searchUserByEmail, getProfilePhoto, auth } = useAuth();
    const { createChat } = useChat();
    const [ users, setUsers ] = useState([]);
    const [ email, setEmail ] = useState("");

    useEffect(() => {
        setTimeout(() => {
            setEmail("");
            setUsers([]);
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

        if(users.find(u => u.email === email)){
            notify("No se puede volver a añadir al mismo usuario", "error");
            return;
        }
        
        const user = await searchUserByEmail(email);
        if(!user){
            notify("No se encontró el usuario", "error");
            return;
        }
        const userAvatar = await getProfilePhoto(user.id);
        user.avatar = userAvatar;
        setUsers([...users, user]);
        setEmail("");
    }

    const handleCreateChat = async () => {
        const finalUsers = [...users, {id: auth._id, name: auth.name, email: auth.email, avatar: auth.avatar}];
        if(finalUsers.length <= 1){
            notify("Para crear un chat debe de haber 2 personas como mínimo", "error");
            return;
        }

        const result = await createChat(
            {
                chatName: "",
                users: finalUsers.map(user => user.id)
            }
        );

        if(result?.error){
            notify(result.error, "error");
            return;
        }

        setIsOpen(false);
    }

    const handleSelectedUser = (e) => {
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
                    <div className="flex justify-center md:items-center md:h-screen">
                        <div className="rounded-lg bg-highlight text-white h-[400px] w-96 md:w-[500px] p-4 shadow-lg z-50 absolute my-3">
                            <button
                                type="button"
                                className="absolute top-0 right-0 m-2 text-white hover:text-slate-200"
                                onClick={() => setIsOpen(false)}
                            >
                                <img src="close-icon.svg" className="w-6 transition-all ease-in-out duration-300 hover:w-7" alt="" />
                            </button>
                            <h2 className="text-xl font-semibold mb-5">Comenzar un nuevo chat</h2>

                            <form onSubmit={handleSearchUserToAdd} >
                                <label htmlFor="email" className="block mb-2">Email</label>
                                <input
                                    type="text"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-9/12 mr-5 p-2 mb-4 rounded-md text-black"
                                    placeholder="Busca un usuario por email"
                                />
                                <button
                                    type="submit"
                                    className="w-2/12 p-2 rounded-md bg-focus text-white hover:bg-slate-200 transition-all ease-in-out duration-300"
                                > Agregar </button>
                            </form>

                            <section className="flex flex-col gap-2 mt-2 overflow-y-scroll">
                                { users.length === 0 && <p>Debes seleccionar un usuario para comenzar</p> }
                                { users.length !== 0 && users.map((user) => {
                                    if(user.id === auth.id) return;
                                    return ( <article id={user.id} key={user.id} className="flex items-center justify-between bg-focus p-4 rounded-md">
                                                <div className="w-11/12 flex justify-start items-center">
                                                    <img className="w-16 h-16 mr-8 rounded-full object-cover" src={user.avatar} alt="" />
                                                    <div className="w-8/12 inline-block">
                                                        <p>{user.name}</p>
                                                        <p>{user.email}</p>
                                                    </div>
                                                </div>
                                                <button
                                                    className="w-1/12"
                                                    type="button"
                                                    onClick={handleSelectedUser}
                                                >
                                                    <img src="close-icon.svg" className="w-6 transition-all ease-in-out duration-300 hover:w-7" alt="" />
                                                </button>
                                            </article>
                                )})}
                            </section>

                            <button
                                type="button"
                                onClick={handleCreateChat}
                                className="w-full p-2 mt-4 rounded-md bg-focus text-white hover:bg-slate-200 transition-all ease-in-out duration-300"
                            >Crear</button>

                        </div>
                    </div>
                </Transition.Child>
            </Dialog>
        </Transition.Root>
    );
}

export default CreateSingleChatModal;