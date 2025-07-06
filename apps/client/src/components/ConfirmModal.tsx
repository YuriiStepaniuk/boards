import Modal from './Modal';

interface ConfirmModalProps {
  id: number;
  message: string;
  onConfirm: (id: number) => void;
  onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  id,
  message,
  onConfirm,
  onCancel,
}) => {
  return (
    <Modal onClose={onCancel}>
      <div className="p-4">
        <p className="mb-6">{message}</p>
        <div className="flex justify-between space-x-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(id)}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Yes
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
