import clsx from "clsx";
import Button from "../../Components/Button";
import { DotCircleIcon, PlayIcon, HeartIcon, FaceSmileIcon, CaretDownIcon, CircleCheckIcon } from "../../Components/Icon";
import styles from "./MangaDetail.module.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Heading from "../../Components/Heading";
import Character from "../../Components/Character";

// test img
import Lena86 from "../../assets/images/characters/lena86.png";
import Shin86 from "../../assets/images/characters/shin86.png";
import Marin from "../../assets/images/characters/marin.png";
import ItemManga from "../../Components/ItemManga";

// data
import { dataManga } from "../../data/manga";
import Comments from "../../Components/Comments";


const SOURCES = [
    {
        sources: "comik",
    },
    {
        sources: "nettruyen",
    },
    {
        sources: "mangaK",
    }
]

const CHAPTER = [
    {
        title: "Giới thiệu chung",
        chapter: 1,
    },
    {
        title: "Khởi hành",
        chapter: 2,
    },
    {
        title: "Gặp gỡ",
        chapter: 3,
    },
    {
        title: "định mệnh",
        chapter: 4,
    },
    {
        title: "đại chiến bùng nổ :V",
        chapter: 5,
    },
    {
        title: "người bạn mới",
        chapter: 6,
    },
    {
        title: "cuộc chiến vô hạn",
        chapter: 7,
    },
    {
        title: "lorem impsum",
        chapter: 8,
    },
    {
        title: "hello",
        chapter: 9,
    },
    {
        title: "hello",
        chapter: 10,
    },
    {
        title: "hello",
        chapter: 11,
    },
    {
        title: "hello",
        chapter: 101,
    },
    {
        title: "hello",
        chapter: 102,
    },
]

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
    const navigate = useNavigate();

    const [status, setStatus] = useState("complete");
    // Sources
    const [sources, setSources] = useState(SOURCES);
    const [selectSource, setSelectSource] = useState(SOURCES[0].sources)
    const [toggleMenuSource, setToggleMenuSource] = useState(false);
    // chapter
    const [chapter, setChapter] = useState(CHAPTER);
    const [selectChapter, setSelectChapter] = useState(`${CHAPTER[0].chapter} - ${CHAPTER[9].chapter}`.toString())
    const [toggleMenuChapter, setToggleMenuChapter] = useState(false);
    // characters
    const [toggleDetailChar, setToggleDetailChar] = useState(false);
    const [showDetailChar, setShowDetailChar] = useState(-1);

    // data 
    const [dataMangaItem, setDataMangaItem] = useState(dataManga);
    const [showManga, setShowManga] = useState(params.mangaId);
    const [itemManga, setItemManga] = useState(
        dataMangaItem.filter((item, index) => {
            return item.id == showManga
        }));

    return (
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.banner)}
                style={{ background: `url(${itemManga[0].background || "https://www.mainmain.id/uploads/post/2022/12/07/One-Piece.jpg"}) center/cover no-repeat` }}
            >
                <div className={clsx(styles.info)}>
                    <div className={clsx(styles.imageWrap)}>
                        <img src={itemManga[0].thumbnail || "https://kaguya.live/_next/image?url=https%3A%2F%2Fs4.anilist.co%2Ffile%2Fanilistcdn%2Fmedia%2Fmanga%2Fcover%2Flarge%2Fbx30013-oT7YguhEK1TE.jpg&w=1920&q=35"} alt="" />
                        {/* <img src="https://kaguya.live/_next/image?url=https%3A%2F%2Fs4.anilist.co%2Ffile%2Fanilistcdn%2Fmedia%2Fmanga%2Fcover%2Flarge%2Fbx30013-oT7YguhEK1TE.jpg&w=1920&q=35" alt="" /> */}
                    </div>
                    <div className={clsx(styles.detail)}>
                        <div className={clsx(styles.detailTop)}>
                            <Button primary medium scale iconLeft={<PlayIcon />}

                            >Read Now</Button>
                            <Button outline medium scale>Chapter Lastest</Button>
                        </div>
                        <div className={clsx(styles.detailMain)}>
                            <h1 className={clsx(styles.name)}>
                                {itemManga[0].name || "name manga"}
                            </h1>
                            <ul className={clsx(styles.genres)}>
                                {
                                    itemManga[0].listCategory.map((item, index) => (
                                        <Link to={`/truyen-tranh/${item.key}`} key={index}>
                                            <li>{item.title}</li>
                                        </Link>
                                    ))
                                }

                                {/* <Link to="/truyen-tranh">
                                <li>Adventure</li>
                            </Link>
                            <Link to="/truyen-tranh">
                                <li>Fantasy</li>
                            </Link>
                            <Link to="/truyen-tranh">
                                <li>Action</li>
                            </Link>
                            <Link to="/truyen-tranh">
                                <li>Adventure</li>
                            </Link>
                            <Link to="/truyen-tranh">
                                <li>Fantasy</li>
                            </Link>
                            <Link to="/truyen-tranh">
                                <li>Action</li>
                            </Link>
                            <Link to="/truyen-tranh">
                                <li>Adventure</li>
                            </Link>
                            <Link to="/truyen-tranh">
                                <li>Fantasy</li>
                            </Link> */}
                            </ul>
                            <h5 className={clsx(styles.desc)}>
                                {itemManga[0].desc}
                            </h5>
                        </div>
                        <div className={clsx(styles.detailBottom)}>
                            <p className={clsx(styles.author)}>
                                Author
                                <span>{itemManga[0].author}</span>
                            </p>
                            <p className={clsx(styles.country)}>
                                Country
                                <span>{itemManga[0].country}</span>
                            </p>
                            <p className={clsx(styles.status)}>
                                Status
                                <span>
                                    <DotCircleIcon
                                        className={clsx(styles.statusDot, {
                                            [styles.comingSoon]: status == "coming",
                                            [styles.drop]: status == "drop",
                                            [styles.complete]: status == "complete",
                                            [styles.releasing]: status == "releasing",
                                        })}
                                    />
                                    {status}
                                </span>
                            </p>
                            <div className={clsx(styles.evaluate)}>
                                <div className={clsx(styles.satisfied)}>
                                    <FaceSmileIcon className={clsx(styles.icon)} />
                                    <p>
                                        {itemManga[0].satisfied}%
                                    </p>
                                </div>
                                <div className={clsx(styles.favorite)}>
                                    <HeartIcon className={clsx(styles.icon)} />
                                    <p>
                                        {itemManga[0].favorite}
                                    </p>
                                </div>
                            </div>
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
                                {/* My Senpai is Annoying */}
                                {itemManga[0].nameEng}
                            </p>
                        </div>
                        <div className={clsx(styles.item)}>
                            <p className={clsx(styles.key)}>
                                Japan
                            </p>
                            <p className={clsx(styles.value)}>
                                {/* 先輩がうざい後輩の話 */}
                                {itemManga[0].nameJapan}
                            </p>
                        </div>
                        <div className={clsx(styles.item)}>
                            <p className={clsx(styles.key)}>
                                romanji
                            </p>
                            <p className={clsx(styles.value)}>
                                {/* Senpai ga Uzai Kouhai no Hanashi */}
                                {itemManga[0].nameRomanji}
                            </p>
                        </div>
                        <div className={clsx(styles.item)}>
                            <p className={clsx(styles.key)}>
                                popular
                            </p>
                            <p className={clsx(styles.value)}>
                                {/* 12,821 */}
                                {itemManga[0].satisfied}
                            </p>
                        </div>
                        <div className={clsx(styles.item)}>
                            <p className={clsx(styles.key)}>
                                favorite
                            </p>
                            <p className={clsx(styles.value)}>
                                {/* 298 */}
                                {itemManga[0].favorite}
                            </p>
                        </div>
                    </div>
                    <div className={clsx(styles.chapter)}>
                        <Heading>Danh sách chương</Heading>
                        <div className={clsx(styles.top)}>
                            <label htmlFor="">
                                Sources:
                            </label>
                            <div className={clsx(styles.sources)}
                                onClick={() => {
                                    setToggleMenuSource(!toggleMenuSource);
                                }}
                            >
                                <p>{selectSource}</p>
                                <CaretDownIcon className={clsx(styles.icon)} />
                                {
                                    toggleMenuSource &&
                                    <ul className={clsx(styles.menu)}>
                                        {sources.map((item, index) => {
                                            return (
                                                <li className={clsx(styles.item)} key={index}
                                                    onClick={() => {
                                                        setSelectSource(item.sources)
                                                    }}
                                                >
                                                    {item.sources}
                                                    {
                                                        selectSource == item.sources &&
                                                        <CircleCheckIcon className={clsx(styles.iconSelect)} />
                                                    }
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
                                {/* <input type="" name="" value="he" /> */}
                                <CaretDownIcon className={clsx(styles.icon)} />
                                {
                                    toggleMenuChapter &&
                                    <ul className={clsx(styles.menu)}>
                                        {/* {chapter.map((item, index) => {
                                            return (
                                                <li className={clsx(styles.item)} key={index}
                                                    onClick={() => {
                                                        setSelectChapter(item.chapter)
                                                    }}
                                                >
                                                    {item.chapter}
                                                    {
                                                        selectChapter == item.chapter &&
                                                        <CircleCheckIcon className={clsx(styles.iconSelect)} />
                                                    }
                                                </li>
                                            )
                                        })} */}
                                        {itemManga[0].chapter.map((item, index) => (
                                            <li className={clsx(styles.item)} key={index}
                                                onClick={() => {
                                                    setSelectChapter(item.id)
                                                }}
                                            >
                                                {item.id}
                                                {
                                                    selectChapter == item.chapter &&
                                                    <CircleCheckIcon className={clsx(styles.iconSelect)} />
                                                }
                                            </li>
                                        ))}
                                    </ul>
                                }
                            </div>
                            <div className={clsx(styles.languages)}>
                                EN
                            </div>
                        </div>
                        <div className={clsx(styles.chapterContent)}>
                            {/* {
                                chapter.map((item, index) => {
                                    // if (item.chapter >= selectChapter.split(" ")[0] && item.chapter <= selectChapter.split(" ")[2]) {
                                    // }                                                                
                                    return (
                                        <div className={clsx(styles.item)} key={index}>
                                            {item.chapter} <span>{item.title}</span>
                                        </div>
                                    )


                                })
                            } */}
                            {
                                itemManga[0].chapter.map((item, index) => {
                                    // if (item.chapter >= selectChapter.split(" ")[0] && item.chapter <= selectChapter.split(" ")[2]) {
                                    // }                                                                
                                    return (
                                        <div className={clsx(styles.item)} key={index}>
                                            {item.id} <span>{item.title}</span>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
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
                        {
                            itemManga[0].character.map((item, index) => (
                                <Character item={item} key={index} showDetailChar={showDetailChar} toggleDetailChar={toggleDetailChar} onClick={() => {
                                    setShowDetailChar(index)
                                    setToggleDetailChar(!toggleDetailChar)
                                }} />
                            ))
                        }
                    </div>
                </div>
                <div className={clsx(styles.relation)}>
                    <Heading primary>Liên quan</Heading>
                    <div className={clsx(styles.listItem)}>
                        <ItemManga setColumn={6} />
                        <ItemManga setColumn={6} />
                        <ItemManga setColumn={6} />
                        <ItemManga setColumn={6} />
                        <ItemManga setColumn={6} />
                        <ItemManga setColumn={6} />
                    </div>
                </div>

                <div className={clsx(styles.recommend)}>
                    <Heading primary>Đề xuất dành cho bạn</Heading>
                    <div className={clsx(styles.listItem)}>
                        <ItemManga setColumn={6} />
                        <ItemManga setColumn={6} />
                        <ItemManga setColumn={6} />
                        <ItemManga setColumn={6} />
                        <ItemManga setColumn={6} />
                        <ItemManga setColumn={6} />
                        <ItemManga setColumn={6} />
                        <ItemManga setColumn={6} />
                        <ItemManga setColumn={6} />
                    </div>
                </div>

                <div className={clsx(styles.comment)}>
                    <Heading primary>Bình luận</Heading>
                    <Comments />
                </div>
            </div>

        </div>
    );
}

export default MangaDetail;