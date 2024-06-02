import { useEffect } from 'react';
import './App.css';
import { useTelegramHook } from './hooks/useTelegramHook';

const App = () => {
  const { onToggleButton, tg } = useTelegramHook();

  useEffect(() => {
    if (tg) {
      tg.ready();
    }
  }, [tg]);

  return (
    <div className="App">
      <button onClick={onToggleButton}>Toggle</button>
    </div>
  );
}

export default App;
