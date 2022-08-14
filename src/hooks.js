import { useCallback, useContext } from "react"
import { Outlet } from "."
import { NavigationContext, RouteContext } from "./Context"
import { normalizePathname } from "./utils"

// 转换配置式路由,找出要渲染的Route
export function useRoutes(routes) {
    const location = useLocation()
    // 若用window的location子组件不会跟着更新
    const pathname = location.pathname

    // V6思想：不是一层层匹配，而是reduceRight，都要渲染，放到一起排好顺序渲染（拍平）
    // 拍平：源码中的方法matchRoutes（遍历tree）
    const matches = matchRoutes(routes, {pathname}) // 数组中存了匹配的那条路径的所有route，path都是完整的
    // 匹配就渲染，不匹配就不渲染
    return renderMatches(matches)

    // return routes.map(route => {
        // // V5实现
        // const match = pathname === route.path
        // 渲染子路由要先渲染父路由
        // const match = pathname.startsWith(route.path)

        // return match && 
        // // 处理子路由
        // route.children.map(child => {
        //     let m = normalizePathname(child.path) === pathname
        //     // 不能直接返回子路由的element，因为还有父路由的，一层一层的 --- useOutlet
        //     // 用context把要渲染的children组件通过context传下来，因为<Route>是否渲染取决于<Outlet>，中间不知道跨了多少层
        //     return m && 
        //         <RouteContext.Provider 
        //             //  传下去，匹配了也不在这渲染，是否渲染取决于Outlet
        //             value={{outlet: child.element}}
        //             // 子组件要渲染的时候，检查一下：有父element就先照常渲染父element，否则直接渲染子element
        //             children={route.element !== undefined ? route.element : <Outlet />}>
        //         </RouteContext.Provider>
        // })
    // })
}

function renderMatches(matches) {
    if(matches == null) { 
        return null
    }
    // 前面包含后面（父路由包含子路由），从右向左 实现一起渲染
    return matches.reduceRight((outlet, match) => {
        // match就是child
        return <RouteContext.Provider 
            value={{outlet, matches}} 
            // 不能直接写children，而是写到Provider中，因为层级会跨的很多
            // 渲染：检查有没有element，有就渲染element，没有就渲染children
            // 渲染children要通过Outlet看是否要渲染
            children={match.route.element || outlet}>
        </RouteContext.Provider>
    }, null)
}


// Link 和 Navigetion，都是通过useNavigator实现的
// 不关心是browserRouter 还是 hashRouter，只管跳转
// history的兼容性问题：不同浏览器表现不一样 --- 使用history库（history对象通过browserRouter/HashRouter传下来）
export function useNavigate () {
    // 返回跳转方法跳转，用于命令式跳转
    const {navigator} = useContext(NavigationContext)

    const navigate = useCallback( (to, options={}) => {
        // 其实就是context传下来的history，调用history.replace/push
        // 支持to传数字跳转
        if(typeof to === 'number') {
            navigate.go(to);
            return
        }
        // 传了options.replace就使用history.replace
        (!!options.replace ?  navigate.replace : navigate.push)(to, options, state)
    }, [navigator])

    // return navigator.push
    return navigate
}

// 代替window.location
// 初始location在history对象上
export function useLocation() {
    const {location} = useContext(NavigationContext)
    return location
}

// 通过父路由渲染子路由
export const useOutlet = () => {
    // 从第一层route，到Outlet的位置，不知道要跨多少层
    const {outlet} = useContext(RouteContext)
    return outlet
}

// 动态路由 返回params部分
export const useParams = () => {
    const {matches} = useContext(RouteContext);
    // 真正要渲染的是matches数组的最后一个 -- 取最后一个
    const routeMatch  = matches[matches.length - 1]
    return routeMatch ? routeMatch.params : {}
}