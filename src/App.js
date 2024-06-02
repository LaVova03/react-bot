import { useEffect } from 'react';
import './App.css';
import { useTelegramHook } from './hooks/useTelegramHook';
import Header from './components/Header/Header';

const App = () => {
  const { onToggleButton, tg } = useTelegramHook();

  useEffect(() => {
    if (tg) {
      tg.ready();
    }
  }, [tg]);

  return (
    <div className="App">
      <Header />
      <button onClick={onToggleButton}>Toggle</button>
    </div>
  );
}

export default App;
