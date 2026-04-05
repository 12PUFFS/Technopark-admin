import './Header.css';
// import SpbLogo from '../../assets/SPB-Logo.svg';
import backBtn from '../../assets/back-btn.svg';
// import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
// import Modal from '../Modal/Modal';
import ReachIcon from '../../assets/search.svg';
import HomePage from '../../pages/HomePage/HomePage';

export default function Header() {
  const [inputFocus, setInputFocus] = useState(false);
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

  const [text, setText] = useState('');

  const categories = [
    'Все услуги',
    'IT и цифровые технологии',
    'Производство и инженерия',
    'Химия и материаловедение',
    'Энергетика и ресурсосбережение',
    'Биотехнологии и медицина',
    'Транспорт и логистика',
    'Агропром и пищевая промышленность',
    'Строительство и урбанистика',
  ];
  const [active, setActive] = useState(categories[0]);

  // const navigate = useNavigate();
  // const goBack = () => navigate(-1);

  return (
    <div className="container">
      <header className="header">
        <a className="back-btn" href="https://spbtech.ru/" target="_blank">
          <img src={backBtn} alt="" />
          Назад
        </a>
      </header>
      <div className="search-container">
        <div className="title">
          <h1>ПОИСК ПО САЙТУ</h1>
        </div>
        <div className="shadow-box">
          <div className={`input-wrapper ${inputFocus ? 'focused' : ''}`}>
            <div className="search-wrapper">
              <img className="search" src={ReachIcon} alt="" />
            </div>
            <input
              onFocus={() => setInputFocus(true)}
              onBlur={() => setInputFocus(false)}
              value={text}
              onChange={(e) => {
                setActive('');
                setText(e.target.value);
              }}
              onClick={() => setText('')}
              placeholder="Поиск"
              type="text"
            />
            <button className="input-bnt">Поиск</button>
          </div>
          <ul className="category">
            {categories.map((item, index) => {
              return (
                <li
                  onClick={() => {
                    setActive(item);
                    setText(item);
                  }}
                  key={index}
                  className={`category-item ${active === item ? 'active' : ''}`}
                >
                  {item}
                </li>
              );
            })}
          </ul>
        </div>
        {/* {modal && <Modal />} */}
        <HomePage />
      </div>
    </div>
  );
}
