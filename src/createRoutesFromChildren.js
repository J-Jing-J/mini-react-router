import React from 'react'

// 用js对象描述路由节点，类比dom-vdom
export default function createRoutesFromChildren(children) {
    const routes = []
    // react提供的遍历节点方法，不用自己判空了
    React.Children.forEach(children, child => {
        // 当前层级的路由
        // 描述Route组件的对象
        const route = {
            element: child.props.element,
            path: child.props.path
        }
        // 子路由，嵌套路由 route里面套route
        if(child.props.children) {
            // 用 createRoutesFromChildren 将节点数组 转为 route数组
            child.children = createRoutesFromChildren(child.props.children)
        }
        routes.push(route)
    })
    return routes
}