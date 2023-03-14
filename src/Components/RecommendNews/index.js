import styles from "./RecommendNews.module.scss";
import clsx from "clsx";
import { Fragment } from "react";
// base component
import Heading from "../Heading";
import ItemNews from "../ItemNews";
import PropTypes from "prop-types";

RecommendNews.propTypes = {
    title: PropTypes.string.isRequired,
    subTitle: PropTypes.string,
    dataMain: PropTypes.array.isRequired,
    subData: PropTypes.array,
}

function RecommendNews({ title, subTitle, dataMain, subData,
    iconLeft,
    iconRight,
    iconSubLeft,
    iconSubRight,
}) {
    return (
        <section className={clsx(styles.wrapper)}>
            <div className={clsx(styles.titleWrap)}>
                <Heading active iconLeft={iconLeft} iconRight={iconRight}>
                    {title}
                </Heading>
            </div>
            <div className={clsx(styles.listContent)}>
                {dataMain && dataMain.map((item, index) => {
                    return (
                        <ItemNews type="recommend" setColumn={1} key={index} data={item} to={`/news/detail/${item.id}`} />
                    )
                })}
            </div>
            <div className={clsx(styles.titleWrap)}>
                <Heading active iconLeft={iconSubLeft} iconRight={iconSubRight}>
                    {subTitle}
                </Heading>
            </div>
            <div className={clsx(styles.listContent)}>
                {subData &&
                    <Fragment>
                        <ItemNews type="recommend" setColumn={1} />
                        <ItemNews type="recommend" setColumn={1} />
                        <ItemNews type="recommend" setColumn={1} />
                    </Fragment>
                }

            </div>
        </section>
    );
}

export default RecommendNews;