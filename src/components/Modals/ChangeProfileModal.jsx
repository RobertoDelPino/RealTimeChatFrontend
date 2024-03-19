import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

const ChangeProfileModal = ({ isOpen, setIsOpen }) => {
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
                        <div className="bg-white p-4 rounded shadow-lg z-50 relative">
                            <button
                                type="button"
                                className="absolute top-0 right-0 m-2 text-gray-600 hover:text-gray-800"
                                onClick={() => setIsOpen(false)}
                            >
                                X
                            </button>
                            {/* Your modal content goes here */}
                            <h2>Change Profile</h2>
                            <p>Modal content goes here...</p>
                        </div>
                    </div>
                </Transition.Child>
            </Dialog>
        </Transition.Root>
    );
}

export default ChangeProfileModal