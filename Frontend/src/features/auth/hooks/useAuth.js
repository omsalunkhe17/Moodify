import { login , register , getMe , logout } from "../services/auth.api"
import {  useContext } from "react"
import { AuthContext } from "../auth.context"

export const useAuth = () => {
    const context = useContext(AuthContext)
    const {user , setUser , loading , setLoading} = context

    async function handleRegister({email , password , username}) {
        setLoading(true)
        const data = await register({email , password , username})
        setUser(data.user)
        setLoading(false)

    }

    async function handleLogin({ email, password, username }) {
    setLoading(true);

    await login({ email, password, username });

    const me = await getMe();   // Fetch logged-in user

    setUser(me.user);

    setLoading(false);
}

    async function handleGetMe() {
    try {
        setLoading(true);

        const data = await getMe();
        setUser(data.user);
    } catch (err) {
        setUser(null);
    } finally {
        setLoading(false);
    }
}

    async function handleLogout() { 
        setLoading(true)
        const data = await logout()
        setUser(null)
        setLoading(false)
    }

    return ({
        user , loading , handleRegister , handleLogin , handleGetMe , handleLogout
    })
}