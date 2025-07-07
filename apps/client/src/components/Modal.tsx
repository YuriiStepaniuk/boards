import ReactDOM from 'react-dom';

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
  const modalRoot = document.getElementById('modal-root');

  if (!modalRoot) return null;

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      onClick={onClose}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClose();
        }
      }}
    >
      {/* eslint-disable jsx-a11y/no-static-element-interactions */}
      <div
        className="bg-white p-6 rounded shadow-lg relative"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-2 right-2">
          X
        </button>
        {children}
      </div>
    </div>,
    modalRoot,
  );
};

export default Modal;
