import './Modal.css';

export default function Modal({ modalDefault, modalState }) {
  return (
    modalDefault && (
      <div onClick={() => modalState(false)} className="modal-wrapper">
        <div onClick={(e) => e.stopPropagation()} className="modal">
          <div className="modal-input">
            <input placeholder="Введите код доступа MAX" type="text" />
          </div>
          <button
            onClick={() => {
              modalState(false);
              alert('код доступа подтверждён!');
            }}
            className="modal-btn"
          >
            Подтвердить код
          </button>
        </div>
      </div>
    )
  );
}
