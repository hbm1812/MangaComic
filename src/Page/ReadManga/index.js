import clsx from "clsx";
import Button from "../../Components/Button";
import { AngleLeftIcon, AngleRightIcon, HouseIcon, SearchIcon, CaretDownIcon, CircleCheckIcon } from "../../Components/Icon";
import styles from "./ReadManga.module.scss";

function ReadManga() {
    return (
        <div className={clsx(styles.container)}>
            <div className={clsx(styles.sidebar)}>
                <div className={clsx(styles.top)}>
                    <HouseIcon className={clsx(styles.icon)} />
                    <h3 className={clsx(styles.name)}>Name Manga Name Manga Name Manga Name Manga</h3>
                    <AngleLeftIcon className={clsx(styles.icon)} />
                </div>
                <div className={clsx(styles.navbar)}>
                    <AngleLeftIcon className={clsx(styles.icon)} />
                    <h3 className={clsx(styles.chapter)}>Chapter 0</h3>
                    <AngleRightIcon className={clsx(styles.icon)} />
                </div>
                <div className={clsx(styles.mode)}>
                    <div className={clsx(styles.layoutMode)}>
                        <p>Layout Mode</p>
                        <AngleLeftIcon className={clsx(styles.icon)} />
                    </div>
                    <div className={clsx(styles.imageMode)}>
                        <p>Image Mode</p>
                        <AngleLeftIcon className={clsx(styles.icon)} />
                    </div>
                </div>
                <div className={clsx(styles.search)}>
                    <SearchIcon className={clsx(styles.icon)} />
                    <input type="" name="" value="Chapter" />
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

            <div className={clsx(styles.manga)}>
                <div className={clsx(styles.imgWrap)}>                    
                    <img src="https://i8.ntcdntempv3.com/data/images/35701/659620/003.jpg?data=net" alt="" />
                </div>
                <div className={clsx(styles.imgWrap)}>
                    <img src="https://i8.ntcdntempv3.com/data/images/35701/659620/003.jpg?data=net" alt="" />
                </div>
                <div className={clsx(styles.imgWrap)}>
                    <img src="https://i8.ntcdntempv3.com/data/images/35701/659620/003.jpg?data=net" alt="" />
                </div>
                <div className={clsx(styles.imgWrap)}>
                    <img src="https://i8.ntcdntempv3.com/data/images/35701/659620/003.jpg?data=net" alt="" />
                </div>
                <div className={clsx(styles.imgWrap)}>
                    <img src="https://i8.ntcdntempv3.com/data/images/35701/659620/003.jpg?data=net" alt="" />
                </div>

                <div className={clsx(styles.userActive)}>
                    <Button primary medium iconLeft={<AngleLeftIcon/>}>Previous Chapter</Button>
                    <Button primary medium iconRight={<AngleRightIcon/>}>Next Chapter</Button>
                </div>
            </div>
        </div>
    );
}

export default ReadManga;