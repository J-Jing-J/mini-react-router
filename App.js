// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Link,
//   Outlet,
//   useNavigate,
//   useParams,
//   useResolvedPath,
// } from "react-router-dom";

import { AuthProvider } from "./auth";
import {
    BrowserRouter as Router,
    Routes,
    Route,
  //   Link,
  //   Outlet,
  //   useParams,
  //   useNavigate,
  //   useResolvedPath,
  } from "./mini-react-router";
import { useLocation } from "./src/hooks";
  
  export default function App(props) {
    return (
      <div className="app">
        <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              {/* <Route path="product" element={<Product />} /> */}
              <Route path="product" element={<Product />}>
                <Route path=":id" element={<ProductDetail />} />
              </Route>
              <Route path="user" element={<RequiredAuth><User /></RequiredAuth>}></Route>
              <Route path="login" element={<RequiredAuth><Login /></RequiredAuth>}></Route>
              {/* router6要求必须写path为*，V5可以不写 */}
              <Route path="*" element={<NoMatch />} />
            </Route>
          </Routes>
        </Router>
        </AuthProvider>
      </div>
    );
  }
  
  function Layout() {
    return (
      <div>
        <Link to="/">首页</Link>
        <Link to="product">商品</Link>
        {/* 校验登录情况，只显示一个 -- 路由守卫 */}
        <Link to="user">user</Link>
        <Link to="login">login</Link>
        <Outlet />
      </div>
    );
  }
  
  function Home() {
    return (
      <div>
        <h1>Home</h1>
      </div>
    );
  }
  
  function Product() {
    const path = useResolvedPath("123");
    console.log("path", path); //sy-log
    return (
      <div>
        <h1>Product</h1>
        <Link to="123">详情</Link>
        <Outlet />
      </div>
    );
  }
  
  function ProductDetail() {
    const params = useParams();
    const navigate = useNavigate();
    return (
      <div>
        <h1>ProductDetail: {params.id}</h1>
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          go home
        </button>
      </div>
    );
  }
  
  // 404
  function NoMatch() {
    return (
      <div>
        <h1>NoMatch</h1>
      </div>
    );
  }

  function User() {
    return <div>用户中心</div>
  }

  function Login() {
    // 在这里用useAuth这个context里面的signin登陆
    // 传入用户信息和回调，在回调中useNavigate命令式跳转
    if(user) {
      // 去首页
    }
    return <div>登录</div>
  }

  // 路由守卫组件
  // 需要路由守卫 就用这个包一下
  function RequiredAuth(children) {
    const auth = useAuth()
    const location = useLocation()
    if(auth.user) {
      // 路由跳转的三种方式：Link/a、Navigate、useNavigate，命令式/组件式
      // 在组件中要用组件的跳转方式，如<Navigate>，方法中用命令式跳转
      // 要用state记住当前url，登录后马上跳转到这里
      // replace: 不希望用户点回退 又回到登录页
      return <Navigate to={'/login'} state={{from: location}} replace={true}/>
    }
    // 已经登录，直接去
    return children
  }