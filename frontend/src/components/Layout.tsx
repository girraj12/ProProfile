import type { ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
export default function Layout({children}:{children:ReactNode}) { const {user,logout}=useAuth(); const nav=useNavigate(); return <><header className="nav"><Link className="brand" to="/">ProProfile</Link><nav>{user ? <><Link to="/dashboard">Dashboard</Link><button className="ghost" onClick={async()=>{await logout();nav('/')}}>Logout</button></> : <><Link to="/login">Login</Link><Link className="btn small" to="/register">Create profile</Link></>}</nav></header><main>{children}</main><footer>Build your professional identity once. Share it everywhere.</footer></> }
