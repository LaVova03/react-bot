import { useEffect } from 'react';
import './App.css';
import UseTelegram  from './hooks/usetelegram';

const App = () => {

  const { onToggleButton, tg } = UseTelegram;

  useEffect(() => {
    if (tg) {
      tg.ready()
    }
  }, [])

  return (
    <div className="App">
      <button onClick={onToggleButton}>toggle</button>
    </div>
  );
}

export default App;
