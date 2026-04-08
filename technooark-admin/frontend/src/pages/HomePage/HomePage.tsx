import { useContext } from 'react';
import { statesAndData } from '../../App';

// import { useEffect, useState } from 'react';

export default function HomePage({ text, setText, filteredText }) {
  const { urls, loading, visibleItems, allUrls, filteredUrls } =
    useContext(statesAndData);

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
          <div className="skeleton link"></div>
          <div className="skeleton link"></div>
          <div className="skeleton link"></div>
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
