import clsx from "clsx";
import styles from "./Home.module.scss";
import Heading from "../../Components/Heading";
import { Fragment, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../../Components/Loading";

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
import GlobalContext from "../../Contexts/GlobalContext";

export default function Home() {
    const [dataManga, setDataManga] = useState([]);
    const [dataNewsLastest, setDataNewsLastest] = useState([]);
    const [dataMangaHot, setDataMangaHot] = useState([]);
    const [dataCategoryInStory, setDataCategoryInStory] = useState([]);
    const [dataRecommendIndex, setDataRecommendIndex] = useState(-1);

    const [isLoading, setIsLoading] = useState(true);

    // data chapter 
    

    // console.log("dataRecommendIndex", dataRecommendIndex)

    // fetch api manga 
    useEffect(() => {
        axios.get("http://localhost/manga-comic-be/api/stories/read.php")
            .then((res) => {
                // console.log("data manga", res.data);
                setDataManga(res.data)
                setIsLoading(false);
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

                if (dataRecommendIndex === -1) {
                    setDataRecommendIndex(Math.floor(Math.random() * dataManga.length + 1))
                }
            })

            .catch(() => {
                console.log("error")
            })
    }, []);
    var listNewsLastest = dataNewsLastest.slice(0, 8);

    // find chapter
    // useEffect(() => {
    //     axios.get(`http://localhost/manga-comic-be/api/stories/getChapter.php?keyword=${params.nameManga}`)
    //         .then((res) => {
    //             // setDataMangaItem(res.data);
    //             // console.log("data chapter", res.data)
    //             setDataChapter(res.data)
    //         })

    //         .catch(() => {
    //             console.log("error")
    //         })
    // }, []);


    return (
        <Fragment>
            {
                isLoading ?
                    <Loading />
                    :
                    <div className={clsx(styles.slider)}>

                        <div className="slide-container">
                            <Slide>
                                {dataMangaHot.map((item, index) => {
                                    // console.log("item", item);
                                    let findCategory = dataCategoryInStory.filter((itemCate) => itemCate.story_id === item.id)
                                    // console.log("findCategory", findCategory)                                
                                    return (
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
                                                                    <Link to={`/manga/${itemCategory.keyword}`} key={index}
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
                                                                <Button primary medium scale
                                                                    to={`/manga/detail/${item.keyword}/${item.id}`}
                                                                >Chi tiết</Button>
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
                                <ItemManga setColumn={6} data={item} key={index} to={`/manga/detail/${item.keyword}/${item.id}`} />
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
                                    <Link to={`/manga/detail/${item.keyword}/${item.id}`} className={clsx(styles.link)}
                                        onClick={() => WindowScrollTop()}
                                    >
                                        <PlayIcon className={clsx(styles.icon)} />
                                    </Link>
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
                                            <Link to={`/manga/${itemCategory.keyword}`} key={index}
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
                        <Heading primary iconRight={<HeadingRightIcon />}>
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

                {dataManga &&
                    <Fragment>
                        <Heading primary iconRight={<HeadingRightIcon />} to="/manga">
                            All Manga
                        </Heading>
                        <div className={clsx(styles.wrapper)}>
                            {dataManga.map((item, index) => {
                                return (
                                    <ItemManga setColumn={6} data={item} key={index} to={`/manga/detail/${item.keyword}/${item.id}`}/>
                                )
                            })}
                        </div>
                        <div className={clsx(styles.viewmore)}>
                            <Button medium primary to="/manga" onClick={() => WindowScrollTop()}>Xem thêm</Button>
                        </div>
                    </Fragment>
                }
            </div>
        </Fragment>
    )
}