import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { notify } from "@helpers/notify";
import useAuth from "@hooks/useAuth";
import useChat from "@hooks/useChat";

const CreateGroupChatModal = ({ isOpen, setIsOpen}) => {
    const { searchUserByEmail, getProfilePhoto } = useAuth();
    const { createGroupChat } = useChat();
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

        if(users.length <= 2){
            notify("Para crear un grupo debe de haber 3 personas como mínimo", "error");
            return;
        }

        if(name === ""){
            notify("El nombre del grupo no puede estar vacío", "error");
            return;
        }

        const result = await createGroupChat(
            {
                chatName: name,
                users: users.map(user => user.id)
            }
        );
        console.log(result)

        setIsOpen(false);
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
                    <div className="flex items-center justify-center h-screen">
                        <div className="rounded-lg bg-highlight text-white h-[800px] w-96 md:w-[500px] p-4 shadow-lg z-50 relative">
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
                                    className="w-9/12 mr-5 p-2 mb-4 rounded-md text-black"
                                    placeholder="Busca un usuario por email"
                                />
                                <button
                                    type="submit"
                                    className="w-2/12 p-2 rounded-md bg-focus text-white hover:bg-slate-200 transition-all ease-in-out duration-300"
                                > Agregar </button>
                            </form>

                            <h2 className="text-lg mt-3 font-bold">Usuarios del grupo</h2>

                            <section className="flex flex-col gap-2 mt-2">
                                { users.length === 0 && <p>No hay usuarios en el grupo</p> }
                                { users.length !== 0 && users.map((user) => (
                                    <article key={user.id} className="flex items-center justify-between bg-focus p-4 rounded-md">
                                        <p>{user.email}</p>
                                        <p>{user.name}</p>
                                        <p> <img src={user.avatar} alt="" /> </p>
                                        <button
                                            type="button"
                                            onClick={() => notify("No se puede agregar a un usuario ya existente en el grupo", "error")}
                                        >
                                            <div className="h-5 w-5 hover:text-xl">X</div>
                                        </button>
                                    </article>
                                ))}
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