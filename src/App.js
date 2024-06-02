import { useEffect } from 'react';
import './App.css';
import useTelegram from './hooks/useTelegram';

const App = () => {

  const { onToggleButton, tg } = useTelegram;

  useEffect(() => {
    if (tg) {
      tg.ready()
    }
  }, [tg])

  return (
    <div className="App">
      <button onClick={onToggleButton}>toggle</button>
    </div>
  );
}

export default App;
