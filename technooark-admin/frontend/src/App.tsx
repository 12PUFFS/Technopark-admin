// @ts-nocheck

import './App.css';
import { useState, createContext, useEffect } from 'react';
import Header from './components/Header/Header';

type SitemapItem = {
  loc: string;
  lastmod: string;
};

type AppContextType = {
  urls: SitemapItem[];
  loading: boolean;
  visibleItems: number;
  setVisibleItems: React.Dispatch<React.SetStateAction<number>>;
  allUrls: SitemapItem[];
  filteredUrls: SitemapItem[];
  setFilteredUrls: React.Dispatch<React.SetStateAction<SitemapItem[]>>;
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  filterText: (text: string) => void;
  categories: string[];
  // correctDate: (lastmod: string) => string;
};

export const statesAndData = createContext<AppContextType | null>(null);
function App() {
  const [urls, setUrls] = useState<SitemapItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleItems, setVisibleItems] = useState(8);
  const [allUrls, setAllUrls] = useState<SitemapItem[]>([]);
  const [filteredUrls, setFilteredUrls] = useState<SitemapItem[]>([]);
  const [text, setText] = useState('');

  const categories = [
    'Все услуги',
    // 'IT и цифровые технологии',
    // 'Производство и инженерия',
    // 'Химия и материаловедение',
    // 'Энергетика и ресурсосбережение',
    // 'Биотехнологии и медицина',
    // 'Транспорт и логистика',
    // 'Агропром и пищевая промышленность',
    // 'Строительство и урбанистика',
    'Технопарк',
    'Cтартапы',
    'Резиденты',
    'Гранты',
    'Обратный инжинринг',
    'БПЛА',
  ];

  const correctDate = (lastmod: string) => {
    if (!lastmod) {
      return 'Нет даты';
    }
    const yearDate = lastmod.slice(0, 10);
    const dayDate = lastmod.slice(11, 16);
    return `${yearDate} ${dayDate}`;
  };

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
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const filterText = (text) => {
    if (!text.trim() || text === 'Все услуги') {
      setFilteredUrls(allUrls);
      return;
    }

    const result = allUrls.filter((i) => {
      return i.loc.toLowerCase().includes(text.toLowerCase());
    });
    setFilteredUrls(result);
  };

  return (
    <statesAndData.Provider
      value={{
        urls,
        loading,
        visibleItems,
        setVisibleItems,
        setFilteredUrls,
        allUrls,
        filteredUrls,
        text,
        filterText,
        setText,
        categories,
        correctDate,
      }}
    >
      <Header />
    </statesAndData.Provider>
  );
}

export default App;
