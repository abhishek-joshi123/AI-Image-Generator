"use client"
import { useState, useContext, createContext, useEffect, ReactNode } from "react";
import { toast } from "react-toastify";

type User = {
    name: string;
    email: string;
};

type AuthContextType = {
    user: User | null;
    token: string;
    login: (user: User, token: string) => void;
    logout: () => void;
    loading: boolean;
    setLoading: (loading: boolean) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
    children: ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
    const [auth, setAuth] = useState<{
        user: User | null;
        token: string;
    }>({
        user: null,
        token: ""
    });
    
    const [loading, setLoading] = useState<boolean> (false)

    useEffect(() => {
        const data = localStorage.getItem('auth');

        if (data) {
            const parsedData = JSON.parse(data);
            setAuth({
                ...auth,
                user: parsedData.user,
                token: parsedData.auth_token
            });
        }
        //eslint-disable-next-line 
    }, []);

    const login = (user: User, token: string) => {
        setAuth({
            user,
            token
        });
        localStorage.setItem('auth', JSON.stringify({ user, auth_token: token }));
    };
    
    const logout = () => {
        setAuth({
            user: null,
            token: ""
        });
        localStorage.removeItem('auth');
        toast.success('Logout Successfully')
    };

    return (
        <AuthContext.Provider value={{ user: auth.user, token: auth.token, login, logout, loading, setLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export { useAuth, AuthProvider };
