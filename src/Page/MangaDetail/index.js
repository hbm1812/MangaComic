import clsx from "clsx";
import Button from "../../Components/Button";
import { DotCircleIcon, PlayIcon, HeartIcon, FaceSmileIcon, CaretDownIcon, CircleCheckIcon } from "../../Components/Icon";
import styles from "./MangaDetail.module.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Heading from "../../Components/Heading";
import Character from "../../Components/Character";
import axios, { Axios } from "axios";

// test img
import Lena86 from "../../assets/images/characters/lena86.png";
import Shin86 from "../../assets/images/characters/shin86.png";
import Marin from "../../assets/images/characters/marin.png";
import ItemManga from "../../Components/ItemManga";

// data
import { dataManga } from "../../data/manga";
import Comments from "../../Components/Comments";
import GlobalContext from "../../Contexts/GlobalContext";

const CHARACTER = [
    {
        id: 1,
        name: "Lena",
        avatar: Lena86,
        charFull: Lena86,
        role: "main",
        desc: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    },
    {
        id: 2,
        name: "Shin",
        avatar: Shin86,
        charFull: Shin86,
        role: "main",
        desc: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    },
    {
        id: 3,
        name: "name Char",
        avatar: Lena86,
        charFull: Lena86,
        role: "main",
        desc: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    },
    {
        id: 4,
        name: "name Char",
        avatar: Lena86,
        charFull: Lena86,
        role: "main",
        desc: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    },
    {
        id: 5,
        name: "name Char",
        avatar: Lena86,
        charFull: Lena86,
        role: "main",
        desc: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    },
    {
        id: 6,
        name: "name Char",
        avatar: Lena86,
        charFull: Lena86,
        role: "main",
        desc: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    },
    {
        id: 7,
        name: "name Char",
        avatar: Lena86,
        charFull: Lena86,
        role: "main",
        desc: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    },
    {
        id: 8,
        name: "name Char",
        avatar: Lena86,
        charFull: Lena86,
        role: "main",
        desc: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    },
    {
        id: 9,
        name: "name Char",
        avatar: Lena86,
        charFull: Lena86,
        role: "main",
        desc: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    },
    {
        id: 10,
        name: "name Char",
        avatar: Lena86,
        charFull: Lena86,
        role: "main",
        desc: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    },
    {
        id: 11,
        name: "name Char",
        avatar: Lena86,
        charFull: Lena86,
        role: "main",
        desc: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    },
    {
        id: 12,
        name: "name Char name Char name Char",
        avatar: Lena86,
        charFull: Marin,
        role: "main",
        desc: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like). It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
    },
]

