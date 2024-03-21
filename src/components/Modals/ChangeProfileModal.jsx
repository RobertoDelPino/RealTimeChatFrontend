import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef, useState } from "react";

const ChangeProfileModal = ({ isOpen, setIsOpen, user, avatar }) => {
    const [newAvatar, setAvatar] = useState(avatar);
    const [name, setName] = useState(user.name);
    const [password, setPassword] = useState("");

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
        };
        reader.readAsDataURL(file);
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
                        <div className="rounded-lg bg-highlight text-white h-96 w-96 md:h-[450px] md:w-[450px] p-4 shadow-lg z-50 relative">
                            <button
                                type="button"
                                className="absolute top-0 right-0 m-2 text-white hover:text-slate-200"
                                onClick={() => setIsOpen(false)}
                            >
                                X
                            </button>
                            <h2 className="text-xl font-semibold mb-5">Actualizar Perfil</h2>

                            <div className="flex mb-5">
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
                                    className="w-24 h-24 rounded-full object-cover bg-slate-600"
                                />
                            </div>

                            <button className="text-center w-full p-2 bg-background hover:bg-focus rounded-md">
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