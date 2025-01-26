const Modal = ({ modalRef, title, children, className, onModalclose }) => {
  return (
    <dialog ref={modalRef} className="modal">
      <div className={`modal-box ${className}`}>
        <form method="dialog">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={onModalclose ? onModalclose : () => {}}
          >
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">{title}</h3>
        <form></form>
        {children}
      </div>
    </dialog>
  );
};

export default Modal;
