// Link用useNavigate，Link需要给useNavigat传history对象，histor由browserRouter/hashRouter返回
// 层级不知隔离多少层
const NavigationContext = React.createContext();

{/* <Route>是否渲染取决于<Outlet>，中间不知道跨了多少层 */}
const RouteContext = React.createContext();


export {NavigationContext, RouteContext}