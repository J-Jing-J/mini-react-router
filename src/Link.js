import { useNavigate } from "./hooks"

// Link 和 Navigetion，都是通过useNavigator实现的
export default function Link({to, children}) {
    const navigate = useNavigate() // 返回一个函数，用于跳转
    const handle = (e) => {
        // 禁掉a标签的默认刷新行为 --- 刷新会导致页面重新请求很多资源
        e.preventDefault()
        // 不用href，使用命令跳转 useNavigate
        navigate(to)
    }
    return (
        <a href={to} onClick={handle}>{children}</a>
    )
}