export async function login(loginData, setUserLogged, setLoading) {
    setLoading(true);
    const response = await fetch("/api/login/", {
        method: "POST",
        body: JSON.stringify(loginData),
        headers: {
            'Content-Type': 'application/json'
        },
    });
    const obj = Object.values(await response.json())[0] as userData
    setUserLogged(obj)
}