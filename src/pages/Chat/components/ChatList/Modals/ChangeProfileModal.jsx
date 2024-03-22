import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import useAuth from "@hooks/useAuth";
import { notify } from "@helpers/notify";

const ChangeProfileModal = ({ isOpen, setIsOpen, user, avatar }) => {
    const { updateProfile } = useAuth();
    const [newAvatar, setAvatar] = useState(avatar);
    const [avatarFile, setAvatarFile] = useState(null);
    const [name, setName] = useState(user.name);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const fileInputRef = useRef(null);
    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            const imageUrl = reader.result;
            setAvatar(imageUrl);
            setAvatarFile(file);
        };
        reader.readAsDataURL(file);
    }

    const handleSaveButton = async () => {
        if(name === user.name && password === "" && newAvatar === avatar){
            setIsOpen(false);
            return;
        }

        if(name === ""){
            notify("El nombre no puede estar vacío", "error");
            return;
        }

        if(password !== "" && password !== confirmPassword){
            notify("Las contraseñas no coinciden", "error");
            return;
        }

        const data = {
            id: user._id,
            name: name,
            password: password,
            avatar: avatarFile
        };

        const result = await updateProfile(data);
        if(result.status === 200){
            setIsOpen(false);
            notify("Perfil actualizado correctamente", "success");
        };
    }

    useEffect(() => {
        setTimeout(() => {
            setAvatar(avatar);
            setName(user.name);
            setPassword("");
            setConfirmPassword("");
        }, 350);
    }, [user, avatar, isOpen]);

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
                        <div className="rounded-lg bg-highlight text-white h-[500px] w-96 md:w-[450px] p-4 shadow-lg z-50 relative">
                            <button
                                type="button"
                                className="absolute top-0 right-0 m-2 text-white hover:text-slate-200"
                                onClick={() => setIsOpen(false)}
                            >
                                <img src="close-icon.svg" className="w-6 transition-all ease-in-out duration-300 hover:w-7" alt="" />
                            </button>
                            <h2 className="text-xl font-semibold mb-5">Actualizar Perfil</h2>

                            <div className="flex mb-5 items-center">
                                <div className="w-[90%]">
                                    <p className="">Foto de perfil</p>
                                    <p className="text-sm mb-4">Recomendado: 300 x 300</p>
                                    <button
                                        type="button"
                                        onClick={handleButtonClick}
                                        className="p-2 rounded-md border border-gray-300 hover:border-transparent hover:bg-focus hover:text-white transition-all ease-in-out duration-300"
                                    >
                                        Cambiar
                                    </button>
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        className="hidden"
                                        onChange={handleFileChange}
                                    />
                                </div>

                                <img
                                    src={newAvatar}
                                    alt="Foto de perfil"
                                    className="h-20 w-20 rounded-full object-cover bg-slate-600"
                                />
                            </div>

                            <div>
                                <label htmlFor="name" className="block">Nombre</label>
                                <input
                                    type="text"
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full p-2 mb-4 rounded-md text-black"
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="block">Contraseña</label>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full p-2 mb-4 rounded-md text-black"
                                />
                            </div>

                            <div>
                                <label htmlFor="confirmPassword" className="block">Confirmar contraseña</label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full p-2 mb-4 rounded-md text-black"
                                />
                            </div>

                            <button 
                                className="text-center w-full p-2 bg-background hover:bg-focus rounded-md"
                                onClick={handleSaveButton}
                            >
                                Guardar
                            </button>
                        </div>
                    </div>
                </Transition.Child>
            </Dialog>
        </Transition.Root>
    );
}

export default ChangeProfileModal;