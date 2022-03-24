import { createContext, Dispatch, SetStateAction, useEffect, useState } from 'react';

interface UserContextType {
    setUserLogged: Dispatch<SetStateAction<userData>>;
    userLogged: userData;
    setLoading: Dispatch<SetStateAction<boolean>>;
    loading: boolean;
}

const UserContext = createContext<UserContextType>({} as UserContextType);

function UserProvider({ children }) {
    const [userLogged, setUserLogged] = useState<userData>({} as userData);
    const [loading, setLoading] = useState(false);

    const relogin = async () => {
        const userId = localStorage.getItem('user_id')

        if (userId) {
            const response = await fetch(`/api/user-relogin-data/${userId}`)
            const obj = Object.values(await response.json())[0] as userData
            setUserLogged(obj)
        }
    }

    useEffect(() => {
        relogin()
    }, [])

    return (
        <UserContext.Provider value={{ userLogged, setUserLogged, loading, setLoading }}>
            {children}
        </UserContext.Provider>
    );
}

export { UserProvider, UserContext };