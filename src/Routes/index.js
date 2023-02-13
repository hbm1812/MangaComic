// layout
import OnlyBackground from "../Layouts/OnlyBackground";

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


// layout
// public routes (k cần đăng nhập vẫn sd đc)
const publicRoutes = [
    // mặc định: layout = DefaultLayout :v
    { path: "/", component: Home},
    { path: "/tin-tuc", component: News},
    { path: "/truyen-tranh", component: Manga, childRoute: {
        path: ":mangaId",
        component: Manga
    }},
    { path: "/truyen-tranh-ct", component: MangaDetail, childRoute: {
        path: ":mangaId",
        component: MangaDetail
    }},
    { path: "/tin-tuc-ct", component: NewsDetail},
    { path: "/dang-nhap", component: Login, layout: null},
    { path: "/doc-truyen", component: ReadManga, layout: OnlyBackground},

    { path: "/test", component: Test, layout: null},


    // not other routes match
    { path: "*", component: Error404, layout: null},
]

// private routes (đăng nhập mới sd đc)
const privateRoutes = [
    
]

export { publicRoutes, privateRoutes}