function MangaDetail() {
    const params = useParams();
    // console.log("params", params)
    const navigate = useNavigate();
    const { dataItemChapter, setDataItemChapter, selectedIdCharacter, setSelectedIdCharacter } = useContext(GlobalContext);
    // console.log("dataItemChapter", dataItemChapter)
    // sources languages
    const [selectLanguages, setSelectLanguages] = useState("");
    const [toggleMenuLanguages, setToggleMenuLanguages] = useState(false);
    // chapter
    const [selectChapter, setSelectChapter] = useState("1 - 10")
    const [toggleMenuChapter, setToggleMenuChapter] = useState(false);
    // characters
    const [toggleDetailChar, setToggleDetailChar] = useState(false);
    const [showDetailChar, setShowDetailChar] = useState(selectedIdCharacter);

    useEffect(() => {
        setShowDetailChar(selectedIdCharacter)
    }, [selectedIdCharacter])
    console.log("showDetailChar", showDetailChar)
    // data 
    const [itemManga, setItemManga] = useState([]);
    const [dataCategoryInStory, setDataCategoryInStory] = useState([]);
    const [dataChapter, setDataChapter] = useState([]);
    const [dataLanguages, setDataLanguages] = useState([]);

    // login user 
    const LocalUserLogin = JSON.parse(localStorage.getItem("DataUser")) ?? null;
    console.log("LocalUserLogin", LocalUserLogin)

    // user active 
    const [activeView, setActiveView] = useState(false);
    const [listActiveView, setListActiveView] = useState([]);
    const [activeFavorite, setActiveFavorite] = useState(false);
    const [listActiveFavorite, setListActiveFavorite] = useState([]);


    // findStory
    useEffect(() => {
        axios.get(`http://localhost/manga-comic-be/api/stories/findStory.php?keyword=${params.nameManga}`)
            .then((res) => {
                // setDataMangaItem(res.data);
                // console.log("item data", res.data)
                setItemManga(res.data)
            })

            .catch(() => {
                console.log("error")
            })
    }, [params.nameManga]);

    // get all category in story
    useEffect(() => {
        axios.get("http://localhost/manga-comic-be/api/stories/findcategory.php")
            .then((res) => {
                setDataCategoryInStory(res.data)
            })

            .catch(() => {
                console.log("error")
            })
    }, []);
    let findCategory = [];
    if (itemManga.length !== 0) {
        findCategory = dataCategoryInStory.filter(item => item.story_id === itemManga[0].id)
    }

    console.log("findCategory", findCategory)

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

    const getListChapter = dataChapter.reduce((newArr, item, index) => {
        if (item.languages === selectLanguages) {
            let startChaper = (item.name).split(" ");
            let getStartIndex = startChaper[startChaper.length - 1];
            let convertStartIndex = parseInt(getStartIndex);
            let getChapterFromTo;
            if (convertStartIndex === 1) {
                let start = convertStartIndex;
                let end = convertStartIndex * 10;
                getChapterFromTo = `${start} - ${end}`;
                newArr.push(getChapterFromTo);
            } else if (convertStartIndex > 1) {
                let start = convertStartIndex * 10 - 9;
                let end = convertStartIndex * 10;

                let check = dataChapter[dataChapter.length - 1].name.split(" ");
                let getChapter = check[check.length - 1];
                let convertGetChapter = parseInt(getChapter);

                if (start < convertGetChapter) {
                    getChapterFromTo = `${start} - ${end}`;
                    newArr.push(getChapterFromTo);
                }

            }
        }


        return newArr;
    }, [])
    // console.log("getListChapter", getListChapter)
    // console.log("dataChapter", dataChapter)

    // get all languages in story
    useEffect(() => {
        axios.get(`http://localhost/manga-comic-be/api/stories/getLanguagesInChapter.php?keyword=${params.nameManga}`)
            .then((res) => {
                // setDataMangaItem(res.data);
                setDataLanguages(res.data)
                if (res.data) {
                    setSelectLanguages(res.data[0].languages);
                }
            })

            .catch(() => {
                console.log("error")
            })
    }, []);
    // console.log("dataLanguages", dataLanguages)

    useEffect(() => {
        axios.get(`http://localhost/manga-comic-be/api/stories/getViews.php`)
            .then((res) => {
                setListActiveView(res.data)
            })

            .catch(() => {
                console.log("error")
            })
    }, [])

    const filterCountView = itemManga.length > 0 && listActiveView.filter(item => item.stories_id === itemManga[0].id)
    // console.log("filterCountView", filterCountView);
    // console.log("itemManga", itemManga)
    // console.log("filterCountView", filterCountView)

    const handleAddViews = () => {
        if (LocalUserLogin) {
            const data = new FormData();
            console.log("data", data)

            data.append("user_id", LocalUserLogin.id);
            data.append("stories_id", params.idManga);

            axios({
                method: "POST",
                url: "http://localhost/manga-comic-be/api/stories/addView.php",
                data: data,
                headers: { "Content-Type": "multipart/form-data" },
            })
                .then(() => {
                    console.log("success");
                    setActiveView(!activeView);
                })
                .catch(() => {
                    console.log("error");
                })

            // console.log("data:", data);
            // console.log("data entry:", Object.fromEntries(data.entries()))
        }
    }

    useEffect(() => {
        axios.get(`http://localhost/manga-comic-be/api/stories/getFavorite.php`)
            .then((res) => {
                setListActiveFavorite(res.data)
            })

            .catch(() => {
                console.log("error")
            })
    }, [activeFavorite])

    const filterCountFavorite = itemManga.length > 0 && listActiveFavorite.filter(item => item.stories_id == itemManga[0].id)
    console.log("filterCountFavorite", filterCountFavorite)
    // console.log("listActiveFavorite", listActiveFavorite)    

    const handleAddFavorite = () => {
        let filterFavoriteActive = listActiveFavorite.filter(item => item.stories_id == params.idManga && item.user_id == LocalUserLogin.id)
        // console.log("filterFavoriteActive", filterFavoriteActive);

        if (LocalUserLogin && filterFavoriteActive.length < 1) {
            const data = new FormData();
            console.log("data", data)

            data.append("user_id", LocalUserLogin.id);
            data.append("stories_id", params.idManga);

            axios({
                method: "POST",
                url: "http://localhost/manga-comic-be/api/stories/addFavorite.php",
                data: data,
                headers: { "Content-Type": "multipart/form-data" },
            })
                .then(() => {
                    console.log("success");
                    setActiveFavorite(!activeFavorite);
                })
                .catch(() => {
                    console.log("error");
                })

            // console.log("data:", data);
            // console.log("data entry:", Object.fromEntries(data.entries()))
        }
    }

    // getSatisfied
    let getSatisfied = 0;
    if(filterCountFavorite.length !== 0 && filterCountView.length !== 0) {
        getSatisfied =(filterCountFavorite.length / filterCountView.length * 100).toPrecision(4);    
    }

    console.log("filterCountFavorite.length", filterCountFavorite.length)
    console.log("filterCountView.length", filterCountView.length)
    console.log("getSatisfied", getSatisfied)


    const [storiesGenres, setStoriesGenres] = useState([]);
    // get story with genres 
    useEffect(() => {
        axios.get(`http://localhost/manga-comic-be/api/stories/getStoriesGenres.php`)
            .then((res) => {
                // setDataChapter(res.data)
                setStoriesGenres(res.data)
            })

            .catch(() => {
                console.log("error")
            })
    }, []);
    // console.log("storiesGenres", storiesGenres)

    // let newArrWithGenres = [];
    // let filterStoryWithGenres = [];
    // useEffect(() => {
    //     for(let i = 0; i< findCategory.length; i++){
    //         console.log("findCategory index", findCategory[i].id)
    //         filterStoryWithGenres = storiesGenres.filter(item => item.story_id == params.idManga);
    //     }


    // }, [findCategory])
    let filterStoryWithGenres = [];
    for (let i = 0; i < findCategory.length; i++) {
        let genres = storiesGenres.filter(item => item.genres_id == findCategory[i].id)
        console.log("genres index", genres)
        if (genres.length > 0) {
            let index = 0;
            let newArr = genres.filter(item => item.story_id != params.idManga);
            console.log("newArr", newArr)
            if (newArr.length > 0) {
                if (index >= newArr.length) {
                    break;
                } else {
                    filterStoryWithGenres.push(newArr[index]);
                    index++;
                    console.log("index", index);
                }
            }
        }
    }

    // let newArr = [];
    // if(filterStoryWithGenres.length > 0) {
    //     filterStoryWithGenres.map((item, index) => {
    //         console.log("item genres", item);
    //         // let man = item[index].concat(item[index + 1]);
    //         // newArr.push(man);
    //     })
    // }
    // console.log("newArr", newArr)

    // console.log("filterStoryWithGenres", filterStoryWithGenres)
    // // const filterPhase2 = filterStoryWithGenres.filter(item => )

    const [dataManga, setDataManga] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost/manga-comic-be/api/stories/read.php`)
            .then((res) => {
                // setDataChapter(res.data)
                setDataManga(res.data)
            })

            .catch(() => {
                console.log("error")
            })
    }, []);
    console.log("filterStoryWithGenres", filterStoryWithGenres)
    console.log("dataManga", dataManga)
    console.log("dataChapter", dataChapter)

    let chapterMax = 0;
    let arrSaveDataChapterLastest = [];
    const dataChapterLastest = dataChapter.filter(item => {
        console.log("chapter lastest", item)
        let handleName = item.name.split(" ");
        let getArr = parseInt(handleName[handleName.length - 1]);
        if (chapterMax < getArr) {
            if(arrSaveDataChapterLastest.length > 0) {
                arrSaveDataChapterLastest.pop();
            }
            chapterMax = getArr;
            arrSaveDataChapterLastest.push(item);
            return item;
        }
    })

    console.log("arrSaveDataChapterLastest", arrSaveDataChapterLastest)
    // console.log("chapterMax", chapterMax)


    const filterMangaRecommend = [];
    for (let j = 0; j < filterStoryWithGenres.length; j++) {
        let manga = dataManga.filter(item => item.id === filterStoryWithGenres[j].story_id)                        
        filterMangaRecommend.push(manga[0])
    }
    // console.log("filterMangaRecommend final", filterMangaRecommend)
    let handleMangaRecommendRepeat = new Set(filterMangaRecommend)
    // console.log("handleMangaRecommendRepeat final", handleMangaRecommendRepeat)
    let dataMangaRecommendConvertToArr = [...handleMangaRecommendRepeat];
    // console.log("dataMangaRecommendConvertToArr final", dataMangaRecommendConvertToArr)
    
    // console.log("itemManga", itemManga)

    // get character 
    const [listCharacter, setListCharacter] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost/manga-comic-be/api/stories/getCharacter.php?story_id=${params.idManga ?? ""}`)
            .then((res) => {
                setListCharacter(res.data)
            })

            .catch(() => {
                console.log("error")
            })
    }, [params.nameManga])

    console.log("listCharacter", listCharacter);

    return (
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.banner)}
                style={{ background: `url(${itemManga.length !== 0 && itemManga[0].background}) center/cover no-repeat` }}
            >
                <div className={clsx(styles.info)}>
                    <div className={clsx(styles.imageWrap)}>
                        {itemManga.length !== 0 &&
                            <img src={itemManga[0].thumbnail} alt="" />
                        }

                    </div>
                    <div className={clsx(styles.detail)}>
                        {itemManga.length > 0 &&
                            <div className={clsx(styles.detailTop)}>
                                <Button primary medium scale iconLeft={<PlayIcon />}
                                    to={`/manga/read/${itemManga[0].keyword}/${itemManga[0].id}`}
                                    onClick={() => { }}
                                >Read Now</Button>
                                {arrSaveDataChapterLastest.length > 0 &&
                                    <Button primary medium scale
                                        to={`/manga/read/${arrSaveDataChapterLastest[0].keyword}/${arrSaveDataChapterLastest[0].id}`}
                                        onClick={() => { }}
                                    >Chapter Lastest</Button>                                
                                }
                            </div>
                        }
                        <div className={clsx(styles.detailMain)}>
                            <h1 className={clsx(styles.name)}>
                                {itemManga.length !== 0 && itemManga[0].name}
                            </h1>
                            <ul className={clsx(styles.genres)}>
                                {findCategory.length !== 0 && findCategory.map((item, index) => {
                                    return (
                                        <Link to={`/manga/${item.keyword}`} key={index}>
                                            <li>{item.name}</li>
                                        </Link>
                                    )
                                })}
                            </ul>
                            <h5 className={clsx(styles.desc)}>
                                {itemManga.length !== 0 && itemManga[0].desc}
                            </h5>
                        </div>
                        <div className={clsx(styles.detailBottom)}>
                            <p className={clsx(styles.author)}>
                                Author
                                {itemManga.length !== 0 &&
                                    <span>{itemManga[0].author_alias ?? itemManga[0].author_name}</span>
                                }
                            </p>
                            <p className={clsx(styles.country)}>
                                Country
                                <span>{itemManga.length > 0 && itemManga[0].country}</span>
                            </p>
                            <p className={clsx(styles.status)}>
                                Status
                                {itemManga.length !== 0 &&
                                    <span>
                                        <DotCircleIcon
                                            className={clsx(styles.statusDot, {
                                                [styles.comingSoon]: itemManga[0].status_id === 2,
                                                [styles.drop]: !itemManga[0].status_id,
                                                [styles.complete]: itemManga[0].status_id === 3,
                                                [styles.releasing]: itemManga[0].status_id === 1,
                                            })}
                                        />
                                        {itemManga[0].status_name}
                                    </span>
                                }
                            </p>
                            {itemManga.length !== 0 &&
                                <div className={clsx(styles.evaluate)}>
                                    <div className={clsx(styles.satisfied)}>
                                        <FaceSmileIcon className={clsx(styles.icon)} />
                                        <p>
                                            {getSatisfied}%
                                        </p>
                                    </div>
                                    <div className={clsx(styles.favorite)}>
                                        <HeartIcon className={clsx(styles.icon, {
                                            // [styles.active]: true
                                        })}
                                            onClick={handleAddFavorite}
                                        />
                                        <p>{filterCountFavorite.length ?? itemManga[0].favorite_count}</p>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>

            <div className={clsx(styles.content)}>
                <div className={clsx(styles.chapterWrapper)}>
                    <div className={clsx(styles.infoMore)}>
                        <div className={clsx(styles.item)}>
                            <p className={clsx(styles.key)}>
                                English
                            </p>
                            <p className={clsx(styles.value)}>
                                {itemManga.length !== 0 && itemManga[0].name_english || "Not found :("}
                            </p>
                        </div>
                        <div className={clsx(styles.item)}>
                            <p className={clsx(styles.key)}>
                                Japan
                            </p>
                            <p className={clsx(styles.value)}>
                                {/* 先輩がうざい後輩の話 */}
                                {itemManga.length !== 0 && itemManga[0].name_japan || "Not found :("}
                            </p>
                        </div>
                        <div className={clsx(styles.item)}>
                            <p className={clsx(styles.key)}>
                                romanji
                            </p>
                            <p className={clsx(styles.value)}>
                                {itemManga.length !== 0 && itemManga[0].name_romanji || "Not found :("}
                            </p>
                        </div>
                        <div className={clsx(styles.item)}>
                            <p className={clsx(styles.key)}>
                                views
                            </p>
                            <p className={clsx(styles.value)}>
                                {filterCountView && filterCountView.length}
                            </p>
                        </div>
                        <div className={clsx(styles.item)}>
                            <p className={clsx(styles.key)}>
                                favorite
                            </p>
                            <p className={clsx(styles.value)}>
                                {filterCountFavorite && filterCountFavorite.length}
                            </p>
                        </div>
                    </div>
                    <div className={clsx(styles.chapter)}>
                        <Heading>Danh sách chương</Heading>
                        <div className={clsx(styles.top)}>
                            <label htmlFor="">
                                Languages:
                            </label>
                            <div className={clsx(styles.sourcesLanguages)}
                                onClick={() => {
                                    setToggleMenuLanguages(!toggleMenuLanguages);
                                }}
                            >
                                <p>{selectLanguages}</p>
                                <CaretDownIcon className={clsx(styles.icon)} />
                                {
                                    toggleMenuLanguages &&
                                    <ul className={clsx(styles.menu)}>
                                        {dataLanguages.length !== 0 && dataLanguages.map((item, index) => {
                                            return (
                                                <li className={clsx(styles.item)} key={index}
                                                    onClick={() => {
                                                        setSelectLanguages(item.languages);
                                                        setSelectChapter("1 - 10");
                                                    }}
                                                >
                                                    {item.languages}
                                                    {selectLanguages == item.languages && <CircleCheckIcon className={clsx(styles.iconSelect)} />}
                                                </li>
                                            )
                                        })}

                                    </ul>
                                }
                            </div>
                            <div className={clsx(styles.chap)}
                                onClick={() => {
                                    setToggleMenuChapter(!toggleMenuChapter);
                                }}
                            >
                                <p>{selectChapter}</p>
                                <CaretDownIcon className={clsx(styles.icon)} />
                                {
                                    toggleMenuChapter &&
                                    <ul className={clsx(styles.menu)}>
                                        {getListChapter.map((item, index) => {
                                            console.log("item", item)
                                            return (
                                                <li className={clsx(styles.item)} key={index}
                                                    onClick={() => {
                                                        setSelectChapter(item)
                                                    }}
                                                >
                                                    {item}
                                                    {selectChapter === item && <CircleCheckIcon className={clsx(styles.iconSelect)} />}
                                                </li>
                                            )
                                        })}
                                    </ul>
                                }
                            </div>
                            <div className={clsx(styles.languages)}>
                                {selectLanguages}
                            </div>
                        </div>
                        <div className={clsx(styles.chapterContent)}>
                            {
                                dataChapter.map((item, index) => {
                                    // console.log("selectChapter", selectChapter);
                                    // handle chapter 
                                    // console.log("item chapter", item);
                                    let handleChapter = selectChapter.split(" ");
                                    let start = parseInt(handleChapter[0]);
                                    let end = parseInt(handleChapter[handleChapter.length - 1]);
                                    // console.log("handleChapter", handleChapter)
                                    let getChapterIndex = parseInt(item.chapter_index);

                                    if (getChapterIndex >= start && getChapterIndex <= end && item.languages === selectLanguages) {
                                        return (
                                            <Link className={clsx(styles.item)} key={index}
                                                to={`/manga/read/${item.keyword}/${item.id}`}
                                                onClick={() => {
                                                    setDataItemChapter(item)
                                                    handleAddViews()
                                                }}
                                            >
                                                <span>{item.name}</span>
                                            </Link>
                                        )
                                    }
                                })
                            }
                        </div>
                    </div>
                </div>
                {listCharacter.length > 0 && 
                    <div className={clsx(styles.characters)}>
                        <Heading>Nhân vật</Heading>
                        <div className={clsx(styles.listAvatarChar)}>
                            {/* {CHARACTER.map((item, index) => {
                                return (
                                    <Character item={item} key={index} showDetailChar={showDetailChar} toggleDetailChar={toggleDetailChar} onClick={() => {
                                        setShowDetailChar(index)
                                        setToggleDetailChar(!toggleDetailChar)
                                    }} />
                                )
                            })} */}

                            {listCharacter.map((item, index) => {
                                return (
                                    <Character item={item} key={index} showDetailChar={showDetailChar} toggleDetailChar={toggleDetailChar} listCharacter={listCharacter} onClick={() => {
                                        setSelectedIdCharacter(item.id)
                                        setToggleDetailChar(!toggleDetailChar)
                                    }} />
                                )
                            })}
                            {
                                // itemManga[0].character.map((item, index) => (
                                //     <Character item={item} key={index} showDetailChar={showDetailChar} toggleDetailChar={toggleDetailChar} onClick={() => {
                                //         setShowDetailChar(index)
                                //         setToggleDetailChar(!toggleDetailChar)
                                //     }} />
                                // ))
                            }
                        </div>
                    </div>                
                }

                {/* <div className={clsx(styles.relation)}>
                    <Heading primary>Liên quan</Heading>
                    <div className={clsx(styles.listItem)}>
                        <ItemManga setColumn={6} />
                        <ItemManga setColumn={6} />
                        <ItemManga setColumn={6} />
                        <ItemManga setColumn={6} />
                        <ItemManga setColumn={6} />
                        <ItemManga setColumn={6} />
                    </div>
                </div> */}

                <div className={clsx(styles.recommend)}>
                    <Heading primary>Đề xuất dành cho bạn</Heading>
                    <div className={clsx(styles.listItem)}>
                        {dataMangaRecommendConvertToArr.length > 0 && dataMangaRecommendConvertToArr !== undefined &&
                            dataMangaRecommendConvertToArr.map((item, index) => {
                                // console.log("filterMangaRecommend", filterMangaRecommend)
                                // console.log("filterMangaRecommend item", item)
                                return (
                                    <ItemManga setColumn={6} data={item} key={index} to={`/manga/detail/${item && item.keyword}/${item && item.id}`} />
                                )
                            })
                        }
                    </div>
                </div>

                <div className={clsx(styles.comment)}>
                    <Heading primary>Bình luận</Heading>
                    {LocalUserLogin ?
                        <Comments currentUserId={LocalUserLogin.id} />
                        :
                        <Comments />
                    }
                </div>
            </div>

        </div>
    );
}

export default MangaDetail;