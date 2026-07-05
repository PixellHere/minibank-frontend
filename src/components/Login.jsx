import { useState } from 'react';

export default function Login({ onLoginSuccess, onSwitchToRegister }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('http://localhost:8080/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('jwt_token', data.token);
                onLoginSuccess(); // Informujemy App.jsx, że się udało!
            } else {
                setError('Nieprawidłowy email lub hasło.');
            }
        } catch (err) {
            console.error("Szczegóły błędu sieci:", err);
            setError('Błąd połączenia z serwerem.');
        }
    };

    return (
        <div className="bg-surface text-on-surface antialiased min-h-screen flex flex-col">
            <header className="fixed top-0 w-full z-50 bg-transparent flex justify-center py-12">
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-primary-container rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                        <span className="material-symbols-outlined text-white" style={{ fontVariationSettings: "'FILL' 1" }}>account_balance_wallet</span>
                    </div>
                    <span className="text-2xl font-black text-on-surface tracking-tighter uppercase">Vault</span>
                </div>
            </header>

            <main className="flex-grow flex items-center justify-center px-6 pt-24 pb-12">
                <div className="w-full max-w-md">
                    <div className="text-center mb-10">
                        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-on-surface mb-3">Welcome back.</h1>
                        <p className="text-on-surface-variant font-medium">Access your digital atelier and manage your wealth.</p>
                    </div>

                    <div className="bg-surface-container-lowest p-8 md:p-10 rounded-[2.5rem] shadow-[0_32px_64px_-12px_rgba(25,28,30,0.04)]">
                        <form className="space-y-6" onSubmit={handleLogin}>

                            <div className="space-y-2">
                                <label className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant ml-1">Email Address</label>
                                <div className="relative group">
                                    <input
                                        className="w-full h-14 px-6 bg-surface-container-low border-none rounded-2xl text-on-surface font-medium placeholder:text-outline/50 focus:ring-2 focus:ring-primary/10 focus:bg-surface-container-lowest transition-all duration-300"
                                        placeholder="name@example.com"
                                        type="text"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center px-1">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Password</label>
                                </div>
                                <div className="relative group">
                                    <input
                                        className="w-full h-14 px-6 bg-surface-container-low border-none rounded-2xl text-on-surface font-medium placeholder:text-outline/50 focus:ring-2 focus:ring-primary/10 focus:bg-surface-container-lowest transition-all duration-300"
                                        placeholder="••••••••"
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <button
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-5 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface transition-colors"
                                        type="button"
                                    >
                                        <span className="material-symbols-outlined text-xl">
                                            {showPassword ? "visibility_off" : "visibility"}
                                        </span>
                                    </button>
                                </div>
                            </div>

                            {/* Wyświetlanie błędu nad przyciskiem */}
                            {error && <p className="text-red-500 text-sm font-bold text-center mt-2">{error}</p>}

                            <button type="submit" className="w-full h-14 bg-gradient-to-br from-primary to-primary-container text-white font-bold rounded-full shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all duration-200 mt-4 flex items-center justify-center gap-2">
                                Log In
                                <span className="material-symbols-outlined text-lg">arrow_forward</span>
                            </button>
                        </form>
                    </div>

                    <div className="mt-12 text-center">
                        <p className="text-on-surface-variant font-medium">
                            New to Vault?
                            <button
                                onClick={onSwitchToRegister}
                                className="text-primary-container font-bold ml-1 hover:underline underline-offset-4 decoration-2"
                            >
                                Sign Up
                            </button>
                        </p>
                    </div>
                </div>
            </main>

            <div className="fixed bottom-0 left-0 w-full h-1/3 -z-10 opacity-30 pointer-events-none overflow-hidden">
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/10 blur-[100px] rounded-full"></div>
                <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary-container/10 blur-[100px] rounded-full"></div>
            </div>

            <footer className="w-full py-12 flex flex-col items-center gap-4 px-8">
                <div className="flex gap-6">
                    <a className="text-xs font-medium text-on-surface-variant hover:text-on-surface transition-colors" href="#">Privacy</a>
                    <a className="text-xs font-medium text-on-surface-variant hover:text-on-surface transition-colors" href="#">Security</a>
                </div>
                <p className="text-xs font-medium text-on-surface-variant opacity-50">© 2024 Vault Digital Atelier.</p>
            </footer>
        </div>
    );
}