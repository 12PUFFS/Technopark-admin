import './Header.css';
import SpbLogo from '../../assets/SPB-Logo.svg';
import { useState } from 'react';
import Modal from '../Modal/Modal';

export default function Header() {
  const [modal, setModal] = useState(false);
  return (
    <header className="header">
      <a href="/" className="header_logo__link">
        <img
          className="header_logo__img"
          src={SpbLogo}
          alt="Герб Санкт-Петербурга"
        />
      </a>
      <ul className="header__list">
        <li onClick={() => setModal(true)} className="header__list__item">
          Вход
        </li>
      </ul>
      {modal === true && <Modal modalDefault={modal} modalState={setModal} />}
    </header>
  );
}
