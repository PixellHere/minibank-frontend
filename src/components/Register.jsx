import { useState } from 'react';
import { register } from '../api/auth';

export default function Register({ onSwitchToLogin }) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [transferTag, setTransferTag] = useState('');
    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Dynamiczne sprawdzanie haseł (tylko jeśli użytkownik zaczął wpisywać drugie hasło)
    const isConfirming = confirmPassword.length > 0;
    const passwordsMatch = password === confirmPassword;

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');

        if (!passwordsMatch) {
            setError('Hasła nie są identyczne!');
            return;
        }

        setIsLoading(true);
        try {
            await register({ email, password, firstName, lastName, transferTag, phoneNumber });
            setSuccess(true);
        } catch (err) {
            setError(err.message || 'Błąd połączenia z serwerem.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-surface text-on-surface antialiased min-h-screen flex flex-col">
            <header className="fixed top-0 w-full z-50 bg-transparent flex justify-center py-8 md:py-12">
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-primary-container rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                        <span className="material-symbols-outlined text-white" style={{ fontVariationSettings: "'FILL' 1" }}>account_balance_wallet</span>
                    </div>
                    <span className="text-2xl font-black text-on-surface tracking-tighter uppercase">Vault</span>
                </div>
            </header>

            <main className="flex-grow flex items-center justify-center px-4 pt-24 pb-12">
                <div className="w-full max-w-md">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-on-surface mb-3">Join Vault.</h1>
                        <p className="text-on-surface-variant font-medium">Create your digital atelier account.</p>
                    </div>

                    <div className="bg-surface-container-lowest p-6 md:p-10 rounded-[2.5rem] shadow-[0_32px_64px_-12px_rgba(25,28,30,0.04)]">

                        {success ? (
                            <div className="text-center py-8">
                                <span className="material-symbols-outlined text-6xl text-green-500 mb-4">check_circle</span>
                                <h2 className="text-2xl font-bold mb-2">Account Created!</h2>
                                <p className="text-on-surface-variant mb-6">You can now log in to your new account.</p>
                                <button
                                    onClick={onSwitchToLogin}
                                    className="w-full h-14 bg-gradient-to-br from-primary to-primary-container text-white font-bold rounded-full shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
                                >
                                    Go to Login
                                    <span className="material-symbols-outlined text-lg">login</span>
                                </button>
                            </div>
                        ) : (
                            <form className="space-y-4" onSubmit={handleRegister}>

                                <div className="flex gap-4">
                                    <div className="space-y-1 w-1/2">
                                        <label className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant ml-1">First Name</label>
                                        <input
                                            required className="w-full h-14 px-4 bg-surface-container-low border-none rounded-2xl text-on-surface font-medium placeholder:text-outline/50 focus:ring-2 focus:ring-primary/10 transition-all duration-300"
                                            placeholder="John" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-1 w-1/2">
                                        <label className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant ml-1">Last Name</label>
                                        <input
                                            required className="w-full h-14 px-4 bg-surface-container-low border-none rounded-2xl text-on-surface font-medium placeholder:text-outline/50 focus:ring-2 focus:ring-primary/10 transition-all duration-300"
                                            placeholder="Doe" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)}
                                        />
                                    </div>
                                </div>

                                {/* ZMIANA: Telefon w osobnym wierszu */}
                                <div className="space-y-1">
                                    <label className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant ml-1">Phone Number</label>
                                    <input
                                        required className="w-full h-14 px-6 bg-surface-container-low border-none rounded-2xl text-on-surface font-medium placeholder:text-outline/50 focus:ring-2 focus:ring-primary/10 transition-all duration-300"
                                        placeholder="+48 123 456 789" type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}
                                    />
                                </div>

                                {/* ZMIANA: Transfer Tag w osobnym wierszu, pod telefonem */}
                                <div className="space-y-1">
                                    <label className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant ml-1">Transfer Tag</label>
                                    <input
                                        required className="w-full h-14 px-6 bg-surface-container-low border-none rounded-2xl text-on-surface font-medium placeholder:text-outline/50 focus:ring-2 focus:ring-primary/10 transition-all duration-300"
                                        placeholder="e.g. JOHN_01" type="text" value={transferTag} onChange={(e) => setTransferTag(e.target.value.toUpperCase())}
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant ml-1">Email Address</label>
                                    <input
                                        required className="w-full h-14 px-6 bg-surface-container-low border-none rounded-2xl text-on-surface font-medium placeholder:text-outline/50 focus:ring-2 focus:ring-primary/10 transition-all duration-300"
                                        placeholder="name@example.com" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant ml-1">Password</label>
                                    <div className="relative group">
                                        <input
                                            required className="w-full h-14 px-6 bg-surface-container-low border-none rounded-2xl text-on-surface font-medium placeholder:text-outline/50 focus:ring-2 focus:ring-primary/10 transition-all duration-300"
                                            placeholder="••••••••" type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <button
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-5 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface transition-colors" type="button"
                                            aria-label={showPassword ? "Ukryj hasło" : "Pokaż hasło"}
                                        >
                                            <span className="material-symbols-outlined text-xl">{showPassword ? "visibility_off" : "visibility"}</span>
                                        </button>
                                    </div>
                                </div>

                                {/* Potwierdź Hasło z walidacją na żywo */}
                                <div className="space-y-1">
                                    <label className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant ml-1">Confirm Password</label>
                                    <div className="relative group">
                                        <input
                                            required className="w-full h-14 px-6 bg-surface-container-low border-none rounded-2xl text-on-surface font-medium placeholder:text-outline/50 focus:ring-2 focus:ring-primary/10 transition-all duration-300"
                                            placeholder="••••••••" type={showConfirmPassword ? "text" : "password"} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                                        />
                                        <button
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-5 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface transition-colors" type="button"
                                            aria-label={showConfirmPassword ? "Ukryj hasło" : "Pokaż hasło"}
                                        >
                                            <span className="material-symbols-outlined text-xl">{showConfirmPassword ? "visibility_off" : "visibility"}</span>
                                        </button>
                                    </div>
                                    {/* ZMIANA: Komunikat na żywo pod polem */}
                                    {isConfirming && !passwordsMatch && (
                                        <p className="text-red-500 text-xs ml-2 mt-1 font-bold">Passwords do not match</p>
                                    )}
                                    {isConfirming && passwordsMatch && (
                                        <p className="text-green-600 text-xs ml-2 mt-1 font-bold">Passwords match!</p>
                                    )}
                                </div>

                                {error && <p className="text-red-500 text-sm font-bold text-center mt-2">{error}</p>}

                                {/* ZMIANA: Przycisk jest lekko "wyblakły", jeśli hasła się nie zgadzają */}
                                <button
                                    type="submit"
                                    disabled={(isConfirming && !passwordsMatch) || isLoading}
                                    className={`w-full h-14 bg-gradient-to-br from-primary to-primary-container text-white font-bold rounded-full shadow-xl shadow-primary/20 transition-all duration-200 mt-4 flex items-center justify-center gap-2 ${(isConfirming && !passwordsMatch) || isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.02] active:scale-95'}`}
                                >
                                    {isLoading ? "Tworzenie konta..." : "Create Account"}
                                    {!isLoading && <span className="material-symbols-outlined text-lg">person_add</span>}
                                </button>
                            </form>
                        )}
                    </div>

                    <div className="mt-8 text-center relative z-10">
                        <p className="text-on-surface-variant font-medium">
                            Already have an account?
                            <button onClick={onSwitchToLogin} className="text-primary-container font-bold ml-1 hover:underline underline-offset-4 decoration-2">
                                Log In
                            </button>
                        </p>
                    </div>
                </div>
            </main>

            <div className="fixed bottom-0 left-0 w-full h-1/3 -z-10 opacity-30 pointer-events-none overflow-hidden">
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/10 blur-[100px] rounded-full"></div>
                <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary-container/10 blur-[100px] rounded-full"></div>
            </div>
        </div>
    );
}