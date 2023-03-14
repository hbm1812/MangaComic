import styles from "./News.module.scss";
import clsx from "clsx";
import { Fragment, useEffect, useState } from "react";
import Button from "../../Components/Button";
import Heading from "../../Components/Heading";
import ItemNews from "../../Components/ItemNews";
import RecommendNews from "../../Components/RecommendNews";
import Pagination from "../../Components/Pagination";
// util
import { WindowScrollTop } from "../../util";
// fetch api
import axios from "axios";
export default function News() {
    const [listNews, setListNews] = useState([]);
    const [listNewsLastest, setListNewsLastest] = useState([]);
    const [listCategory, setListCategory] = useState([]);
    const [title, setTitle] = useState("");

    // pages
    const [currentPage, setCurrentPage] = useState(1);
    const [newsPerPage, setNewsPerPage] = useState(5);

    // fetch api top 3 news lastest 
    useEffect(() => {
        axios.get("http://localhost/manga-comic-be/api/news/showNewLastest.php")
            .then((res) => {
                // console.log("data Cate", res.data)
                setListNewsLastest(res.data);
            })

            .catch(() => {
                console.log("error")
            })
    }, [])

    // fetch api category
    useEffect(() => {
        axios.get("http://localhost/manga-comic-be/api/news/getCategory.php")
            .then((res) => {
                // console.log("data Cate", res.data)
                setListCategory(res.data);
                setTitle(res.data[0].name)
            })

            .catch(() => {
                console.log("error")
            })
    }, [])

    // fetch api news
    useEffect(() => {
        axios.get("http://localhost/manga-comic-be/api/news/read.php")
            .then((res) => {
                // console.log("data", res.data)
                setListNews(res.data);
            })

            .catch(() => {
                console.log("error")
            })
    }, []);

    // getCurrentPost News
    let indexOfLastPost = 0;
    let indexOfFirstPost = 0;
    let currentPost = [];
    let filterNews = [];

    if (title === "mới nhất") {
        indexOfLastPost = currentPage * newsPerPage;
        indexOfFirstPost = indexOfLastPost - newsPerPage;
        filterNews = listNews;
        currentPost = listNews.slice(indexOfFirstPost, indexOfLastPost);
    } else if (title === "anime" || title === "truyện tranh" || title === "thông tin") {
        indexOfLastPost = currentPage * newsPerPage;
        indexOfFirstPost = indexOfLastPost - newsPerPage;
        filterNews = listNews.filter((item) => item.name_category === title);
        currentPost = filterNews.slice(indexOfFirstPost, indexOfLastPost);
        // console.log("current post", currentPost);
    }

    // console.log("indexOfLastPost", indexOfLastPost)
    // console.log("indexOfFirstPost", indexOfFirstPost)
    // console.log("currentPost", currentPost)

    // handle onchange page 
    const onChangePage = (pageNumber) => {
        setCurrentPage(pageNumber);
        WindowScrollTop();
    }

    return (
        <Fragment>
            <section className={clsx(styles.wrapper)}>
                {/* content */}
                <div className={clsx(styles.contentWrap)}>
                    <header className={clsx(styles.headerContent)}>
                        <Heading active>{title}</Heading>
                        <nav className={clsx(styles.category)}>
                            {listCategory.map((item, index) => {
                                return (
                                    <Button primary active={title === item.name ? true : false} key={index}
                                        onClick={() => {
                                            setTitle(item.name)
                                            setCurrentPage(1)
                                            WindowScrollTop();
                                        }}
                                    >{item.name}</Button>
                                )
                            })}
                        </nav>
                    </header>
                    <div className={clsx(styles.content)}>                        
                        {currentPost && listCategory && currentPost.map((item, index) => {
                            // show all
                            if (title === listCategory[0].name) {
                                return (
                                    <ItemNews key={index} data={item} to={`/news/detail/${item.id}`} />
                                )
                            }

                            // show theo từng thể loại
                            if (title === item.name_category) {
                                return (
                                    <ItemNews key={index} data={item} to={`/news/detail/${item.id}`} />
                                )
                            }
                        })}
                    </div>
                    <div className={clsx(styles.viewMore)}>
                        <Pagination postsPerPage={newsPerPage} totalPosts={filterNews.length} paginate={onChangePage} />
                    </div>
                </div>
                {/* sidebar */}
                <div className={clsx(styles.sidebarWrap)}>
                    <RecommendNews title="Đề xuất dành cho bạn" dataMain={listNewsLastest} />
                </div>
            </section>
        </Fragment>
    )
}