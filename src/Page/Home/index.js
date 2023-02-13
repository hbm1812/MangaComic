import clsx from "clsx";
import styles from "./Home.module.scss";
import Heading from "../../Components/Heading";
import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";

// base component
import Button from "../../Components/Button/index";
import {
    HeadingLeftIcon, HeadingRightIcon, ShuffleIcon,
    FaceSmileIcon, HeartIcon, PlayIcon,
} from "../../Components/Icon";

// lib slideshow
import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

// images
import ItemNews from "../../Components/ItemNews";
import ItemManga from "../../Components/ItemManga";

// data 
import { dataManga } from "../../data/manga";

const dataSlider = [
    {
        id: 1,
        chapter: 114,
        name: "Thám tử Conan",
        desc: "Mở đầu câu truyện, cậu học sinh trung học 16 tuổi Shinichi Kudo bị biến thành cậu bé Conan Edogawa. Shinichi trong phần đầu của Thám tử lừng danh Conan được miêu tả là một thám tử học đường. Trong một lần đi chơi công viên Miền Nhiệt đới với cô bạn từ thuở nhỏ (cũng là bạn gái) Ran Mori , cậu bị dính vào vụ án một hành khách trên Chuyến tàu tốc hành trong công viên, Kishida , bị giết trong một vụ án cắt đầu rùng rợn. Cậu đã làm sáng tỏ vụ án và trên đường về nhà, chứng kiến một vụ làm ăn mờ ám của những người đàn ông mặc toàn đồ đen. Kudo bị phát hiện, bị đánh ngất sau đó những người đàn ông áo đen đã cho cậu uống một thứ thuốc độc chưa qua thử nghiệm là Apotoxin-4869 (APTX4869) với mục đích thủ tiêu cậu. Tuy nhiên chất độc đã không giết chết Kudo. Khi tỉnh lại, cậu bàng hoàng nhận thấy thân thể mình đã bị teo nhỏ trong hình dạng của một cậu học sinh tiểu học....",
        src: "https://kyoto-manga-proxy-5niz.onrender.com/proxy?url=http://www.nettruyenme.com&src=https://st.ntcdntempv3.com/data/comics/30/tham-tu-conan.jpg",
        listCategory: [
            {
                key: "action",
                title: "Action",
            },
            {
                key: "adventure",
                title: "Adventure",
            },
            {
                key: "comedy",
                title: "Comedy",
            },
            {
                key: "romance",
                title: "Romance",
            },
            {
                key: "drama",
                title: "Drama",
            },
            {
                key: "mecha",
                title: "Mecha",
            }
        ],
    },
    {
        id: 2,
        chapter: 999,
        name: "Thanh gươm diệt quỷ",
        desc: "Mở đầu câu truyện, cậu học sinh trung học 16 tuổi Shinichi Kudo bị biến thành cậu bé Conan Edogawa. Shinichi trong phần đầu của Thám tử lừng danh Conan được miêu tả là một thám tử học đường. Trong một lần đi chơi công viên Miền Nhiệt đới với cô bạn từ thuở nhỏ (cũng là bạn gái) Ran Mori , cậu bị dính vào vụ án một hành khách trên Chuyến tàu tốc hành trong công viên, Kishida , bị giết trong một vụ án cắt đầu rùng rợn. Cậu đã làm sáng tỏ vụ án và trên đường về nhà, chứng kiến một vụ làm ăn mờ ám của những người đàn ông mặc toàn đồ đen. Kudo bị phát hiện, bị đánh ngất sau đó những người đàn ông áo đen đã cho cậu uống một thứ thuốc độc chưa qua thử nghiệm là Apotoxin-4869 (APTX4869) với mục đích thủ tiêu cậu. Tuy nhiên chất độc đã không giết chết Kudo. Khi tỉnh lại, cậu bàng hoàng nhận thấy thân thể mình đã bị teo nhỏ trong hình dạng của một cậu học sinh tiểu học....",
        src: "https://kyoto-manga-proxy-5niz.onrender.com/proxy?url=http://www.nettruyenme.com&src=https://st.ntcdntempv3.com/data/comics/235/thanh-guom-diet-quy.jpg",
        listCategory: [
            {
                key: "action",
                title: "Action",
            },
            {
                key: "adventure",
                title: "Adventure",
            },
            {
                key: "drama",
                title: "Drama",
            },
            {
                key: "mecha",
                title: "Mecha",
            }
        ],
    },
    {
        id: 3,
        chapter: 100,
        name: "Thất nghiệp chuyển sinh",
        desc: "Mở đầu câu truyện, cậu học sinh trung học 16 tuổi Shinichi Kudo bị biến thành cậu bé Conan Edogawa. Shinichi trong phần đầu của Thám tử lừng danh Conan được miêu tả là một thám tử học đường. Trong một lần đi chơi công viên Miền Nhiệt đới với cô bạn từ thuở nhỏ (cũng là bạn gái) Ran Mori , cậu bị dính vào vụ án một hành khách trên Chuyến tàu tốc hành trong công viên, Kishida , bị giết trong một vụ án cắt đầu rùng rợn. Cậu đã làm sáng tỏ vụ án và trên đường về nhà, chứng kiến một vụ làm ăn mờ ám của những người đàn ông mặc toàn đồ đen. Kudo bị phát hiện, bị đánh ngất sau đó những người đàn ông áo đen đã cho cậu uống một thứ thuốc độc chưa qua thử nghiệm là Apotoxin-4869 (APTX4869) với mục đích thủ tiêu cậu. Tuy nhiên chất độc đã không giết chết Kudo. Khi tỉnh lại, cậu bàng hoàng nhận thấy thân thể mình đã bị teo nhỏ trong hình dạng của một cậu học sinh tiểu học....",
        src: "https://kyoto-manga-proxy-5niz.onrender.com/proxy?url=http://www.nettruyenme.com&src=https://st.ntcdntempv3.com/data/comics/52/that-nghiep-chuyen-sinh-lam-lai-het-suc.jpg",
        listCategory: [
            {
                key: "comedy",
                title: "Comedy",
            },
            {
                key: "romance",
                title: "Romance",
            },
            {
                key: "drama",
                title: "Drama",
            },
            {
                key: "mecha",
                title: "Mecha",
            }
        ],
    },
    {
        id: 4,
        chapter: 200,
        name: "Vương giả",
        desc: "Mở đầu câu truyện, cậu học sinh trung học 16 tuổi Shinichi Kudo bị biến thành cậu bé Conan Edogawa. Shinichi trong phần đầu của Thám tử lừng danh Conan được miêu tả là một thám tử học đường. Trong một lần đi chơi công viên Miền Nhiệt đới với cô bạn từ thuở nhỏ (cũng là bạn gái) Ran Mori , cậu bị dính vào vụ án một hành khách trên Chuyến tàu tốc hành trong công viên, Kishida , bị giết trong một vụ án cắt đầu rùng rợn. Cậu đã làm sáng tỏ vụ án và trên đường về nhà, chứng kiến một vụ làm ăn mờ ám của những người đàn ông mặc toàn đồ đen. Kudo bị phát hiện, bị đánh ngất sau đó những người đàn ông áo đen đã cho cậu uống một thứ thuốc độc chưa qua thử nghiệm là Apotoxin-4869 (APTX4869) với mục đích thủ tiêu cậu. Tuy nhiên chất độc đã không giết chết Kudo. Khi tỉnh lại, cậu bàng hoàng nhận thấy thân thể mình đã bị teo nhỏ trong hình dạng của một cậu học sinh tiểu học....",
        src: "https://kyoto-manga-proxy-5niz.onrender.com/proxy?url=http://www.nettruyenme.com&src=https://st.ntcdntempv3.com/data/comics/53/vuong-gia-thien-ha.jpg",
        listCategory: [
            {
                key: "action",
                title: "Action",
            },
            {
                key: "adventure",
                title: "Adventure",
            },
            {
                key: "comedy",
                title: "Comedy",
            },
            {
                key: "romance",
                title: "Romance",
            },
        ],
    },
]

