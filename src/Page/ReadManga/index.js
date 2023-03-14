import clsx from "clsx";
import { useState } from "react";
import Button from "../../Components/Button";
import { AngleLeftIcon, AngleRightIcon, HouseIcon, SearchIcon, CaretDownIcon, CircleCheckIcon, BarsIcon, AddImageIcon, MinisizeIcon, MaxSizeIcon, ArrowDownIcon, ArrowsDownToLineIcon, ArrowsLeftRightToLineIcon, TableCellsLargeIcon, ArrowsToEyeIcon } from "../../Components/Icon";
import styles from "./ReadManga.module.scss";
import Modal from "../../Components/Modal";
import { useNavigate } from "react-router-dom";

function ReadManga() {
    const navigate = useNavigate();
    const [showModalReplace, setShowModalReplace] = useState(false);
    const [showSidebar, setShowSidebar] = useState(true);

    // select type image
    // false trả về ảnh maxsize, true trả về minisize
    const [typeImage, setTypeImage] = useState("default");
    // select type layout
    const [selectTypeLayout, setSelectTypeLayout] = useState(false);
    return (
        <div className={clsx(styles.container)}>
            {showSidebar &&
                <div className={clsx(styles.sidebar)}>
                    <div className={clsx(styles.top)}>
                        <HouseIcon className={clsx(styles.icon)}
                            onClick={() => {
                                // return pages home
                                navigate("/");
                            }}
                        />
                        <h3 className={clsx(styles.name)}>Name Manga Name Manga Name Manga Name Manga</h3>
                        <AngleLeftIcon className={clsx(styles.icon)}
                            onClick={() => {
                                setShowSidebar(false);
                            }}
                        />
                    </div>
                    <div className={clsx(styles.navbar)}>
                        <AngleLeftIcon className={clsx(styles.icon)} />
                        <h3 className={clsx(styles.chapter)}>Chapter 0</h3>
                        <AngleRightIcon className={clsx(styles.icon)} />
                    </div>
                    <div className={clsx(styles.mode)}>
                        <div className={clsx(styles.top)}>
                            <p>Change Layout and Image:</p>
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
                            <div className={clsx(styles.iconWrapper)} title="change layout">
                                <TableCellsLargeIcon className={clsx(styles.icon)}
                                    onClick={() => {
                                        setSelectTypeLayout(!selectTypeLayout);
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
                            <p>Layout :
                                {!selectTypeLayout ?
                                    <ArrowsDownToLineIcon className={clsx(styles.icon)} />
                                    :
                                    <ArrowsLeftRightToLineIcon className={clsx(styles.icon)} />
                                }
                            </p>
                        </div>
                    </div>
                    <div className={clsx(styles.search)}>
                        <SearchIcon className={clsx(styles.icon)} />
                        <input type="" name="" value="Chapter"
                            onChange={e => e.target.value}
                        />
                    </div>
                    <div className={clsx(styles.sourcesWrap)}>
                        <label htmlFor="">
                            Sources:
                        </label>
                        <div className={clsx(styles.sources)}>
                            <p>hello</p>
                            <CaretDownIcon className={clsx(styles.icon)} />
                            <ul className={clsx(styles.menu)}>
                                <li className={clsx(styles.item)}>
                                    hello
                                    <CircleCheckIcon className={clsx(styles.iconSelect)} />
                                </li>
                                <li className={clsx(styles.item)}>
                                    hello
                                    <CircleCheckIcon className={clsx(styles.iconSelect)} />
                                </li>
                                <li className={clsx(styles.item)}>
                                    hello
                                    <CircleCheckIcon className={clsx(styles.iconSelect)} />
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className={clsx(styles.chapterContent)}>
                        <div className={clsx(styles.item)}>
                            <span>Chapter 1: Lời mở đầu Lời mở đầu Lời mở đầu Lời mở đầu</span>
                        </div>
                        <div className={clsx(styles.item)}>
                            <span>Chapter 1: Lời mở đầu</span>
                        </div>
                        <div className={clsx(styles.item)}>
                            <span>Chapter 1: Lời mở đầu</span>
                        </div>
                        <div className={clsx(styles.item)}>
                            <span>Chapter 2: Lời mở đầu</span>
                        </div>
                        <div className={clsx(styles.item)}>
                            <span>Chapter 3: Lời mở đầu</span>
                        </div>
                        <div className={clsx(styles.item)}>
                            <span>Chapter 1: Lời mở đầu</span>
                        </div>
                        <div className={clsx(styles.item)}>
                            <span>Chapter 1: Lời mở đầu</span>
                        </div>
                        <div className={clsx(styles.item)}>
                            <span>Chapter 2: Lời mở đầu</span>
                        </div>
                        <div className={clsx(styles.item)}>
                            <span>Chapter 3: Lời mở đầu</span>
                        </div>
                        <div className={clsx(styles.item)}>
                            <span>Chapter 1: Lời mở đầu</span>
                        </div>
                        <div className={clsx(styles.item)}>
                            <span>Chapter 1: Lời mở đầu</span>
                        </div>
                        <div className={clsx(styles.item)}>
                            <span>Chapter 2: Lời mở đầu</span>
                        </div>
                        <div className={clsx(styles.item)}>
                            <span>Chapter 3: Lời mở đầu</span>
                        </div>
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
                <div className={clsx(styles.imgWrap, {
                    [styles.default]: typeImage === "default",
                    [styles.maxsize]: typeImage === "maxsize",
                    [styles.minisize]: typeImage === "minisize",
                })}>
                    <img src="https://i8.ntcdntempv3.com/data/images/35701/659620/003.jpg?data=net" alt="" />
                </div>
                <div className={clsx(styles.imgWrap, {
                    [styles.default]: typeImage === "default",
                    [styles.maxsize]: typeImage === "maxsize",
                    [styles.minisize]: typeImage === "minisize",
                })}>
                    <img src="https://i8.ntcdntempv3.com/data/images/35701/659620/003.jpg?data=net" alt="" />
                </div>
                <div className={clsx(styles.imgWrap, {
                    [styles.default]: typeImage === "default",
                    [styles.maxsize]: typeImage === "maxsize",
                    [styles.minisize]: typeImage === "minisize",
                })}>
                    <img src="https://i8.ntcdntempv3.com/data/images/35701/659620/003.jpg?data=net" alt="" />
                </div>
                <div className={clsx(styles.imgWrap, {
                    [styles.default]: typeImage === "default",
                    [styles.maxsize]: typeImage === "maxsize",
                    [styles.minisize]: typeImage === "minisize",
                })}>
                    <img src="https://i8.ntcdntempv3.com/data/images/35701/659620/003.jpg?data=net" alt="" />
                </div>
                <div className={clsx(styles.imgWrap, {
                    [styles.default]: typeImage === "default",
                    [styles.maxsize]: typeImage === "maxsize",
                    [styles.minisize]: typeImage === "minisize",
                })}>
                    <img src="https://i8.ntcdntempv3.com/data/images/35701/659620/003.jpg?data=net" alt="" />
                </div>
                <div className={clsx(styles.imgWrap, {
                    [styles.default]: typeImage === "default",
                    [styles.maxsize]: typeImage === "maxsize",
                    [styles.minisize]: typeImage === "minisize",
                })}>
                    <img src="https://i8.ntcdntempv3.com/data/images/35701/659620/003.jpg?data=net" alt="" />
                </div>
                <div className={clsx(styles.imgWrap, {
                    [styles.default]: typeImage === "default",
                    [styles.maxsize]: typeImage === "maxsize",
                    [styles.minisize]: typeImage === "minisize",
                })}>
                    <img src="https://i8.ntcdntempv3.com/data/images/35701/659620/003.jpg?data=net" alt="" />
                </div>

                <div className={clsx(styles.userActive)}>
                    <Button primary medium iconLeft={<AngleLeftIcon />}>Previous Chapter</Button>
                    <Button primary medium iconRight={<AngleRightIcon />}>Next Chapter</Button>
                </div>
            </div>

            {/* row */}
            {/* <div className={clsx(styles.mangaRow, {
                [styles.showSidebar]: showSidebar,
                [styles.hideSidebar]: showSidebar === false,
            })}>
                <div className={clsx(styles.imgWrap, {
                    [styles.default]: typeImage === "default",
                    [styles.maxsize]: typeImage === "maxsize",
                    [styles.minisize]: typeImage === "minisize",
                })}>
                    <img src="https://i8.ntcdntempv3.com/data/images/35701/659620/003.jpg?data=net" alt="" />
                </div>
                <div className={clsx(styles.imgWrap, {
                    [styles.default]: typeImage === "default",
                    [styles.maxsize]: typeImage === "maxsize",
                    [styles.minisize]: typeImage === "minisize",
                })}>
                    <img src="https://i8.ntcdntempv3.com/data/images/35701/659620/003.jpg?data=net" alt="" />
                </div>
                <div className={clsx(styles.imgWrap, {
                    [styles.default]: typeImage === "default",
                    [styles.maxsize]: typeImage === "maxsize",
                    [styles.minisize]: typeImage === "minisize",
                })}>
                    <img src="https://i8.ntcdntempv3.com/data/images/35701/659620/003.jpg?data=net" alt="" />
                </div>
                <div className={clsx(styles.imgWrap, {
                    [styles.default]: typeImage === "default",
                    [styles.maxsize]: typeImage === "maxsize",
                    [styles.minisize]: typeImage === "minisize",
                })}>
                    <img src="https://i8.ntcdntempv3.com/data/images/35701/659620/003.jpg?data=net" alt="" />
                </div>
                <div className={clsx(styles.imgWrap, {
                    [styles.default]: typeImage === "default",
                    [styles.maxsize]: typeImage === "maxsize",
                    [styles.minisize]: typeImage === "minisize",
                })}>
                    <img src="https://i8.ntcdntempv3.com/data/images/35701/659620/003.jpg?data=net" alt="" />
                </div>
                <div className={clsx(styles.imgWrap, {
                    [styles.default]: typeImage === "default",
                    [styles.maxsize]: typeImage === "maxsize",
                    [styles.minisize]: typeImage === "minisize",
                })}>
                    <img src="https://i8.ntcdntempv3.com/data/images/35701/659620/003.jpg?data=net" alt="" />
                </div>
                <div className={clsx(styles.imgWrap, {
                    [styles.default]: typeImage === "default",
                    [styles.maxsize]: typeImage === "maxsize",
                    [styles.minisize]: typeImage === "minisize",
                })}>
                    <img src="https://i8.ntcdntempv3.com/data/images/35701/659620/003.jpg?data=net" alt="" />
                </div>
                
            </div> */}

            {/* {true &&
                <Modal open={true}>
                    hello
                </Modal>
            } */}
        </div>
    );
}

export default ReadManga;