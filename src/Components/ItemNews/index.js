import styles from "./ItemNews.module.scss";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { Fragment, useContext } from "react";
import GlobalContext from "../../Contexts/GlobalContext";
import { WindowScrollTop } from "../../util";
import PropTypes from "prop-types";

ItemNews.propTypes = {
    data: PropTypes.object.isRequired,
    href: PropTypes.string,
    to: PropTypes.string,
    setColumn: PropTypes.number,
    type: PropTypes.string,
}


function ItemNews(
    {
        href,
        to,
        setColumn,
        type = "",
        data,
    }) {
    const { newsDetail, setNewsDetail } = useContext(GlobalContext);

    let Comp = "div";
    const propsComp = {};
    if (href) {
        Comp = "a";
        propsComp.href = href;
    } else if (to) {
        Comp = Link;
        propsComp.to = to;
    }

    // class category
    let classesCategory = clsx(styles.category);
    if (data) {
        if (data.key_category === "anime") {
            classesCategory = clsx(styles.category, styles.animeCate);
        } else if (data.key_category === "comic") {
            classesCategory = clsx(styles.category, styles.mangaCate);
        } else if (data.key_category === "info") {
            // giải trí default :V
            classesCategory = clsx(styles.category, styles.infoCate);
        }
    }

    var getTime = "";
    // xử lý time 
    if (data) {
        let arrDateCreated = data.created_at.split(" ");
        getTime = arrDateCreated[0].split("-").reverse().join("/");
    }

    let classesWrapper = clsx(styles.wrapper);
    const arrClassesWrapper = [styles.wrapper];

    // type wrapper
    if (type === "default" || type === "") {
        // classesWrapper = clsx(styles.wrapper);
    }
    if (type === "watched" || type === "following") {
        // classesWrapper = clsx(styles.wrapper, styles.watched);
        arrClassesWrapper.push(styles.watched);
    }
    if (type === "recommend") {
        // classesWrapper = clsx(styles.wrapper, styles.recommend);
        arrClassesWrapper.push(styles.recommend);
    }

    // column wrapper
    if (setColumn === 4) {
        arrClassesWrapper.push(styles.columnFour);
    }
    if (setColumn === 2) {
        arrClassesWrapper.push(styles.columnTwo);
    }
    if (setColumn === 1) {
        arrClassesWrapper.push(styles.columnOne);
    }

    // class wraper final :v
    classesWrapper = clsx(arrClassesWrapper);

    return (
        <Fragment>
            {type == "default" || type == "" ?
                <div className={classesWrapper}>
                    <div className={clsx(styles.item)}>
                        <Comp className={clsx(styles.link)} {...propsComp}
                            onClick={() => {
                                setNewsDetail(data)
                                WindowScrollTop();
                            }}
                        >
                            <img src={data && data.thumbnail} alt="" />
                            <div className={clsx(styles.info)}>
                                <h3 className={clsx(styles.title)}>
                                    {data && data.title}
                                </h3>
                                <p className={clsx(styles.desc)}>
                                    {data && data.content}
                                </p>
                                <div className={clsx(styles.itemBottom)}>
                                    <div className={clsx(styles.date)}>
                                        {data && getTime}
                                    </div>
                                    <span className={classesCategory}>{data && data.name_category}</span>
                                </div>
                            </div>
                        </Comp>
                    </div>
                </div>
                : type == "recommend" ?
                    <div className={classesWrapper}>
                        <div className={clsx(styles.item)}>
                            <Comp className={clsx(styles.link)} {...propsComp}
                                onClick={() => {
                                    setNewsDetail(data)
                                    WindowScrollTop()
                                }}
                            >
                                <div className={clsx(styles.imgWrap)}>
                                    <img src={data && data.thumbnail} alt="" />
                                </div>
                                <div className={clsx(styles.info)}>
                                    <h3 className={clsx(styles.title)}>
                                        {data && data.title}
                                    </h3>
                                    <div className={clsx(styles.itemBottom)}>
                                        <div className={clsx(styles.date)}>
                                            {data && getTime}
                                        </div>
                                        <span className={classesCategory}>{data && data.name_category}</span>
                                    </div>
                                </div>
                            </Comp>
                        </div>
                    </div>
                    :
                    ""
            }
        </Fragment>


    );
}

export default ItemNews;