import './Header.css';
import SpbLogo from '../../assets/SPB-Logo.svg';
// import { useState } from 'react';
// import Modal from '../Modal/Modal';
import ReachIcon from '../../assets/search.svg';

export default function Header() {
  // const [modal, setModal] = useState(false);
  // const [userState, setUserState] = useState(null);

  // const USER = {
  //   role: {
  //     admin: {
  //       password: '1234',
  //       title: 'Админ',
  //     },
  //     user: {
  //       password: '246',
  //       title: 'Пользователь',
  //     },
  //   },
  // };

  return (
    <header className="header">
      <div className="upper-header">
        <img
          className="header_logo__img"
          src={SpbLogo}
          alt="Герб Санкт-Петербурга"
        />

        <div className="input-wrapper">
          <div className="search-wrapper">
            <img className="search" src={ReachIcon} alt="" />
          </div>
          <input placeholder="Поиск" type="text" />
          <button className="input-bnt">Поиск</button>
        </div>
        {/* <ul className="header__list">
          {userState ? (
            <>
              <li className="header__list__item_role">{userState.title}</li>
              <li onClick={() => setModal(true)} className="header__list__item">
                Сменить
              </li>
            </>
          ) : (
            <li onClick={() => setModal(true)} className="header__list__item">
              Вход
            </li>
          )}
        </ul> */}
        {/* {modal === true && (
          <Modal
            modalDefault={modal}
            modalState={setModal}
            userRole={USER.role}
            onLogin={setUserState}
          />
        )} */}
      </div>
      <div className="lower-header">
        <ul>
          <li>
            <a
              href="https://spbtech.ru/#contract"
              className="header_logo__link"
            >
              Главная
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
