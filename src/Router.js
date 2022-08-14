// 统一传context，不然还要从 BrowserRouter 和 HashRouter 分别传

import { useMemo } from "react";
import { NavigationContext } from "./Context";

// 实现跨组件层级传递数据
// 参数navigator就是history对象
export default function Router({navigator, children, location}) {
    // useMemo避免每次重新定义对象，造成不必要的更新 -- 缓存一下
    // 源码中是将navigator, location拆开成两个context
    let navigationContext = useMemo(() => ({navigator, location}), [navigator, location]) 

    return (
        <NavigationContext.Provider value={navigationContext}>
            {children}
        </NavigationContext.Provider>
    )
}