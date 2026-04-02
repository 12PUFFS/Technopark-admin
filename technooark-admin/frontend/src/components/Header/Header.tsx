import './Header.css';
// import SpbLogo from '../../assets/SPB-Logo.svg';
import backBtn from '../../assets/back-btn.svg';
import { useNavigate } from 'react-router-dom';
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

  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  return (
    <>
      <header className="header">
        <a onClick={goBack} className="back-btn" href="">
          <img src={backBtn} alt="" />
          Назад
        </a>
      </header>
      <div className="search-container">
        <div className="title">
          <h1>ПОИСК ПО САЙТУ</h1>
        </div>
        <div className="input-wrapper">
          <div className="search-wrapper">
            <img className="search" src={ReachIcon} alt="" />
          </div>
          <input placeholder="Поиск" type="text" />
          <button className="input-bnt">Поиск</button>
        </div>
        <ul className="category">
          <li className="category-item">IT и цифровые технологии</li>
          <li className="category-item">Производство и инженерия</li>
          <li className="category-item">Химия и материаловедение</li>
          <li className="category-item">Энергетика и ресурсосбережение</li>
          <li className="category-item">Биотехнологии и медицина</li>
          <li className="category-item">Транспорт и логистика</li>
          <li className="category-item active">
            Агропром и пищевая промышленность
          </li>
          <li className="category-item">Строительство и урбанистика</li>
        </ul>
      </div>
    </>
  );
}
