
import React, { useState } from 'react';
import { UserRole, User, VerificationStatus } from '../types';

interface AuthProps {
  mode: 'login' | 'register';
  onAuthSuccess: (user: User) => void;
  onSwitchMode: (mode: 'login' | 'register') => void;
}

const Auth: React.FC<AuthProps> = ({ mode, onAuthSuccess, onSwitchMode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<UserRole>(UserRole.DONOR);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Super Admin Logic
    if (email === '1' && password === '1') {
      const adminUser: User = {
        id: 'super-admin-01',
        name: 'Super Admin',
        email: 'admin@innospark.com',
        role: UserRole.ADMIN,
        avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=admin`,
        isVerified: true,
        kycStatus: VerificationStatus.VERIFIED
      };
      onAuthSuccess(adminUser);
      return;
    }

    // Regular Login Check (Mock)
    if (mode === 'login' && email !== '1') {
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        name: 'Member User',
        email: email,
        role: UserRole.DONOR,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
        isVerified: false,
        kycStatus: VerificationStatus.UNVERIFIED
      };
      onAuthSuccess(newUser);
      return;
    }

    // Registration Simulation
    if (mode === 'register') {
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        name: name,
        email: email,
        role: role,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
        isVerified: false,
        kycStatus: VerificationStatus.PENDING
      };
      onAuthSuccess(newUser);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-[2rem] shadow-2xl shadow-slate-200 border border-slate-100 overflow-hidden">
        <div className="bg-emerald-600 p-8 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
          <div className="relative z-10">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/30 shadow-lg">
              <span className="text-3xl font-black italic">IS</span>
            </div>
            <h2 className="text-2xl font-black">{mode === 'login' ? 'Welcome Back' : 'Join InnoSpark'}</h2>
            <p className="text-emerald-100 text-sm mt-2 font-medium opacity-90">
              {mode === 'login' 
                ? 'Sign in to manage your innovation ecosystem' 
                : 'Empowering the next generation of innovators'}
            </p>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          {error && (
            <div className="p-3 bg-red-50 border border-red-100 text-red-600 text-xs font-bold rounded-xl text-center">
              {error}
            </div>
          )}

          {mode === 'register' && (
            <>
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Full Name</label>
                <input 
                  type="text" 
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Budi Inovator"
                  className="w-full px-4 py-3.5 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-medium" 
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Join As</label>
                <div className="grid grid-cols-2 gap-2">
                  {[UserRole.DONOR, UserRole.INNOVATOR, UserRole.VOLUNTEER, UserRole.COLLABORATOR].map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setRole(r)}
                      className={`py-2 px-3 rounded-lg text-[10px] font-black uppercase transition-all border ${
                        role === r 
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-md' 
                          : 'bg-white text-slate-500 border-slate-100 hover:border-emerald-200'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Login / Email</label>
            <input 
              type="text" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Gunakan '1' untuk Admin"
              className="w-full px-4 py-3.5 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-medium" 
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Gunakan '1' untuk Admin"
              className="w-full px-4 py-3.5 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-medium" 
            />
          </div>

          <button 
            type="submit"
            className="w-full py-4 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 shadow-xl shadow-emerald-100 transition-all hover:-translate-y-0.5 active:translate-y-0 mt-4"
          >
            {mode === 'login' ? 'Proceed to Platform' : 'Start My Journey'}
          </button>

          <div className="text-center pt-4">
            <button 
              type="button"
              onClick={() => onSwitchMode(mode === 'login' ? 'register' : 'login')}
              className="text-sm font-bold text-slate-400 hover:text-emerald-600 transition-colors"
            >
              {mode === 'login' ? "New here? Create an account" : "Already have an account? Sign in here"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;
