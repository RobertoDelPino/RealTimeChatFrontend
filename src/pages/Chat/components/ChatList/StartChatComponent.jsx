/* eslint-disable react/prop-types */
import { useState } from 'react';
import CreateGroupChatModal from './Modals/CreateGroupChatModal';
import CreateSingleChatModal from './Modals/CreateSingleChatModal';

const StartChatComponent = ({ user }) => {
  const [isCreateGroupModalOpen, setIsCreateGroupModalOpen] = useState(false);
  const [isCreateSingleChatModalOpen, setIsCreateSingleChatModalOpen] = useState(false);

  const handleCreateGroup = () => {
    setIsCreateGroupModalOpen(true);
  };

  const handleStartSingleChat = () => {
    setIsCreateSingleChatModalOpen(true);
  };

  return (
    <div className='mt-3 flex justify-center'>
      <div className='flex items-center'>
        <button className='mr-10 border border-white p-2 hover:bg-highlight' onClick={handleStartSingleChat}>Empezar chat</button>
        <button className='mr-10 border border-white p-2 hover:bg-highlight' onClick={handleCreateGroup}>Crear Grupo</button>
      </div>

      <CreateGroupChatModal 
        isOpen={isCreateGroupModalOpen} 
        setIsOpen={setIsCreateGroupModalOpen} 
        user={user} 
      />

      <CreateSingleChatModal
       isOpen={isCreateSingleChatModalOpen}
       setIsOpen={setIsCreateSingleChatModalOpen} 
       user={user} 
      />
    </div>
  );
};

export default StartChatComponent;