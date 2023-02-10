import styles from "./Manga.module.scss";
import clsx from "clsx";
import { Fragment, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Button from "../../Components/Button";
import Heading from "../../Components/Heading";
import ItemManga from "../../Components/ItemManga";

// image genres
import actionImg from "../../assets/images/genres/action.jpg";
import adventureImg from "../../assets/images/genres/adventure.jpg";
import comedyImg from "../../assets/images/genres/comedy.jpg";
import dramaImg from "../../assets/images/genres/drama.jpg";
import fantasyImg from "../../assets/images/genres/fantasy.jpg";
import haremImg from "../../assets/images/genres/harem.jpg";
import joseiImg from "../../assets/images/genres/josei.jpg";
import magicImg from "../../assets/images/genres/magic.jpg";
import mechaImg from "../../assets/images/genres/mecha.jpg";
import musicImg from "../../assets/images/genres/music.jpg";
import psyImg from "../../assets/images/genres/psy.jpg";
import romanceImg from "../../assets/images/genres/romance.jpg";
import schoolImg from "../../assets/images/genres/school.jpg";
import shonenImg from "../../assets/images/genres/shonen.jpg";
import slideoflifeImg from "../../assets/images/genres/slideoflife.jpg";
import sportImg from "../../assets/images/genres/sport.jpg";
import supernatualImg from "../../assets/images/genres/supernatual.jpg";
import yuriImg from "../../assets/images/genres/yuri.jpg";


const GENRES_ITEM = [
    {
        key: "action",
        title: "Action",
        background: actionImg
    },
    {
        key: "adventure",
        title: "Adventure",
        background: adventureImg
    },
    {
        key: "comedy",
        title: "Comedy",
        background: comedyImg
    },
    {
        key: "romance",
        title: "Romance",
        background: romanceImg
    },
    {
        key: "drama",
        title: "Drama",
        background: dramaImg
    },
    {
        key: "mecha",
        title: "Mecha",
        background: mechaImg
    },
    {
        key: "slice-of-Life",
        title: "Slice of Life",
        background: slideoflifeImg
    },
    {
        key: "supernatural",
        title: "Supernatural",
        background: supernatualImg
    },
    {
        key: "magic",
        title: "Magic",
        background: magicImg
    },
    {
        key: "fantasy",
        title: "Fantasy",
        background: fantasyImg
    },
    {
        key: "psychological",
        title: "Psychological",
        background: psyImg
    },
    {
        key: "school",
        title: "School",
        background: schoolImg
    },
    {
        key: "sport",
        title: "Sport",
        background: sportImg
    },
    {
        key: "music",
        title: "Music",
        background: musicImg
    },
    {
        key: "shonen",
        title: "Shonen",
        background: shonenImg
    },
    {
        key: "yuri",
        title: "Yuri",
        background: yuriImg
    },
    {
        key: "josei",
        title: "Josei",
        background: joseiImg
    },
    {
        key: "harem",
        title: "Harem",
        background: haremImg
    }
]

// status 
/**
 * 0: đang chiếu :v
 * 1: sắp chiếu
 * 2: hoàn thành
 */

const DATA_MANGA = [
    {
        id: 1,
        thumbnail: "https://s199.imacdn.com/tt24/2020/03/27/ee63facad9f0518a_442115a9843e7858_255011585324379345957.jpg",
        name: "Manga Action",
        chapter: 123,
        view: 2999,
        status: 1,
        category: "action"
    },
    {
        id: 1,
        thumbnail: "https://s199.imacdn.com/tt24/2020/03/27/ee63facad9f0518a_442115a9843e7858_255011585324379345957.jpg",
        name: "Manga Action",
        chapter: 123,
        view: 2999,
        status: 1,
        category: "action"
    },
    {
        id: 1,
        thumbnail: "https://s199.imacdn.com/tt24/2020/03/27/ee63facad9f0518a_442115a9843e7858_255011585324379345957.jpg",
        name: "Manga Action",
        chapter: 123,
        view: 2999,
        status: 1,
        category: "action"
    },
    {
        id: 1,
        thumbnail: "https://s199.imacdn.com/tt24/2020/03/27/ee63facad9f0518a_442115a9843e7858_255011585324379345957.jpg",
        name: "Manga Action",
        chapter: 123,
        view: 2999,
        status: 1,
        category: "action"
    },
    {
        id: 1,
        thumbnail: "https://s199.imacdn.com/tt24/2020/03/27/ee63facad9f0518a_442115a9843e7858_255011585324379345957.jpg",
        name: "Manga Action",
        chapter: 123,
        view: 2999,
        status: 1,
        category: "action"
    },
    {
        id: 1,
        thumbnail: "https://s199.imacdn.com/tt24/2020/03/27/ee63facad9f0518a_442115a9843e7858_255011585324379345957.jpg",
        name: "Manga Action",
        chapter: 123,
        view: 2999,
        status: 1,
        category: "action"
    },
    {
        id: 1,
        thumbnail: "https://s199.imacdn.com/tt24/2020/03/27/ee63facad9f0518a_442115a9843e7858_255011585324379345957.jpg",
        name: "Manga Action",
        chapter: 123,
        view: 2999,
        status: 1,
        category: "action"
    },
    {
        id: 1,
        thumbnail: "https://s199.imacdn.com/tt24/2020/03/27/ee63facad9f0518a_442115a9843e7858_255011585324379345957.jpg",
        name: "Manga Action",
        chapter: 123,
        view: 2999,
        status: 1,
        category: "action"
    },
    {
        id: 1,
        thumbnail: "https://s199.imacdn.com/tt24/2020/03/27/ee63facad9f0518a_442115a9843e7858_255011585324379345957.jpg",
        name: "Manga Action",
        chapter: 123,
        view: 2999,
        status: 1,
        category: "action"
    },
    {
        id: 1,
        thumbnail: "https://s199.imacdn.com/tt24/2020/03/27/ee63facad9f0518a_442115a9843e7858_255011585324379345957.jpg",
        name: "Manga Action",
        chapter: 123,
        view: 2999,
        status: 1,
        category: "action"
    },
    {
        id: 1,
        thumbnail: "https://s199.imacdn.com/tt24/2020/03/27/ee63facad9f0518a_442115a9843e7858_255011585324379345957.jpg",
        name: "Manga Action",
        chapter: 123,
        view: 2999,
        status: 1,
        category: "action"
    },
    {
        id: 1,
        thumbnail: "https://s199.imacdn.com/tt24/2020/03/27/ee63facad9f0518a_442115a9843e7858_255011585324379345957.jpg",
        name: "Manga Action",
        chapter: 123,
        view: 2999,
        status: 1,
        category: "action"
    },
    {
        id: 1,
        thumbnail: "https://s199.imacdn.com/tt24/2020/03/27/ee63facad9f0518a_442115a9843e7858_255011585324379345957.jpg",
        name: "Manga Action",
        chapter: 123,
        view: 2999,
        status: 1,
        category: "action"
    },
    {
        id: 1,
        thumbnail: "https://s199.imacdn.com/tt24/2020/03/27/ee63facad9f0518a_442115a9843e7858_255011585324379345957.jpg",
        name: "Manga Action",
        chapter: 123,
        view: 2999,
        status: 1,
        category: "action"
    },
    {
        id: 1,
        thumbnail: "https://s199.imacdn.com/tt24/2020/03/27/ee63facad9f0518a_442115a9843e7858_255011585324379345957.jpg",
        name: "Manga Action",
        chapter: 123,
        view: 2999,
        status: 1,
        category: "action"
    },
    {
        id: 1,
        thumbnail: "https://s199.imacdn.com/tt24/2020/03/27/ee63facad9f0518a_442115a9843e7858_255011585324379345957.jpg",
        name: "Manga Action",
        chapter: 123,
        view: 2999,
        status: 1,
        category: "action"
    },
    {
        id: 1,
        thumbnail: "https://s199.imacdn.com/tt24/2020/03/27/ee63facad9f0518a_442115a9843e7858_255011585324379345957.jpg",
        name: "Manga Action",
        chapter: 123,
        view: 2999,
        status: 1,
        category: "action"
    },
    {
        id: 1,
        thumbnail: "https://s199.imacdn.com/tt24/2020/03/27/ee63facad9f0518a_442115a9843e7858_255011585324379345957.jpg",
        name: "Manga Action",
        chapter: 123,
        view: 2999,
        status: 1,
        category: "action"
    },
    {
        id: 1,
        thumbnail: "https://s199.imacdn.com/tt24/2020/03/27/ee63facad9f0518a_442115a9843e7858_255011585324379345957.jpg",
        name: "Manga Action",
        chapter: 123,
        view: 2999,
        status: 1,
        category: "action"
    },
    {
        id: 1,
        thumbnail: "https://s199.imacdn.com/tt24/2020/03/27/ee63facad9f0518a_442115a9843e7858_255011585324379345957.jpg",
        name: "Manga Action",
        chapter: 123,
        view: 2999,
        status: 1,
        category: "action"
    },
    // adventure
    {
        id: 1,
        thumbnail: "https://s199.imacdn.com/tt24/2020/08/31/4805659e644b4d8f_0769aa2ee4c001ca_337151598878817845957.jpg",
        name: "Manga Adventure",
        chapter: 123,
        view: 2999,
        status: 1,
        category: "adventure"
    },
    {
        id: 1,
        thumbnail: "https://s199.imacdn.com/tt24/2020/08/31/4805659e644b4d8f_0769aa2ee4c001ca_337151598878817845957.jpg",
        name: "Manga Adventure",
        chapter: 123,
        view: 2999,
        status: 1,
        category: "adventure"
    },
    {
        id: 1,
        thumbnail: "https://s199.imacdn.com/tt24/2020/08/31/4805659e644b4d8f_0769aa2ee4c001ca_337151598878817845957.jpg",
        name: "Manga Adventure",
        chapter: 123,
        view: 2999,
        status: 1,
        category: "adventure"
    },
    {
        id: 1,
        thumbnail: "https://s199.imacdn.com/tt24/2020/08/31/4805659e644b4d8f_0769aa2ee4c001ca_337151598878817845957.jpg",
        name: "Manga Adventure",
        chapter: 123,
        view: 2999,
        status: 1,
        category: "adventure"
    },
    {
        id: 1,
        thumbnail: "https://s199.imacdn.com/tt24/2020/08/31/4805659e644b4d8f_0769aa2ee4c001ca_337151598878817845957.jpg",
        name: "Manga Adventure",
        chapter: 123,
        view: 2999,
        status: 1,
        category: "adventure"
    },
    {
        id: 1,
        thumbnail: "https://s199.imacdn.com/tt24/2020/08/31/4805659e644b4d8f_0769aa2ee4c001ca_337151598878817845957.jpg",
        name: "Manga Adventure",
        chapter: 123,
        view: 2999,
        status: 1,
        category: "adventure"
    },
    {
        id: 1,
        thumbnail: "https://s199.imacdn.com/tt24/2020/08/31/4805659e644b4d8f_0769aa2ee4c001ca_337151598878817845957.jpg",
        name: "Manga Adventure",
        chapter: 123,
        view: 2999,
        status: 1,
        category: "adventure"
    },
    {
        id: 1,
        thumbnail: "https://s199.imacdn.com/tt24/2020/08/31/4805659e644b4d8f_0769aa2ee4c001ca_337151598878817845957.jpg",
        name: "Manga Adventure",
        chapter: 123,
        view: 2999,
        status: 1,
        category: "adventure"
    },
    {
        id: 1,
        thumbnail: "https://s199.imacdn.com/tt24/2020/08/31/4805659e644b4d8f_0769aa2ee4c001ca_337151598878817845957.jpg",
        name: "Manga Adventure",
        chapter: 123,
        view: 2999,
        status: 1,
        category: "adventure"
    },
    {
        id: 1,
        thumbnail: "https://s199.imacdn.com/tt24/2020/08/31/4805659e644b4d8f_0769aa2ee4c001ca_337151598878817845957.jpg",
        name: "Manga Adventure",
        chapter: 123,
        view: 2999,
        status: 1,
        category: "adventure"
    },
    {
        id: 1,
        thumbnail: "https://s199.imacdn.com/tt24/2020/08/31/4805659e644b4d8f_0769aa2ee4c001ca_337151598878817845957.jpg",
        name: "Manga Adventure",
        chapter: 123,
        view: 2999,
        status: 1,
        category: "adventure"
    },
    {
        id: 1,
        thumbnail: "https://s199.imacdn.com/tt24/2020/08/31/4805659e644b4d8f_0769aa2ee4c001ca_337151598878817845957.jpg",
        name: "Manga Adventure",
        chapter: 123,
        view: 2999,
        status: 1,
        category: "adventure"
    },
    {
        id: 1,
        thumbnail: "https://s199.imacdn.com/tt24/2020/08/31/4805659e644b4d8f_0769aa2ee4c001ca_337151598878817845957.jpg",
        name: "Manga Adventure",
        chapter: 123,
        view: 2999,
        status: 1,
        category: "adventure"
    },
    {
        id: 1,
        thumbnail: "https://s199.imacdn.com/tt24/2020/08/31/4805659e644b4d8f_0769aa2ee4c001ca_337151598878817845957.jpg",
        name: "Manga Adventure",
        chapter: 123,
        view: 2999,
        status: 1,
        category: "adventure"
    },
    {
        id: 1,
        thumbnail: "https://s199.imacdn.com/tt24/2020/08/31/4805659e644b4d8f_0769aa2ee4c001ca_337151598878817845957.jpg",
        name: "Manga Adventure",
        chapter: 123,
        view: 2999,
        status: 1,
        category: "adventure"
    },
    {
        id: 1,
        thumbnail: "https://s199.imacdn.com/tt24/2020/08/31/4805659e644b4d8f_0769aa2ee4c001ca_337151598878817845957.jpg",
        name: "Manga Adventure",
        chapter: 123,
        view: 2999,
        status: 1,
        category: "adventure"
    },
    {
        id: 1,
        thumbnail: "https://s199.imacdn.com/tt24/2020/08/31/4805659e644b4d8f_0769aa2ee4c001ca_337151598878817845957.jpg",
        name: "Manga Adventure",
        chapter: 123,
        view: 2999,
        status: 1,
        category: "adventure"
    },
    {
        id: 1,
        thumbnail: "https://s199.imacdn.com/tt24/2020/08/31/4805659e644b4d8f_0769aa2ee4c001ca_337151598878817845957.jpg",
        name: "Manga Adventure",
        chapter: 123,
        view: 2999,
        status: 1,
        category: "adventure"
    },
    {
        id: 1,
        thumbnail: "https://s199.imacdn.com/tt24/2020/08/31/4805659e644b4d8f_0769aa2ee4c001ca_337151598878817845957.jpg",
        name: "Manga Adventure",
        chapter: 123,
        view: 2999,
        status: 1,
        category: "adventure"
    },
    {
        id: 1,
        thumbnail: "https://s199.imacdn.com/tt24/2020/08/31/4805659e644b4d8f_0769aa2ee4c001ca_337151598878817845957.jpg",
        name: "Manga Adventure",
        chapter: 123,
        view: 2999,
        status: 1,
        category: "adventure"
    },
    // comedy
    {
        id: 1,
        thumbnail: "https://s199.imacdn.com/tt24/2022/12/26/8a29fb53c69c96f4_cf18e97a696de2f3_31029167204851319674.jpg",
        name: "Manga Comedy",
        chapter: 123,
        view: 2999,
        status: 1,
        category: "comedy"
    },
    {
        id: 1,
        thumbnail: "https://s199.imacdn.com/tt24/2022/12/26/8a29fb53c69c96f4_cf18e97a696de2f3_31029167204851319674.jpg",
        name: "Manga Comedy",
        chapter: 123,
        view: 2999,
        status: 1,
        category: "comedy"
    },
    {
        id: 1,
        thumbnail: "https://s199.imacdn.com/tt24/2022/12/26/8a29fb53c69c96f4_cf18e97a696de2f3_31029167204851319674.jpg",
        name: "Manga Comedy",
        chapter: 123,
        view: 2999,
        status: 1,
        category: "comedy"
    },
    {
        id: 1,
        thumbnail: "https://s199.imacdn.com/tt24/2022/12/26/8a29fb53c69c96f4_cf18e97a696de2f3_31029167204851319674.jpg",
        name: "Manga Comedy",
        chapter: 123,
        view: 2999,
        status: 1,
        category: "comedy"
    },
    {
        id: 1,
        thumbnail: "https://s199.imacdn.com/tt24/2022/12/26/8a29fb53c69c96f4_cf18e97a696de2f3_31029167204851319674.jpg",
        name: "Manga Comedy",
        chapter: 123,
        view: 2999,
        status: 1,
        category: "comedy"
    },
    {
        id: 1,
        thumbnail: "https://s199.imacdn.com/tt24/2022/12/26/8a29fb53c69c96f4_cf18e97a696de2f3_31029167204851319674.jpg",
        name: "Manga Comedy",
        chapter: 123,
        view: 2999,
        status: 1,
        category: "comedy"
    },
    {
        id: 1,
        thumbnail: "https://s199.imacdn.com/tt24/2022/12/26/8a29fb53c69c96f4_cf18e97a696de2f3_31029167204851319674.jpg",
        name: "Manga Comedy",
        chapter: 123,
        view: 2999,
        status: 1,
        category: "comedy"
    },
    {
        id: 1,
        thumbnail: "https://s199.imacdn.com/tt24/2022/12/26/8a29fb53c69c96f4_cf18e97a696de2f3_31029167204851319674.jpg",
        name: "Manga Comedy",
        chapter: 123,
        view: 2999,
        status: 1,
        category: "comedy"
    },
    {
        id: 1,
        thumbnail: "https://s199.imacdn.com/tt24/2022/12/26/8a29fb53c69c96f4_cf18e97a696de2f3_31029167204851319674.jpg",
        name: "Manga Comedy",
        chapter: 123,
        view: 2999,
        status: 1,
        category: "comedy"
    },
    {
        id: 1,
        thumbnail: "https://s199.imacdn.com/tt24/2022/12/26/8a29fb53c69c96f4_cf18e97a696de2f3_31029167204851319674.jpg",
        name: "Manga Comedy",
        chapter: 123,
        view: 2999,
        status: 1,
        category: "comedy"
    },
    // Romance
    {
        id: 1,
        thumbnail: "https://s199.imacdn.com/tt24/2022/12/26/4682ad05ce58fedd_8444707ba1f1d628_43975167204807379674.jpg",
        name: "Manga Romance",
        chapter: 123,
        view: 2999,
        status: 1,
        category: "romance"
    },
    {
        id: 1,
        thumbnail: "https://s199.imacdn.com/tt24/2022/12/26/4682ad05ce58fedd_8444707ba1f1d628_43975167204807379674.jpg",
        name: "Manga Romance",
        chapter: 123,
        view: 2999,
        status: 1,
        category: "romance"
    },
    {
        id: 1,
        thumbnail: "https://s199.imacdn.com/tt24/2022/12/26/4682ad05ce58fedd_8444707ba1f1d628_43975167204807379674.jpg",
        name: "Manga Romance",
        chapter: 123,
        view: 2999,
        status: 1,
        category: "romance"
    },
    {
        id: 1,
        thumbnail: "https://s199.imacdn.com/tt24/2022/12/26/4682ad05ce58fedd_8444707ba1f1d628_43975167204807379674.jpg",
        name: "Manga Romance",
        chapter: 123,
        view: 2999,
        status: 1,
        category: "romance"
    },
    {
        id: 1,
        thumbnail: "https://s199.imacdn.com/tt24/2022/12/26/4682ad05ce58fedd_8444707ba1f1d628_43975167204807379674.jpg",
        name: "Manga Romance",
        chapter: 123,
        view: 2999,
        status: 1,
        category: "romance"
    },
    {
        id: 1,
        thumbnail: "https://s199.imacdn.com/tt24/2022/12/26/4682ad05ce58fedd_8444707ba1f1d628_43975167204807379674.jpg",
        name: "Manga Romance",
        chapter: 123,
        view: 2999,
        status: 1,
        category: "romance"
    },
    {
        id: 1,
        thumbnail: "https://s199.imacdn.com/tt24/2022/12/26/4682ad05ce58fedd_8444707ba1f1d628_43975167204807379674.jpg",
        name: "Manga Romance",
        chapter: 123,
        view: 2999,
        status: 1,
        category: "romance"
    },
    {
        id: 1,
        thumbnail: "https://s199.imacdn.com/tt24/2022/12/26/4682ad05ce58fedd_8444707ba1f1d628_43975167204807379674.jpg",
        name: "Manga Romance",
        chapter: 123,
        view: 2999,
        status: 1,
        category: "romance"
    },
    {
        id: 1,
        thumbnail: "https://s199.imacdn.com/tt24/2022/12/26/4682ad05ce58fedd_8444707ba1f1d628_43975167204807379674.jpg",
        name: "Manga Romance",
        chapter: 123,
        view: 2999,
        status: 0,
        category: "romance"
    },
    {
        id: 1,
        thumbnail: "https://s199.imacdn.com/tt24/2022/12/26/4682ad05ce58fedd_8444707ba1f1d628_43975167204807379674.jpg",
        name: "Manga Romance",
        chapter: 123,
        view: 2999,
        status: 2,
        category: "romance"
    },
]

export default function Manga() {
    // route dom
    const params = useParams();
    // console.log(params.mangaId);
    // hook
    const [headingGenres, setHeadingGenres] = useState(params.mangaId || "action");
    const [keyGenres, setKeyGenres] = useState(params.mangaId || "action");
    const [numberRender, setNumberRender] = useState(12);
    const [dataManga, setDataManga] = useState([]);

    const PrepareDataManga = () => {
        setDataManga(DATA_MANGA.reduce((filtered, manga, index) => {
            if (filtered.length < numberRender) {
                if (manga.category == keyGenres.toLowerCase()) {
                    let man = DATA_MANGA[index];
                    filtered.push(man);
                }
            }

            return filtered;
        }, []));
    }

    useEffect(() => {
        PrepareDataManga();

        return () => { }
    }, [keyGenres, numberRender])

    return (
        <Fragment>
            <section className={clsx(styles.container)} >
                <div className={clsx(styles.genres)}>
                    {
                        GENRES_ITEM.map((item, index) => {
                            
                            return (
                                <div className={clsx(styles.itemWrap)} key={index}
                                    onClick={() => {
                                        setHeadingGenres(item.title);
                                        setKeyGenres(item.key);
                                        setNumberRender(12);
                                    }}
                                >
                                    <Link to={item.key}>
                                        <div className={clsx(styles.item)}
                                            style={{
                                                background: `url(${item.background}) center/cover no-repeat`
                                            }}
                                        >
                                            <p className={clsx(styles.title)}>
                                                {item.title}
                                            </p>
                                        </div>
                                    </Link>
                                </div>
                            )
                        })
                    }
                </div>
                <div className={clsx(styles.content)}>
                    <Heading>{headingGenres}</Heading>
                    <div className={clsx(styles.wrapper)}>
                        {
                            dataManga.map((item, index) => {
                                return (
                                    <ItemManga setColumn={6} key={index} data={item} />
                                )
                            })
                        }
                    </div>
                </div>
                {dataManga.length != 0 ?
                    <div className={clsx(styles.viewMore)}>
                        <Button primary medium onClick={() => {
                            setNumberRender(numberRender + 6);
                        }}>Xem thêm</Button>
                    </div>
                    :
                    <div className={clsx(styles.error)}>
                        <div className={clsx(styles.chatBox)}>
                            <p>Chưa có gì cho thể loại này</p>
                        </div>
                        <img src="https://www.sciener.my/wp-content/uploads/2018/10/scienerc-404-error-.png" alt="" />
                    </div>
                }
            </section>
        </Fragment>
    )
}