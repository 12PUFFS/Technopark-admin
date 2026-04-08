// @ts-nocheck
import './Header.css';
import '../../index.css';
import { statesAndData } from '../../App';
import backBtn from '../../assets/back-btn.svg';

import { useContext, useState } from 'react';
// import Modal from '../Modal/Modal';
import ReachIcon from '../../assets/search.svg';
import HomePage from '../../pages/HomePage/HomePage';

export default function Header() {
  const { loading, performSearch } = useContext(statesAndData);
  const [inputFocus, setInputFocus] = useState(false);
  // const [modal, setModal] = useState(false);
  // const [userState, setUserState] = useState(null);

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

  // if (loading === false) {
  //   return (
  //     <ul className="category">
  //       {categories.map((item, index) => {
  //         return (
  //           <li
  //             onClick={() => {
  //               setActive(item);
  //               setText(item);
  //             }}
  //             key={index}
  //             className={`skeleton category-item ${active === item ? 'active' : ''}`}
  //           >
  //             {item}
  //           </li>
  //         );
  //       })}
  //     </ul>
  //   );
  // }

  const { text, setText } = useContext(statesAndData);

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
            <button onClick={() => performSearch()} className="input-bnt">
              Поиск
            </button>
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
                  className={`${loading ? 'skeleton' : ''} category-item ${active === item ? 'active' : ''}`}
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
