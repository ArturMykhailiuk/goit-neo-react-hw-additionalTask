import css from "./Modal.module.css";

const Modal = ({ isOpen, onClose, onConfirm, children }) => {
  if (!isOpen) return null;

  return (
    <div className={css.overlay}>
      <div className={css.modal}>
        <div className={css.content}>{children}</div>
        <div className={css.actions}>
          <button onClick={onConfirm} className={css.modalBtn}>
            Confirm
          </button>
          <button onClick={onClose} className={css.modalBtn}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
