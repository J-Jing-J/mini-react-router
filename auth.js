import { createContext, useContext, useState } from "react";

const AuthContext = createContext()

export function AuthProvider({children}) {
    // 用户信息要定义为状态值，因为：状态变了组件都要重新渲染
    const [user, setUser] = useState(null)

    // 登录
    const signin = (newUser, callback) => {
        setUser(newUser)
        callback()
    }
    // 登出
    const signout = (callback) => {
        setUser(null)
        callback()
    }

    let value = {
        user, signin, signout
    }
    return <AuthContext.Provider value={value} children={children} />
}

// 子组件消费
export function useAuth() {
    return useContext(AuthContext)
}