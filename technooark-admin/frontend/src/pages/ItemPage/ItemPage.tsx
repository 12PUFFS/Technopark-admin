import { useSearchParams, useNavigate } from 'react-router-dom';
import backBtn from '../../assets/back-btn.svg';
import Header from '../../components/Header/Header';

export default function ItemPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const url = searchParams.get('url');
  const lastmod = searchParams.get('lastmod');

  const goBack = () => navigate(-1);

  return (
    <div className="container">
      <header className="header">
        <a onClick={goBack} className="back-btn" href="">
          <img src={backBtn} alt="" />
          Назад
        </a>
      </header>
      <main className="main content">
        <h1>Детальная страница</h1>
        <p>
          <strong>URL:</strong> {url}
        </p>
        <p>
          <strong>Дата изменения:</strong> {lastmod}
        </p>
        {/* Здесь ты можешь добавить загрузку контента по этому URL */}
      </main>
    </div>
  );
}
