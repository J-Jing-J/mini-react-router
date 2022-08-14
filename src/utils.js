// 将多个/的情况下 标准化
export const normalizePathname = (pathname) => {
    pathname.replace(/\/+$/, "").replace(/^\/*/, "/")
}