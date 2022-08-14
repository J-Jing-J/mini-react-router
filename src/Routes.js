import createRoutesFromChildren from "./createRoutesFromChildren";
import { useRoutes } from "./hooks";

// 类似switch
export default function Routers({children}) {
    // 拿到routes的js对象
    const routes = createRoutesFromChildren(children)
    // 接受配置式的路由js对象，找到应该渲染哪个路由
    return useRoutes(routes)
}