const dataRecommend = [
    {
        id: 999,
        chapter: 100,
        name: "Spy X Family",
        desc: `Câu chuyện kể về một điệp viên của "Tây Quốc" Westalis (西国ウェスタリス Wesutarisu?) có mật danh là "Hoàng hôn", cố gắng xây dựng một "gia đình kiểu mẫu" nhằm thu thập thông tin tình báo tại nước đối địch, "Đông Quốc" Ostania (東国オスタニア Osutania?)`,
        src: "https://muagitot.com/images/news/2022/07/07/large/wp7868567_1657152589.jpg",
        satisfied: 58,
        favorite: 11102,
        listCategory: [
            {
                key: "comedy",
                title: "Comedy",
            },
            {
                key: "romance",
                title: "Romance",
            },
            {
                key: "drama",
                title: "Drama",
            },
            {
                key: "mecha",
                title: "Mecha",
            }
        ],
    },
]

export default function Home() {
    const [dataEpisodeLatest, setDataEpisodeLatest] = useState([]);
    const [dataMangaItem, setDataMangaItem] = useState(dataManga);

    const windowScroll = () => {
        window.scroll({
            top: 0,
            behavior: "smooth"
        });
    }

    // fetch api
    /*
    useEffect(() => {
        async function fetchData() {
            let headers = new Headers();

            headers.append('Content-Type', 'application/json');
            headers.append('Accept', 'application/json');
            headers.append('Origin','http://localhost:3000');
            
            
            await fetch("http://localhost/backend/api/anime/index.php", {
                mode: 'cors',
                method: 'GET',
                headers: headers
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if(data.status != null && data.status === "success") {
                        setDataEpisodeLatest(data.data)
                    } 

                })

                .catch(err => console.error(err))
        }

        fetchData();
    }, []);
    */

    return (
        <Fragment>
            <div className={clsx(styles.slider)}>
                <div className="slide-container">
                    <Slide>
                        {dataSlider.map((item, index) => (
                            <div className="each-slide" key={index}>
                                <div className={clsx(styles.wrapper)}>
                                    <div className={clsx(styles.item)} key={index}>
                                        <div className={clsx(styles.content)}>
                                            <div className={clsx(styles.info)}>
                                                <h3 className={clsx(styles.chapter)}>
                                                    Chapter {item.chapter}
                                                </h3>
                                                <h1 className={clsx(styles.name)}>
                                                    {item.name}
                                                </h1>
                                                <h5 className={clsx(styles.desc)}>
                                                    {item.desc}
                                                </h5>
                                                <div className={clsx(styles.listCategory)}>
                                                    {item.listCategory.map((itemCategory, index) => {
                                                        return (
                                                            <Button transparent small key={index} to={`/truyen-tranh/${itemCategory.key}`}
                                                                onClick={() => {
                                                                    windowScroll();
                                                                }}
                                                            >{itemCategory.title}</Button>
                                                        )
                                                    })}
                                                </div>
                                                <div className={clsx(styles.userActive)}>
                                                    <Button primary medium scale>Đọc ngay</Button>
                                                    <Button outline medium scale>Chi tiết</Button>
                                                </div>
                                            </div>
                                            <div className={clsx(styles.imageWrap)}>
                                                <img src={item.src} alt="" />
                                            </div>
                                        </div>

                                        <div className={clsx(styles.overlay)}
                                            style={{
                                                backgroundImage: `url(${item.src})`
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slide>
                </div>
            </div>
            {/* content */}
            <div className={clsx(styles.content)}>
                <div className={clsx(styles.lastest)}>
                    <Heading primary iconRight={<HeadingRightIcon />}>
                        Daily Updates
                    </Heading>
                    <div className={clsx(styles.listItemLastest)}>
                        <ItemManga setColumn={6} coming />
                        <ItemManga setColumn={6} coming />
                        <ItemManga setColumn={6} complete />
                        <ItemManga setColumn={6} />
                        <ItemManga setColumn={6} />
                        <ItemManga setColumn={6} complete />
                        <ItemManga setColumn={6} coming />
                        <ItemManga setColumn={6} coming />
                        <ItemManga setColumn={6} complete />
                        <ItemManga setColumn={6} />
                        <ItemManga setColumn={6} />
                        <ItemManga setColumn={6} complete />
                    </div>
                </div>
                <Heading href="" iconRight={<HeadingRightIcon />}>
                    Lastest news
                </Heading>
                <section className={styles.wrapper}>
                    <ItemNews type="recommend" setColumn={4} />
                    <ItemNews type="recommend" setColumn={4} />
                    <ItemNews type="recommend" setColumn={4} />
                    <ItemNews type="recommend" setColumn={4} />
                    <ItemNews type="recommend" setColumn={4} />
                    <ItemNews type="recommend" setColumn={4} />
                    <ItemNews type="recommend" setColumn={4} />
                    <ItemNews type="recommend" setColumn={4} />
                </section>

                <Heading primary iconRight={<HeadingRightIcon />}>
                    Manga Oneshot
                </Heading>
                <div className={clsx(styles.wrapper)}>
                    <ItemManga setColumn={6} coming />
                    <ItemManga setColumn={6} coming />
                    <ItemManga setColumn={6} complete />
                    <ItemManga setColumn={6} />
                    <ItemManga setColumn={6} />
                    <ItemManga setColumn={6} complete />
                </div>

                <Heading primary>
                    Suggest for today
                </Heading>
                <div className={clsx(styles.wrapper)}>
                    <ItemManga coming setColumn={4} />
                    <ItemManga coming setColumn={4} />
                    <ItemManga complete setColumn={4} />
                    <ItemManga setColumn={4} />
                    <ItemManga setColumn={4} />
                    <ItemManga complete setColumn={4} />
                    <ItemManga complete setColumn={4} />
                    <ItemManga complete setColumn={4} />
                </div>

                <Heading primary iconRight={<HeadingRightIcon />}>
                    Manga Lastest
                </Heading>
                <div className={clsx(styles.wrapper)}>
                    {dataMangaItem.map((item, index) => {
                        return (
                            <ItemManga setColumn={6} data={item} key={index} to={`/truyen-tranh-ct/${item.id}`} />
                        )
                    })}

                    {/* <ItemManga setColumn={6} coming />
                    <ItemManga setColumn={6} coming />
                    <ItemManga setColumn={6} complete />
                    <ItemManga setColumn={6} />
                    <ItemManga setColumn={6} />
                    <ItemManga setColumn={6} complete /> */}
                </div>

                <Heading primary>
                    Recommend for you
                </Heading>
                {
                    dataRecommend.map((item, index) => (
                        <div className={clsx(styles.recommend)} key={index}>
                            <div className={clsx(styles.banner)}>
                                <img src={item.src} alt="" />
                                <div className={clsx(styles.overlay)}>
                                    <a href="" className={clsx(styles.link)}>
                                        <PlayIcon className={clsx(styles.icon)} />
                                    </a>
                                </div>
                            </div>

                            <div className={clsx(styles.info)}>
                                <div className={clsx(styles.detailManga)}>
                                    <h2 className={clsx(styles.name)}>{item.name}</h2>
                                    <div className={clsx(styles.evaluate)}>
                                        <div className={clsx(styles.satisfied)}>
                                            <FaceSmileIcon className={clsx(styles.icon)} />
                                            <p>
                                                {item.satisfied}%
                                            </p>
                                        </div>
                                        <div className={clsx(styles.favorite)}>
                                            <HeartIcon className={clsx(styles.icon)} />
                                            <p>
                                                {item.favorite}
                                            </p>
                                        </div>
                                    </div>
                                    <ul className={clsx(styles.genres)}>
                                        {item.listCategory.map((itemCategory, index) => (
                                            <Link to={`/truyen-tranh/${itemCategory.key}`} key={index}
                                                onClick={() => {
                                                    windowScroll();
                                                }}
                                            >
                                                <li>{itemCategory.title}</li>
                                            </Link>
                                        ))}
                                    </ul>
                                </div>

                                <a className={clsx(styles.desc)} href="">
                                    {item.desc}
                                    {/* It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like). */}
                                </a>
                            </div>
                        </div>
                    ))
                }


                <Heading primary iconRight={<HeadingRightIcon />} to="/anime">
                    Coming Soon
                </Heading>
                <div className={clsx(styles.wrapper)}>
                    <ItemManga setColumn={6} coming />
                    <ItemManga setColumn={6} coming />
                    <ItemManga setColumn={6} coming />
                    <ItemManga setColumn={6} coming />
                    <ItemManga setColumn={6} coming />
                    <ItemManga setColumn={6} coming />
                </div>

                <Heading primary iconRight={<HeadingRightIcon />} to="/anime">
                    All Manga
                </Heading>
                <div className={clsx(styles.wrapper)}>
                    <ItemManga setColumn={6} coming />
                    <ItemManga setColumn={6} coming />
                    <ItemManga setColumn={6} complete />
                    <ItemManga setColumn={6} />
                    <ItemManga setColumn={6} />
                    <ItemManga setColumn={6} complete />
                    <ItemManga setColumn={6} coming />
                    <ItemManga setColumn={6} coming />
                    <ItemManga setColumn={6} complete />
                    <ItemManga setColumn={6} />
                    <ItemManga setColumn={6} />
                    <ItemManga setColumn={6} complete />
                    <ItemManga setColumn={6} coming />
                    <ItemManga setColumn={6} coming />
                    <ItemManga setColumn={6} complete />
                    <ItemManga setColumn={6} />
                    <ItemManga setColumn={6} />
                    <ItemManga setColumn={6} complete />
                </div>

                <div className={clsx(styles.viewmore)}>
                    <Button medium primary to="/truyen-tranh">Xem thêm</Button>
                </div>
            </div>
        </Fragment>
    )
}