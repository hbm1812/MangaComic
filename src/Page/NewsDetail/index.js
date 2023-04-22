import styles from "./NewsDetail.module.scss";
import clsx from "clsx";
import { Fragment, useState, useEffect, useContext } from "react";
// components
import Button from "../../Components/Button";
import Heading from "../../Components/Heading";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import GlobalContext from "../../Contexts/GlobalContext";
import Comments from "../../Components/Comments";
import Image from "../../Components/Image";


export default function NewsDetail() {
    const navigate = useNavigate();
    const params = useParams();
    // console.log("param", params);
    const { newsDetail, setNewsDetail, dataUserLogin, setDataUserLogin } = useContext(GlobalContext);
    // console.log("newdt", newsDetail)
    const [category, setCategory] = useState(newsDetail.key_category ?? "");

    const getData = async () => {
        const respon = await axios.get(`http://localhost/manga-comic-be/api/news/showNewDetail.php?id=${params.newsId}`);
        // console.log("repson", respon.data)    
        if (respon.data.length <= 0) {
            // console.log("not found :v");
            navigate("/notfound");
        }

        setNewsDetail(respon.data[0])
    }

    useEffect(() => {
        getData();
    }, []);

    // console.log("newdtpg", newsDetail)
    // console.log("content", newsDetail.content)
    // xử lý data :v 
    if (newsDetail) {
        // xử lý chuỗi
        const strContent = newsDetail.content || "";
        var strReplace = strContent.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\t/g, "\u00a0").replace(/\n/g, '<br/>');

        // xử lý time
        const getStrCreatedAt = newsDetail.created_at || "";
        let arrDateCreated = getStrCreatedAt.split(" ");
        var getTime = arrDateCreated[0].split("-").reverse().join("/");
    }

    return (
        <Fragment>
            <section className={clsx(styles.wrapper)}>
                {/* content */}
                <div className={clsx(styles.contentWrap)}>
                    <div className={clsx(styles.article)}>
                        <Heading primary>{newsDetail.title}</Heading>
                        <p className={clsx(styles.articleDate)}>Thời gian đăng: {getTime}</p>
                        {
                            category === "anime" ?
                                <p className={clsx(styles.articleCategory, styles.animeCate)}>Thể loại: {newsDetail.name_category || ""}</p>
                                : category === "info" ?
                                    <p className={clsx(styles.articleCategory, styles.infoCate)}>Thể loại: {newsDetail.name_category || ""}</p>
                                    : category === "comic" ?
                                        <p className={clsx(styles.articleCategory, styles.mangaCate)}>Thể loại: {newsDetail.name_category || ""}</p>
                                        : ""
                        }

                        <div className={clsx(styles.articleImgWrapper)}>
                            <img className={clsx(styles.articleImg)} src={newsDetail.thumbnail || ""} alt="" />
                        </div>
                        <p className={clsx(styles.articleDesc)}
                            dangerouslySetInnerHTML={{ __html: strReplace }}
                        ></p>

                        <Heading>Bình luận</Heading>
                        {/* currentUserId sau truyền id ng dùng khi đăng nhập */}
                        {dataUserLogin ?
                            <Comments currentUserId={dataUserLogin.id} />
                            :
                            <Comments />                            
                        }

                    </div>
                </div>

            </section>
        </Fragment>
    )
}