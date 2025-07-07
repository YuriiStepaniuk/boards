import ReactDOM from 'react-dom';
import { useEffect, useRef } from 'react';

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
  const modalRoot = document.getElementById('modal-root');
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!modalRoot) return null;

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      role="dialog"
      aria-modal="true"
    >
      <div
        ref={modalRef}
        className="bg-white p-6 rounded shadow-lg relative max-w-[90vw] max-h-[90vh] overflow-auto"
      >
        <button
          ref={closeButtonRef}
          onClick={onClose}
          className="absolute top-2 right-2 p-1 hover:bg-gray-100 rounded"
          aria-label="Close modal"
        >
          ✕
        </button>
        {children}
      </div>
    </div>,
    modalRoot,
  );
};

export default Modal;
