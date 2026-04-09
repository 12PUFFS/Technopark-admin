import './App.css';
import { useState, createContext, useEffect } from 'react';
import Header from './components/Header/Header';

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
};

export const statesAndData = createContext<AppContextType | null>(null);
function App() {
  const [urls, setUrls] = useState<SitemapItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleItems, setVisibleItems] = useState(8);
  const [allUrls, setAllUrls] = useState([]);
  const [filteredUrls, setFilteredUrls] = useState([]);
  const [text, setText] = useState('');

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
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const filterText = (text) => {
    if (!text.trim()) {
      setFilteredUrls(allUrls);
      return;
    }

    const result = allUrls.filter((i) => {
      i.loc.toLowerCase().includes(text.toLowerCase());
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
      }}
    >
      <Header />
    </statesAndData.Provider>
  );
}

export default App;
