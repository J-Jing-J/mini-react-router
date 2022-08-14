import {createBrowserHistory} from 'history'
import { useLayoutEffect, useRef, useState } from 'react';
import Router from "./Router";

export default function BrowserRouter({children}) {

    // 这样写每次都会重新创建，history的历史记录就都丢了
    // const history = createBrowserHistory()
    
    // 存起来，组件卸载之前用 --- 
    // 函数组件用useRef，ref在组件的整个生命周期都是同一个
    // 类组件用构造函数，构造函数对于同一组件就执行一次
    let historyRef = useRef()
    if(historyRef.current === null) {
        // 第一次进来 --- 重新创建history对象
        history.current = createBrowserHistory()
    }
    // 不是第一次进来，直接用，不需要操作
    const history = historyRef.current
    
    // 利用Router传context
    // location一定要传下来，不能从别的地方直接取history对象，因为location是会发生变化的，location发生变化路由就要变了 --- 使用状态值
    const [state, setState] = useState({location: history.location})

    // useLayoutEffect 是 DOM更新之后同步立即执行
    // 若延迟执行，有些组件更新会被漏掉，不能让用户看到老页面
    // 涉及到组件更新，一般都会用useLayoutEffect
    useLayoutEffect(() => {
        // 监听history变化，改变状态值，往下传，子组件都要更新
        // 若用window的location子组件不会跟着更新
        history.listen(setState)
    }, [state])

    return <Router children={children} navigator={history} location={state.location}/>
}