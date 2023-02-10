import clsx from "clsx";
import styles from "./ItemManga.module.scss";
import { Link } from "react-router-dom";
import { BookOpenIcon } from "../Icon";
import Button from "../Button";

function ItemManga({ to, href, onClick, complete, coming, setColumn, type, data = {}}) {    
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

    if (type === "ranking") {
        arrStylesWrapper.push(styles.wrapperRanking);
    } else if (type == "seasonalComics") {
        arrStylesWrapper.push(styles.wrapperSeason);
    }

    let classesWrapper = clsx(arrStylesWrapper, {
        [styles.wrapperPrimary]: true,
    });

    // DATA
    if(data) {
        if(data.status == 1) {
            coming = true;
        } else if(data.status == 2) {
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
            <div className={clsx(styles.itemPrimary)}>
                <img src={data.thumbnail || "https://s199.imacdn.com/tt24/2020/03/27/ee63facad9f0518a_442115a9843e7858_255011585324379345957.jpg"} alt="" referrerPolicy="no-referrer" />
                <div className={clsx(styles.info)}>
                    <h3 className={clsx(styles.infoName)}>
                        {data.name || "Name manga Name manga Name manga Name manga Name manga Name manga Name mangaName mangaName mangaName mangaName manga"}                        
                        
                    </h3>
                    <div className={clsx(styles.infoBottom)}>
                        <p className={clsx(styles.infoEpisodeName)}>Chap {data.chapterLastest || 0}</p>
                        <p className={clsx(styles.infoEpisodeView)}><span>{data.view || 3000}</span> lượt xem</p>
                    </div>
                </div>                
                <div className={coming ? clsx(styles.itemProgress, styles.comingSoon) : complete ? clsx(styles.itemProgress, styles.complete) : clsx(styles.hidden)}>
                    {
                        complete ? "Hoàn thành" : coming ? "Sắp chiếu" : ""
                    }
                </div>
                <div className={clsx(styles.itemPlay)}>
                    <BookOpenIcon className={clsx(styles.itemPlayIcon)} />
                </div>                
            </div>
        </Comp>
    );
}

export default ItemManga;