import type { ReactNode } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';

type User = { id: string; email: string; username: string };
type AuthCtx = { user: User | null; loading: boolean; refresh: () => Promise<void>; logout: () => Promise<void> };
const Ctx = createContext<AuthCtx | null>(null);
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user,setUser]=useState<User|null>(null); const [loading,setLoading]=useState(true);
  const refresh=async()=>{ try { const r=await api.get('/auth/me'); setUser(r.data.user); } catch { setUser(null); } finally { setLoading(false); } };
  useEffect(()=>{ refresh(); },[]);
  const logout=async()=>{ await api.post('/auth/logout'); setUser(null); };
  return <Ctx.Provider value={{user,loading,refresh,logout}}>{children}</Ctx.Provider>;
}
export const useAuth=()=>{ const c=useContext(Ctx); if(!c) throw new Error('AuthProvider missing'); return c; };
