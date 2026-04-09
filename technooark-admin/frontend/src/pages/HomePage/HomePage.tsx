// @ts-nocheck
import { useContext, useEffect, useState } from 'react';
import { statesAndData } from '../../App';

// import { useEffect, useState } from 'react';

export default function HomePage() {
  const {
    urls,
    loading,
    visibleItems,
    allUrls,
    text,
    filteredUrls,
    setText,
    setFilteredUrls,
    setVisibleItems,
  } = useContext(statesAndData);

  const [active, setActive] = useState('new');

  const filterByOlder = (filteredUrls) => {
    return [...filteredUrls].sort((a, b) => a.lastmod.localeCompare(b.lastmod));
  };

  const handleBySortOlder = () => {
    const sorted = filterByOlder(filteredUrls);
    setFilteredUrls(sorted);
  };

  const filterByNew = (filteredUrls) => {
    return [...filteredUrls].sort((a, b) => b.lastmod.localeCompare(a.lastmod));
  };

  const handleBySortNew = () => {
    const sortredNew = filterByNew(filteredUrls);
    setFilteredUrls(sortredNew);
  };

  useEffect(() => {
    if (!loading && filteredUrls.length > 0) {
      handleBySortNew();
    }
  }, [loading]);

  if (loading) {
    return (
      <div>
        <div className="finded-wrapper">
          <div className="skeleton finded">Найдено: {filteredUrls.length}</div>
          <div className="filter-by-date">
            <button className="skeleton by-old">сначала старые</button>
            <button className="skeleton by-new">сначала новые</button>
          </div>
        </div>
        <div className="skeleton-wrapper">
          <ul className="link-ul">
            {[...Array(visibleItems)].map((_, index) => (
              <li key={index} className="skeleton link">
                <div className="link-link"></div>
                <small></small>
              </li>
            ))}
          </ul>
        </div>
        <div className="btn-wrap">
          <button className="skeleton more">Загрузить ещё</button>
        </div>
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
          <button
            onClick={() => {
              handleBySortOlder();
              setActive('old');
            }}
            className={`by-old ${active === 'old' ? 'active' : ''}`}
          >
            сначала старые
          </button>
          <button
            onClick={() => {
              handleBySortNew();
              setActive('new');
            }}
            className={`by-new ${active === 'new' ? 'active' : ''}`}
          >
            сначала новые
          </button>
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
            {visibleItems < filteredUrls.length && (
              <div className="btn-wrap">
                <button
                  onClick={() => setVisibleItems((prev) => prev + 8)}
                  className="more"
                >
                  Загрузить ещё
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
