export async function login(loginData, setUserLogged, setLoading) {
    setLoading(true);
    const response = await fetch("/api/login/", {
        method: "POST",
        body: JSON.stringify(loginData),
        headers: {
            'Content-Type': 'application/json'
        },
    });

    const objUser = Object.values(await response.json())[0] as UserData
    !window.localStorage.getItem('cart') && window.localStorage.setItem('cart', '[]')
    setUserLogged(objUser)
}