import { useState } from 'react';
import Modal from './common/Modal.jsx';

const options = ['avatar1.png', 'avatar2.png', 'avatar3.png'];

const AvatarPicker = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="text-center">
      <img
        src={`/avatars/${value}`}
        alt="Avatar"
        className="w-24 h-24 rounded-full object-cover mx-auto"
      />
      <button
        type="button"
        className="text-sm text-blue-400 underline mt-2"
        onClick={() => setOpen(true)}
      >
        Change
      </button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="grid grid-cols-3 gap-2">
          {options.map((opt) => (
            <img
              key={opt}
              src={`/avatars/${opt}`}
              alt={opt}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className={`w-16 h-16 rounded-full cursor-pointer border ${
                value === opt ? 'border-blue-500' : 'border-transparent'
              }`}
            />
          ))}
        </div>
      </Modal>
    </div>
  );
};

export default AvatarPicker;
