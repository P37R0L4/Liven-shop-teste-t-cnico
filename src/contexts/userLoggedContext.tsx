import { createContext, Dispatch, SetStateAction, useEffect, useState } from 'react';

interface UserContextType {
    setUserLogged: Dispatch<SetStateAction<UserData>>;
    userLogged: UserData;
    setLoading: Dispatch<SetStateAction<boolean>>;
    loading: boolean;
}

const UserContext = createContext<UserContextType>({} as UserContextType);

function UserProvider({ children }) {
    const [userLogged, setUserLogged] = useState<UserData>({} as UserData);
    const [loading, setLoading] = useState(false);

    const relogin = async () => {
        const userId = localStorage.getItem('user_id')

        if (userId) {
            const responseUser = await fetch(`/api/user-relogin-data/${userId}`)
            const objUser = Object.values(await responseUser.json())[0] as UserData

            setUserLogged(objUser)
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