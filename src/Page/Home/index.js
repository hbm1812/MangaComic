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
import axios from "axios";
import { WindowScrollTop } from "../../util";

import Image from "../../Components/Image";

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
    const [dataManga, setDataManga] = useState([]);
    const [dataNewsLastest, setDataNewsLastest] = useState([]);
    const [dataMangaHot, setDataMangaHot] = useState([]);
    const [dataCategoryInStory, setDataCategoryInStory] = useState([]);
    const [dataRecommendIndex, setDataRecommendIndex] = useState(-1);
    
    // console.log("dataRecommendIndex", dataRecommendIndex)
    // fetch api manga 
    useEffect(() => {
        axios.get("http://localhost/manga-comic-be/api/stories/read.php")
            .then((res) => {
                // console.log("data manga", res.data);
                setDataManga(res.data)
            })

            .catch(() => {
                console.log("error")
            })
    }, []);
    const dataMangaComing = dataManga.filter((item) => {
        // console.log("item", item)
        return (
            item.status_id === 2
        )
    })
    // console.log("dataMangaComing", dataMangaComing)
    const dataMangaRecommend = dataManga.filter((item) => {
        // console.log("item", item)
        return (
            item.id === dataRecommendIndex
        )
    })
    // console.log("dataMangaRecommend", dataMangaRecommend)

    // fetch api manga hot
    useEffect(() => {
        axios.get("http://localhost/manga-comic-be/api/stories/readStoriesHot.php")
            .then((res) => {
                // console.log("data manga hot", res.data);
                setDataMangaHot(res.data)
            })

            .catch(() => {
                console.log("error")
            })
    }, []);

    // fetch api category in story
    useEffect(() => {
        axios.get("http://localhost/manga-comic-be/api/stories/findcategory.php")
            .then((res) => {
                setDataCategoryInStory(res.data)
            })

            .catch(() => {
                console.log("error")
            })
    }, []);

    // fetch api new recommend
    useEffect(() => {
        axios.get("http://localhost/manga-comic-be/api/news/read.php")
            .then((res) => {
                setDataNewsLastest(res.data);

                if(dataRecommendIndex === -1) {
                    setDataRecommendIndex(Math.floor(Math.random() * dataManga.length + 1))
                }
            })

            .catch(() => {
                console.log("error")
            })
    }, []);
    var listNewsLastest = dataNewsLastest.slice(0, 8);


    return (
        <Fragment>            
            {dataMangaHot.length !== 0 &&
                <div className={clsx(styles.slider)}>
                    <div className="slide-container">
                        <Slide>
                            {dataMangaHot.map((item, index) => {
                                // console.log("item", item);
                                let findCategory = dataCategoryInStory.filter((itemCate) => itemCate.story_id === item.id)
                                // console.log("findCategory", findCategory)
                                return (
                                    (
                                        <div className="each-slide" key={index}>
                                            <div className={clsx(styles.wrapper)}>
                                                <div className={clsx(styles.item)} key={index}>
                                                    <div className={clsx(styles.content)}>
                                                        <div className={clsx(styles.info)}>
                                                            <h3 className={clsx(styles.chapter)}>
                                                                Chapter {item.chapter_lastest}
                                                            </h3>
                                                            <h1 className={clsx(styles.name)}>
                                                                {item.name}
                                                            </h1>
                                                            <h5 className={clsx(styles.desc)}>
                                                                {item.desc}
                                                            </h5>
                                                            <ul className={clsx(styles.genres)}>
                                                                {findCategory.map((itemCategory, index) => (
                                                                    <Link to={`/truyen-tranh/${itemCategory.keyword}`} key={index}
                                                                        onClick={() => {
                                                                            WindowScrollTop()
                                                                        }}
                                                                    >
                                                                        <li>{itemCategory.name}</li>
                                                                    </Link>
                                                                ))}
                                                            </ul>
                                                            <div className={clsx(styles.userActive)}>
                                                                <Button primary medium scale>Đọc ngay</Button>
                                                                <Button outline medium scale>Chi tiết</Button>
                                                            </div>
                                                        </div>
                                                        <div className={clsx(styles.imageWrap)}>
                                                            <img src={item.thumbnail} alt="" />
                                                        </div>
                                                    </div>

                                                    <div className={clsx(styles.overlay)}
                                                        style={{
                                                            backgroundImage: `url(${item.background})`
                                                        }}
                                                    ></div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                )
                            })}
                        </Slide>
                    </div>
                </div>
            }
            {/* content */}
            <div className={clsx(styles.content)}>
                <div className={clsx(styles.lastest)}>
                    <Heading primary iconRight={<HeadingRightIcon />}>
                        Daily Updates
                    </Heading>
                    <div className={clsx(styles.listItemLastest)}>
                        {dataManga.map((item, index) => {
                            // console.log("item detail", item)
                            return (
                                <ItemManga setColumn={6} data={item} key={index} to={`/manga/detail/${item.keyword}/${item.id}`}/>
                            )
                        })}
                    </div>
                </div>
                <Heading href="" iconRight={<HeadingRightIcon />}>
                    Lastest news
                </Heading>
                <section className={styles.wrapper}>
                    {listNewsLastest.map((item, index) => (
                        <ItemNews type="recommend" setColumn={4} data={item} key={index} to={`/news/detail/${item.id}`} />
                    ))}
                </section>

                <Heading primary iconRight={<HeadingRightIcon />}>
                    Manga Oneshot
                </Heading>
                <div className={clsx(styles.wrapper)}>
                    {dataManga.map((item, index) => {
                        return (
                            <ItemManga setColumn={6} data={item} key={index} />
                        )
                    })}
                </div>

                <Heading primary>
                    Suggest for today
                </Heading>
                <div className={clsx(styles.wrapper)}>
                    {dataManga.map((item, index) => {
                        return (
                            <ItemManga setColumn={6} data={item} key={index} />
                        )
                    })}
                </div>

                <Heading primary iconRight={<HeadingRightIcon />}>
                    Manga Lastest
                </Heading>
                <div className={clsx(styles.wrapper)}>
                    {dataManga.map((item, index) => {
                        return (
                            <ItemManga setColumn={6} data={item} key={index} />
                        )
                    })}
                </div>

                <Heading primary onClick={() => {
                    setDataRecommendIndex(Math.floor(Math.random() * dataManga.length + 1))
                }}>
                    Recommend for you
                </Heading>
                {dataMangaRecommend.map((item, index) => {
                    let findCategory = dataCategoryInStory.filter((itemCate) => itemCate.story_id === item.id)
                    return (
                        <div className={clsx(styles.recommend)} key={index}>
                            <div className={clsx(styles.banner)}>
                                <img src={item.background} alt="" />
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
                                                2000
                                                {/* {item.satisfied}% */}
                                            </p>
                                        </div>
                                        <div className={clsx(styles.favorite)}>
                                            <HeartIcon className={clsx(styles.icon)} />
                                            <p>
                                                1000
                                                {/* {item.favorite} */}
                                            </p>
                                        </div>
                                    </div>
                                    <ul className={clsx(styles.genres)}>
                                        {findCategory.map((itemCategory, index) => (
                                            <Link to={`/truyen-tranh/${itemCategory.keyword}`} key={index}
                                                onClick={() => {
                                                    WindowScrollTop();
                                                }}
                                            >
                                                <li>{itemCategory.name}</li>
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
                    )
                })}

                {dataMangaComing &&
                    <Fragment>
                        <Heading primary iconRight={<HeadingRightIcon />} to="/anime">
                            Coming Soon
                        </Heading>
                        <div className={clsx(styles.wrapper)}>
                            {dataMangaComing.map((item, index) => {
                                return (
                                    <ItemManga setColumn={6} data={item} key={index} />
                                )
                            })}
                        </div>
                    </Fragment>
                }

                <Heading primary iconRight={<HeadingRightIcon />} to="/anime">
                    All Manga
                </Heading>
                <div className={clsx(styles.wrapper)}>
                    {dataManga.map((item, index) => {
                        return (
                            <ItemManga setColumn={6} data={item} key={index} />
                        )
                    })}
                </div>

                <div className={clsx(styles.viewmore)}>
                    <Button medium primary to="/truyen-tranh">Xem thêm</Button>
                </div>
            </div>
        </Fragment>
    )
}