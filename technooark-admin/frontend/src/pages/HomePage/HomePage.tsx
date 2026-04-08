import { use, useEffect, useState } from 'react';

// import Header from '../../components/Header/Header';
// import { Link } from 'react-router-dom';

export default function HomePage({ text, setText, filteredText }) {
  const [urls, setUrls] = useState<SitemapItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleItems, setVisibleItems] = useState(8);

  const [allUrls, setAllUrls] = useState([]);
  const [filteredUrls, setFilteredUrls] = useState([]);

  // const [allUrls, setAllUrls] = useState([])
  // const [filteredUrls, setFilteredUrls] = useState()
  // const []

  interface SitemapItem {
    loc: string;
    lastmod: string;
  }

  // useEffect(() => {
  //   if (allUrls.length > 0) {
  //     const result = filteredText(text, allUrls);
  //     setFilteredUrls(result);
  //   }
  // }, [text, allUrls, filteredText]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetch('https://spbtech.ru/sitemap-store.xml')
        .then((res) => res.text())
        .then((xmlString) => {
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
          const urlElements = xmlDoc.querySelectorAll('url');

          const sitemapData = Array.from(urlElements).map((url) => ({
            loc: url.querySelector('loc')?.textContent || '',
            lastmod: url.querySelector('lastmod')?.textContent || '',
          }));

          setUrls(sitemapData);
          setAllUrls(sitemapData);
          setFilteredUrls(sitemapData);
          setLoading(false);
        })
        .catch((e) => {
          console.error(e);
          setLoading(false);
        });
    }, 300);
  }, []);

  // return <div className="loading"></div>;

  if (loading) {
    return (
      <div className="skeleton-wrapper">
        <div className="skeleton link">rtyui</div>
        <div className="skeleton link">rtyui</div>
        <div className="skeleton link">rtyui</div>
      </div>
    );
  }

  if (urls.length === 0) {
    return <div className="empty">Нет данных</div>;
  }

  return (
    <div>
      <div className="finded-wrapper">
        <div className="finded">Найдено: {filteredUrls.length}</div>
        <div className="filter-by-date">
          <button className="by-old">сначала старые</button>
          <button className="by-new">сначала новые</button>
        </div>
      </div>
      {filteredUrls.length > 0 && (
        <div className="full-list">
          <ul className="link-ul">
            {filteredUrls.slice(0, visibleItems).map((item, index) => (
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
              disabled={visibleItems >= filteredUrls.length}
            >
              Загрузить ещё
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
