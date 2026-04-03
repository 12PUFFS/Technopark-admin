import { useEffect, useState } from 'react';

import Header from '../../components/Header/Header';
import { Link } from 'react-router-dom';

export default function HomePage() {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('sitemap-store.xml')
      .then((response) => response.text())
      .then((xmlString) => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
        const urlElements = xmlDoc.querySelectorAll('url');

        const sitemapData = Array.from(urlElements).map((url) => ({
          loc: url.querySelector('loc')?.textContent || '',
          lastmod: url.querySelector('lastmod')?.textContent || '',
        }));

        setUrls(sitemapData);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Ошибка парсинга XML:', error);
        setLoading(false);
      });
  }, []);

  // const navigate = useNavigate();
  // const goBack = () => navigate(-1);

  if (loading) return <div>Загрузка...</div>;
  return (
    <div>
      <div>
        {/* {<h1>результат поиска</h1>} */}
        <ul className="link-ul">
          {urls.slice(0, 8).map((item, index) => (
            <Link
              to={`/item?url=${encodeURIComponent(item.loc)}&lastmod=${item.lastmod}`}
              key={index}
              style={{ textDecoration: 'none', display: 'block' }}
            >
              <li className="link">
                <div className="link-link">{item.loc}</div>
                <small>{item.lastmod}</small>
              </li>
            </Link>
          ))}
        </ul>
        <div className="btn-wrap">
          <button className="more">Загрузить ещё</button>
        </div>
      </div>
    </div>
  );
}
