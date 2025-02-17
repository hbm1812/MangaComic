import clsx from "clsx";
import styles from "./ItemManga.module.scss";
import { Link } from "react-router-dom";
import { BookOpenIcon } from "../Icon";
import Button from "../Button";
import { WindowScrollTop } from "../../util";

function ItemManga({ to, href, onClick, complete, coming, setColumn, type, data = {}, rankingIndex }) {
    let Comp = "div";
    const props = {};
    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = "a";
    }

    const arrStylesWrapper = [];
    switch (setColumn) {
        case 1:
            {
                arrStylesWrapper.push((styles.oneColumn))
                break;
            }
        case 2:
            {
                arrStylesWrapper.push((styles.twoColumn))
                break;
            }
        case 3:
            {
                arrStylesWrapper.push((styles.threeColumn))
                break;
            }
        case 4:
            {
                arrStylesWrapper.push((styles.fourColumn))
                break;
            }
        case 5:
            {
                arrStylesWrapper.push((styles.fiveColumn))
                break;
            }
        case 6:
            {
                arrStylesWrapper.push((styles.sixColumn))
                break;
            }
        default:
            break;

    }

    // if (type === "ranking") {
    //     arrStylesWrapper.push(styles.wrapperRanking);
    // } else if (type == "seasonalComics") {
    //     arrStylesWrapper.push(styles.wrapperSeason);
    // }

    let classesWrapper = clsx(arrStylesWrapper, {
        [styles.wrapperPrimary]: true,
    });

    // DATA
    if (data) {
        if (data.status_id == 2) {
            coming = true;
        } else if (data.status_id == 3) {
            complete = true;
        }
    }

    // thumbnail
    // name
    // status 1 coming || 2 complete || 0 đang tiến hành :v
    // chapter
    // view

    return (
        <Comp className={classesWrapper} {...props}>
            <div className={clsx(styles.itemPrimary)}
                onClick={() => WindowScrollTop()}
            >
                <img src={data.thumbnail || "https://s199.imacdn.com/tt24/2020/03/27/ee63facad9f0518a_442115a9843e7858_255011585324379345957.jpg"} alt="" referrerPolicy="no-referrer" />
                <div className={clsx(styles.info)}>
                    <h3 className={clsx(styles.infoName)}>
                        {data.name || "Name manga Name manga Name manga Name manga Name manga Name manga Name mangaName mangaName mangaName mangaName manga"}

                    </h3>
                    <div className={clsx(styles.infoBottom)}>
                        <p className={clsx(styles.infoEpisodeName)}>{data && "Chap " + data.chapter_lastest}</p>
                        <p className={clsx(styles.infoEpisodeView)}><span>{data.count_views}</span> lượt xem</p>
                    </div>
                </div>
                <div className={coming ? clsx(styles.itemProgress, styles.comingSoon) : complete ? clsx(styles.itemProgress, styles.complete) : clsx(styles.hidden)}>
                    {data && data.status_name}
                </div>
                <div className={clsx(styles.itemPlay)}>
                    <BookOpenIcon className={clsx(styles.itemPlayIcon)} />
                </div>
            </div>
            {type === "ranking" &&
                <div className={clsx(styles.rankingIndex)}>
                    {rankingIndex + 1 ?? ""}                    
                </div>
            }
        </Comp>
    );
}

export default ItemManga;