import styles from "./ItemNews.module.scss";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { Fragment } from "react";


function ItemNews(
    {
        href,
        to,
        setCategory,
        setColumn,
        type = "",

    }) {
    let Comp = "div";
    const propsComp = {};
    if (href) {
        Comp = "a";
        propsComp.href = href;
    } else if (to) {
        Comp = Link;
        propsComp.to = to;
    }

    let classesCategory = clsx(styles.category);
    let newsCategory = "";
    if (setCategory === "anime") {
        classesCategory = clsx(styles.category, styles.animeCate);
        newsCategory = "Anime";
    } else if (setCategory === "manga") {
        classesCategory = clsx(styles.category, styles.mangaCate);
        newsCategory = "Truyện tranh";
    } else {
        // giải trí default :V
        classesCategory = clsx(styles.category, styles.infoCate);
        newsCategory = "Thông tin";
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
                        <Comp className={clsx(styles.link)} {...propsComp}>
                            <img src="https://s199.imacdn.com/ta/2022/12/22/4aad4c69a6d9d6a9_ffcd5eaeb7c4801e_5966216717215802769722.jpg" alt="" />
                            <div className={clsx(styles.info)}>
                                <h3 className={clsx(styles.title)}>
                                    Gawr Gura tạm dừng hoạt động do vấn đề sức khỏe Gawr Gura tạm dừng hoạt động do vấn đề sức khỏe
                                </h3>
                                <p className={clsx(styles.desc)}>
                                    Lorem aaaaaaaaaaaaaaaaaa Gawr Gura tạm dừng hoạt động do vấn đề sức khỏeGawr Gura tạm dừng hoạt động do vấn đề sức khỏe
                                </p>
                                <div className={clsx(styles.itemBottom)}>
                                    <div className={clsx(styles.date)}>
                                        22/15/2002
                                    </div>
                                    <span className={classesCategory}>{newsCategory}</span>
                                </div>
                            </div>
                        </Comp>
                    </div>
                </div>
                : type == "watched" || type == "following" ?
                    <div className={classesWrapper}>
                        <div className={clsx(styles.item)}>
                            <Comp className={clsx(styles.link)} {...propsComp}>
                                <img src="https://s199.imacdn.com/ta/2022/12/22/4aad4c69a6d9d6a9_ffcd5eaeb7c4801e_5966216717215802769722.jpg" alt="" />
                                <div className={clsx(styles.info)}>
                                    <h3 className={clsx(styles.title)}>
                                        Gawr Gura tạm dừng hoạt động do vấn đề sức khỏe Gawr Gura tạm dừng hoạt động do vấn đề sức khỏe
                                    </h3>
                                </div>
                            </Comp>
                        </div>
                    </div>
                    : type == "recommend" ?
                        <div className={classesWrapper}>
                            <div className={clsx(styles.item)}>
                                <Comp className={clsx(styles.link)} {...propsComp}>
                                    <div className={clsx(styles.imgWrap)}>
                                        <img src="https://s199.imacdn.com/ta/2022/12/22/4aad4c69a6d9d6a9_ffcd5eaeb7c4801e_5966216717215802769722.jpg" alt="" />
                                    </div>
                                    <div className={clsx(styles.info)}>
                                        <h3 className={clsx(styles.title)}>
                                            Gawr Gura tạm dừng hoạt động do vấn đề sức khỏe Gawr Gura tạm dừng hoạt động do vấn đề sức khỏe
                                        </h3>
                                        {/* <p className={clsx(styles.desc)}>
                                    Lorem aaaaaaaaaaaaaaaaaa Gawr Gura tạm dừng hoạt động do vấn đề sức khỏeGawr Gura tạm dừng hoạt động do vấn đề sức khỏe
                                </p> */}
                                        <div className={clsx(styles.itemBottom)}>
                                            <div className={clsx(styles.date)}>
                                                22/15/2002
                                            </div>
                                            <span className={classesCategory}>{newsCategory}</span>
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