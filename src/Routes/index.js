// layout
import OnlyBackground from "../Layouts/OnlyBackground";
import AdminLayout from "../Layouts/AdminLayout";

// page
import Home from "../Page/Home";
import News from "../Page/News";
import NewsDetail from "../Page/NewsDetail";
import Manga from "../Page/Manga";
import MangaDetail from "../Page/MangaDetail";
import Login from "../Page/Login";
import ReadManga from "../Page/ReadManga";
import Error404 from "../Page/Error404";
import Test from "../Page/Test";
import Register from "../Page/Register";

import Dashboard from "../Page/Admin/Dashboard";
import Table from "../Page/Admin/Table";
import Calendar from "../Page/Admin/Calendar";


// layout
// public routes (k cần đăng nhập vẫn sd đc)
const publicRoutes = [
    // mặc định: layout = DefaultLayout :v
    { path: "/", component: Home },   
    {
        path: "/truyen-tranh-ct", component: MangaDetail, childRoute: {
            path: ":mangaId",
            component: MangaDetail
        }
    },
    { path: "/doc-truyen", component: ReadManga, layout: OnlyBackground },
    
    
    // auth 
    { path: "/login", component: Login, layout: null },
    { path: "/register", component: Register, layout: null },

    // config news 
    { path: "/news", component: News },
    { path: "/news/detail/:newsId", component: NewsDetail },    

    // manga
    {
        path: "/manga", component: Manga, childRoute: {
            path: ":mangaId",
            component: Manga
        }
    },
    {
        path: "/manga/detail", component: MangaDetail, childRoute: {
            path: ":nameManga/:idManga",
            component: MangaDetail
        }
    },
    { path: "/manga/read", component: ReadManga, layout: OnlyBackground, childRoute: {
        path: ":nameManga/:idChapter",
        component: ReadManga,
    }},


    // admin
    { path: "/admin", component: Dashboard, layout: AdminLayout },
    { path: "/admin/table", component: Table, layout: AdminLayout },
    { path: "/admin/calendar", component: Calendar, layout: AdminLayout },

    // test
    { path: "/test", component: Test, layout: null },


    // not other routes match
    { path: "/notfound", component: Error404, layout: null },
    { path: "*", component: Error404, layout: null },
]

// private routes (đăng nhập mới sd đc)
const privateRoutes = [

]

export { publicRoutes, privateRoutes }