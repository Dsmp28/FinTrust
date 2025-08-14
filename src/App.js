import LoginForm from './components/LoginForm';
import './App.css';

function App() {
  const handleLogin = (credentials) => {
    console.log('Login attempt with:', credentials);
  };

  return (
    <div className="App">
      <LoginForm onLogin={handleLogin} />
    </div>
  );
}

export default App;
