import { useEffect } from "react"
import { useNavigate } from "./hooks"

export default function Navigate({to, state, replace}) {
    // 不管是Navigate组件，还是Link组件，本质上都是通过useNavigate
    let navigate = useNavigate()
    // 跳转是 副作用 ，副作用不能写在函数组件的组件体里，要写在useEffect里
    useEffect(() => {
        navigate(to, state, replace)
    })

    // 是组件，但不渲染任何东西，负责跳转
    return null
}