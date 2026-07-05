import { useState } from 'react'
import Login from './components/Login'
import Register from './components/Register'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return !!localStorage.getItem('jwt_token');
  })

  // Stan decydujący co pokazać, jeśli NIE jesteśmy zalogowani: 'login' czy 'register'
  const [currentView, setCurrentView] = useState('login')

  const handleLogout = () => {
    localStorage.removeItem('jwt_token')
    setIsLoggedIn(false)
    setCurrentView('login') // Po wylogowaniu wracamy do ekranu logowania
  }

  // WIDOK: Zalogowany (Tutaj później dodamy Dashboard)
  if (isLoggedIn) {
    return (
        <div style={{ padding: '50px', fontFamily: 'Inter, sans-serif' }}>
          <h2>Zalogowano pomyślnie!</h2>
          <button onClick={handleLogout} style={{ padding: '10px', background: 'red', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Wyloguj się
          </button>
        </div>
    )
  }

  // WIDOK: Ekran Rejestracji
  if (currentView === 'register') {
    return <Register onSwitchToLogin={() => setCurrentView('login')} />
  }

  // WIDOK: Ekran Logowania (Domyślny)
  return (
      <Login
          onLoginSuccess={() => setIsLoggedIn(true)}
          onSwitchToRegister={() => setCurrentView('register')}
      />
  )
}

export default App