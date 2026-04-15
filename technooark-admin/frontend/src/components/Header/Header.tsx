// @ts-nocheck
import './Header.css';
import '../../index.css';
import { statesAndData } from '../../App';
import backBtn from '../../assets/back-btn.svg';
import { useContext, useState } from 'react';
// import Modal from '../Modal/Modal';
import ReachIcon from '../../assets/search.svg';
import HomePage from '../../pages/HomePage/HomePage';
import cross from '../../assets/cross.svg';

export default function Header() {
  const {
    loading,
    text,
    setText,
    filteredUrls,
    categories,
    filterText,
    allUrls,
  } = useContext(statesAndData);
  const [inputFocus, setInputFocus] = useState(false);
  // const [modal, setModal] = useState(false);

  const [active, setActive] = useState(categories[0]);

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
                setText(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  filterText(text);
                }
              }}
              onClick={() => {
                if (text === active) {
                  setText('');
                }
              }}
              placeholder={active}
              type="text"
            />
            {text.trim().length > 0 && (
              <div className="trash">
                <img
                  onClick={() => {
                    setText('');
                    filterText('');
                  }}
                  className="trash-img"
                  src={cross}
                  alt=""
                />
              </div>
            )}
            <button onClick={() => filterText(text)} className="input-bnt">
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
                    filterText(item);
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
