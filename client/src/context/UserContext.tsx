import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
    userId: string;
    name: string;
    email: string;
    token: string;
}

interface UserContextType {
    user: User | null;
    setUser: (userData: User) => void;
    logout: () => void;
}

export const UserContext = createContext<UserContextType>({
    user: null,
    setUser: () => { },
    logout: () => { },
});

interface UserContextProviderProps {
    children: ReactNode;
}

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
    const [user, setUser] = useState<User | null>(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);

    const handleAuthentication = (userData: User) => {
        setUser(userData);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <UserContext.Provider value={{ user, setUser: handleAuthentication, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    return useContext(UserContext);
};
