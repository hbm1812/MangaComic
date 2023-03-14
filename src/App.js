import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { publicRoutes } from "./Routes";
import DefaultLayout from "./Layouts/DefaultLayout";
import { Fragment } from "react";
import Error404 from "./Page/Error404";
import ContextWrapper from "./Contexts/ContextWrapper";

function App() {
  return (
    <ContextWrapper>
      <Router>
        <div className="App">
          <Routes>
            {
              publicRoutes.map((route, index) => {
                const Page = route.component;
                let Layout = DefaultLayout;

                if (route.layout) {
                  Layout = route.layout;
                }
                else if (route.layout === null) {
                  Layout = Fragment;
                }
                // console.log("route.childRoute", route.childRoute)

                // sau bỏ hết :V
                let ChildPage = null;
                let ChildLayout = null;

                if (route.childRoute) {
                  // console.log("route.childRoute", route.childRoute)
                  ChildPage = route.childRoute.component;
                  ChildLayout = DefaultLayout;

                  if (route.childRoute.layout) {
                    Layout = route.childRoute.layout;
                  }
                  else if (route.childRoute.layout === null) {
                    Layout = Fragment;
                  }
                }

                return (
                  <Route key={index} path={route.path} element={
                    <Layout>
                      <Page />
                    </Layout>
                  }>
                    {route.childRoute &&
                      <Route path={route.childRoute.path} element={
                        <ChildLayout>
                          <ChildPage />
                        </ChildLayout>
                      } />
                    }
                  </Route>
                )

              })
            }
          </Routes>
        </div>
      </Router>
    </ContextWrapper>

  );
}

export default App;
