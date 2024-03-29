/* eslint-disable react/prop-types */
import { useState } from 'react';
import CreateGroupChatModal from './Modals/CreateGroupChatModal';

const StartChatComponent = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDivClick = () => {
    setIsOpen(true);
  };

  return (
    <div className='my-3 flex justify-center'>
      <div className='flex items-center'>
        <button onClick={handleDivClick}>Crear Grupo</button>
      </div>

      <CreateGroupChatModal 
        isOpen={isOpen} 
        setIsOpen={setIsOpen} 
        user={user} 
      />
    </div>
  );
};

export default StartChatComponent;