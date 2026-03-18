import { Link } from 'react-router-dom';
import './Header.css';
import SpbLogo from '../../assets/SPB-Logo.svg';
import TechnoLogo from '../../assets/Logo_TechnoparkSPb-ru_2020 1.svg';

export default function Header() {
  return (
    <div className="container">
      <header className="header">
        <a href="/" className="header_logo__link">
          <img
            className="header_logo__img"
            src={SpbLogo}
            alt="Герб Санкт-Петербурга"
          />

          {/* <img
            className="header_logo__img techno"
            src={TechnoLogo}
            alt="Лого Текнопарка"
          /> */}
        </a>
        <ul className="header__list">
          <li className="header__list__item">
            <Link to="/login">Вход</Link>
          </li>
          <li className="header__list__item">
            <Link to="/register">Регистрация</Link>
          </li>
        </ul>
      </header>
    </div>
  );
}
