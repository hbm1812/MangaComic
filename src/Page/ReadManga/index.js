import clsx from "clsx";
import { Fragment, useContext, useEffect, useState } from "react";
import Button from "../../Components/Button";
import { AngleLeftIcon, AngleRightIcon, HouseIcon, SearchIcon, CaretDownIcon, CircleCheckIcon, BarsIcon, AddImageIcon, MinisizeIcon, MaxSizeIcon, ArrowDownIcon, ArrowsDownToLineIcon, ArrowsLeftRightToLineIcon, TableCellsLargeIcon, ArrowsToEyeIcon, XmarkIcon } from "../../Components/Icon";
import styles from "./ReadManga.module.scss";
import Modal from "../../Components/Modal";
import { Link, useNavigate, useParams } from "react-router-dom";
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import GlobalContext from "../../Contexts/GlobalContext";
import axios from "axios";
import { WindowScrollTop } from "../../util";

function ReadManga() {
    const navigate = useNavigate();
    const params = useParams();
    const { dataItemChapter, setDataItemChapter } = useContext(GlobalContext)
    // console.log("dataItemChapter", dataItemChapter)
    // console.log("params", params)

    const [showSidebar, setShowSidebar] = useState(true);

    // search text name chapter
    const [text, setText] = useState("");
    // let str = "Eighty Six, Chapter 4".includes(text)
    // console.log("TEST TEXT", str);
    // select type image
    const [typeImage, setTypeImage] = useState("default");
    // sources languages
    const [selectLanguages, setSelectLanguages] = useState("");
    const [toggleMenuLanguages, setToggleMenuLanguages] = useState(false);

    // data image 
    const [dataStory, setDataStory] = useState([]);
    const [dataChapter, setDataChapter] = useState([]);
    const [dataLanguages, setDataLanguages] = useState([]);
    const [dataChapterWithThumbnail, setDataChapterWithThumbnail] = useState([]);

    const [showBtnDisableNext, setShowBtnDisableNext] = useState(false);
    const [showBtnDisablePrev, setShowBtnDisablePrev] = useState(false);

    // findStory
    useEffect(() => {
        axios.get(`http://localhost/manga-comic-be/api/stories/findStory.php?keyword=${params.nameManga}`)
            .then((res) => {
                // setDataMangaItem(res.data);
                // console.log("item data", res.data)
                setDataStory(res.data)
            })

            .catch(() => {
                console.log("error")
            })
    }, []);

    // find chapter
    useEffect(() => {
        axios.get(`http://localhost/manga-comic-be/api/stories/getChapter.php?keyword=${params.nameManga}`)
            .then((res) => {
                // setDataMangaItem(res.data);
                // console.log("data chapter", res.data)
                setDataChapter(res.data)
            })

            .catch(() => {
                console.log("error")
            })
    }, []);
    const findChapterIndex = dataChapter.find((item) => item.id == params.idChapter)
    console.log("findChapterIndex", findChapterIndex)    

    const filterListChapter = dataChapter.filter((item) => {
        if (findChapterIndex && findChapterIndex !== {}) {            
            if (selectLanguages === "") {
                setSelectLanguages(findChapterIndex.languages);
                return item.languages === findChapterIndex.languages
            } else {
                return item.languages === selectLanguages
            }
        }
    })
    // console.log("filterListChapter", filterListChapter)

    const handleNextChapter = () => {
        if (filterListChapter.length !== 0) {
            setShowBtnDisablePrev(false);
            let chapterIndex = params.idChapter;
            const getChapterNext = filterListChapter.filter(item => item.id > chapterIndex);
            // console.log("getChapterNext", getChapterNext)
            if (getChapterNext.length === 1 || getChapterNext.length === 0) {
                setShowBtnDisableNext(true);
            }
            if (getChapterNext.length === 0) {
                // vòng lại về chapter 1
                // đến chapter cuối 
                // navigate(`/manga/read/${params.nameManga}/${filterListChapter[0].id}`)
            } else {
                navigate(`/manga/read/${params.nameManga}/${getChapterNext[0].id}`);
                WindowScrollTop();
            }
        }
    }

    const handlePrevChapter = () => {
        if (filterListChapter.length !== 0) {
            setShowBtnDisableNext(false);
            let chapterIndex = params.idChapter;
            const getChapterPrev = filterListChapter.filter(item => item.id < chapterIndex);
            // console.log("getChapterPrev", getChapterPrev)
            if (getChapterPrev.length === 1 || getChapterPrev.length === 0) {
                setShowBtnDisablePrev(true);
            }
            if (getChapterPrev.length === 0) {
                // đến chapter đầu 
                // navigate(`/manga/read/${params.nameManga}/${filterListChapter[filterListChapter.length - 1].id}`)
            } else {
                navigate(`/manga/read/${params.nameManga}/${getChapterPrev[getChapterPrev.length - 1].id}`)
                WindowScrollTop();
            }
        }
    }

    console.log("dataStory", dataStory)

    useEffect(() => {
        axios.get(`http://localhost/manga-comic-be/api/stories/getLanguagesInChapter.php?keyword=${params.nameManga}`)
            .then((res) => {
                // console.log("data Languages", res.data)
                setDataLanguages(res.data)
            })

            .catch(() => {
                console.log("error")
            })
    }, []);

    useEffect(() => {
        axios.get(`http://localhost/manga-comic-be/api/stories/findChapterImage.php?chapter_id=${params.idChapter}`)
            .then((res) => {
                // console.log("data chapter with thumbnail", res.data)
                setDataChapterWithThumbnail(res.data)
            })

            .catch(() => {
                console.log("error")
            })
    }, [params.idChapter]);
    return (
        <div className={clsx(styles.container)}>
            {showSidebar &&
                <div className={clsx(styles.sidebar)}>
                    <div className={clsx(styles.top)}>
                        <HouseIcon className={clsx(styles.icon)}
                            onClick={() => {
                                // return pages home
                                navigate(`/manga/detail/${dataStory.length !== 0 && dataStory[0].keyword}/${dataStory.length !== 0 && dataStory[0].id}`);
                            }}
                        />
                        <h3 className={clsx(styles.name)}>{dataStory.length !== 0 && dataStory[0].name}</h3>
                        <AngleLeftIcon className={clsx(styles.icon)}
                            onClick={() => {
                                setShowSidebar(false);
                            }}
                        />
                    </div>
                    <div className={clsx(styles.navbar)}>
                        {showBtnDisablePrev ?
                            <XmarkIcon className={clsx(styles.icon)} />
                            :
                            <AngleLeftIcon className={clsx(styles.icon)}
                                onClick={() => handlePrevChapter()}
                            />
                        }
                        <h3 className={clsx(styles.chapter)}>{findChapterIndex && `Chapter ${findChapterIndex.chapter_index}`}</h3>
                        {showBtnDisableNext ?
                            <XmarkIcon className={clsx(styles.icon)} />
                            :
                            <AngleRightIcon className={clsx(styles.icon)}
                                onClick={() => handleNextChapter()}
                            />
                        }
                    </div>
                    <div className={clsx(styles.mode)}>
                        <div className={clsx(styles.top)}>
                            <p>Change Size Image:</p>
                            <div className={clsx(styles.iconWrapper)} title="change image">
                                <AddImageIcon className={clsx(styles.icon)}
                                    onClick={() => {
                                        if (typeImage === "default") {
                                            setTypeImage("maxsize");
                                        } else if (typeImage === "maxsize") {
                                            setTypeImage("minisize");
                                        } else if (typeImage === "minisize") {
                                            setTypeImage("default");
                                        }
                                    }}
                                />
                            </div>
                        </div>
                        <div className={clsx(styles.desc)}>
                            <p>Image :
                                {typeImage === "maxsize" ?
                                    <MaxSizeIcon className={clsx(styles.icon)} />
                                    : typeImage === "minisize" ?
                                        <MinisizeIcon className={clsx(styles.icon)} />
                                        : typeImage === "default" ?
                                            <ArrowsToEyeIcon className={clsx(styles.icon)} />
                                            : ""
                                }
                            </p>
                        </div>
                    </div>
                    <div className={clsx(styles.search)}>
                        <SearchIcon className={clsx(styles.icon)} />
                        <input type="" name="" value={text}
                            placeholder="Hãy nhập Chapter bạn cần tìm"
                            onChange={(e) => setText(e.target.value)}
                        />
                    </div>
                    <div className={clsx(styles.sourcesWrap)}>
                        <label htmlFor="">
                            Languages:
                        </label>
                        <div className={clsx(styles.sourcesLanguages)}
                            onClick={() => {
                                setToggleMenuLanguages(!toggleMenuLanguages)
                            }}
                        >
                            <p>{selectLanguages}</p>
                            <CaretDownIcon className={clsx(styles.icon)} />
                            {toggleMenuLanguages &&
                                <ul className={clsx(styles.menu)}>
                                    {dataLanguages.length !== 0 &&
                                        dataLanguages.map((item, index) => {
                                            return (
                                                <li className={clsx(styles.item)} key={index}
                                                    onClick={() => {
                                                        setSelectLanguages(item.languages)
                                                    }}
                                                >
                                                    {item.languages}
                                                    {selectLanguages === item.languages && <CircleCheckIcon className={clsx(styles.iconSelect)} />}
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            }
                        </div>
                    </div>
                    <div className={clsx(styles.chapterContent)}>
                        {text === "" ?
                            <Fragment>
                                {filterListChapter.length !== 0 &&
                                    filterListChapter.map((item, index) => {
                                        return (
                                            <Link className={clsx(styles.item)} key={index}
                                                to={`/manga/read/${item.keyword}/${item.id}`}
                                            >
                                                <span>{item.name}</span>
                                            </Link>
                                        )
                                    })
                                }
                            </Fragment>
                            :
                            <Fragment>
                                {filterListChapter.length !== 0 &&
                                    filterListChapter.map((item, index) => {
                                        let getName = item.name;
                                        let getNameLowerCase = getName.toLowerCase();
                                        let getNameUpperCase = getName.toUpperCase();
                                        let checkSearchLowerCase = getNameLowerCase.includes(text);
                                        let checkSearchUpperCase = getNameUpperCase.includes(text);
                                        let checkSearchPrimary = getName.includes(text);

                                        if (checkSearchLowerCase || checkSearchUpperCase || checkSearchPrimary) {
                                            return (
                                                <Link className={clsx(styles.item)} key={index}
                                                    to={`/manga/read/${item.keyword}/${item.id}`}
                                                >
                                                    <span>{item.name}</span>
                                                </Link>
                                            )
                                        }
                                    })
                                }
                            </Fragment>
                        }

                    </div>
                </div>
            }
            {!showSidebar &&
                <BarsIcon className={clsx(styles.menuIcon)}
                    onClick={() => {
                        setShowSidebar(true);
                    }}
                />
            }

            {/* column */}
            <div className={clsx(styles.manga, {
                [styles.showSidebar]: showSidebar,
                [styles.hideSidebar]: showSidebar === false,
            })}>
                {dataChapterWithThumbnail.length !== 0 &&
                    <Fragment>
                        {dataChapterWithThumbnail.map((item, index) => {
                            return (
                                <div className={clsx(styles.imgWrap, {
                                    [styles.default]: typeImage === "default",
                                    [styles.maxsize]: typeImage === "maxsize",
                                    [styles.minisize]: typeImage === "minisize",
                                })}
                                    key={index}
                                >
                                    <img src={item.thumbnail} alt="" />
                                </div>
                            )
                        })}
                        <div className={clsx(styles.userActive)}>
                            <Button primary medium iconLeft={<AngleLeftIcon />}
                                disabled={showBtnDisablePrev}
                                onClick={() => handlePrevChapter()}
                            >Previous Chapter</Button>
                            <Button primary medium iconRight={<AngleRightIcon />}
                                disabled={showBtnDisableNext}
                                onClick={() => handleNextChapter()}
                            >Next Chapter</Button>
                        </div>
                    </Fragment>
                }
            </div>

        </div>
    );
}

export default ReadManga;