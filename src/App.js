import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [tg, setTg] = useState(null);

  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      setTg(window.Telegram.WebApp);
    }
  }, []);

  const onClose = () => {
    if (tg) {
      tg.close();
    }
  };

  return (
    <div className="App">
      work
      <button onClick={onClose}>Закрыть</button>
    </div>
  );
}

export default App;
