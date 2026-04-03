import { useEffect, useState } from 'react';

// import Header from '../../components/Header/Header';
// import { Link } from 'react-router-dom';

export default function HomePage() {
  const [urls, setUrls] = useState<SitemapItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleItems, setVisibleItems] = useState(8);

  interface SitemapItem {
    loc: string;
    lastmod: string;
  }

  useEffect(() => {
    // Используем прокси для обхода CORS
    const proxyUrl = 'https://thingproxy.freeboard.io/fetch/';
    fetch(`${proxyUrl}https://spbtech.ru/sitemap.xml`)
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

  if (loading) return <div className="loading"></div>;
  return (
    <div>
      <div>
        <ul className="link-ul">
          {urls.slice(0, visibleItems).map((item, index) => (
            <a
              href={item.loc}
              target="_blank"
              rel="noopener noreferrer"
              key={index}
              style={{ textDecoration: 'none', display: 'block' }}
            >
              <li className="link">
                <div className="link-link">{item.loc}</div>
                <small>{item.lastmod}</small>
              </li>
            </a>
          ))}
        </ul>
        <div className="btn-wrap">
          <button
            onClick={() => setVisibleItems((prev) => prev + 8)}
            className="more"
            disabled={visibleItems >= urls.length}
          >
            Загрузить ещё
          </button>
        </div>
      </div>
    </div>
  );
}
