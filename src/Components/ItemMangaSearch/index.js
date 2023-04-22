import styles from "./ItemMangaSearch.module.scss";
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import Image from "../Image";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

ItemMangaSearch.propTypes = {
    data: PropTypes.object.isRequired,
    onClick: PropTypes.func,
}

function ItemMangaSearch({ data, onClick }) {
    const props = {
        onClick
    };

    // console.log("data", data)
    return (
        // sau thay thành link động
        <div className={clsx(styles.sreachResultItem)} {...props}><Link to={`/manga/detail/${data.keyword}/${data.id}`}>
            <div className={clsx(styles.sreachResultItemImgBox)}>
                <Image
                    src={data.background ?? data.thumbnail}
                    // alt={data.thumbnail}
                />
                <span className={clsx(styles.sreachResultItemTime)}>
                    Chapter {data.chapter_lastest}
                </span>
            </div>
            <div className={clsx(styles.sreachResultItemDesc)}>
                <h4 className={clsx(styles.sreachResultItemName)}>{data.name}</h4>
                <h5 className={clsx(styles.sreachResultItemView)}>{data.view_count} lượt xem</h5>
            </div>
        </Link></div>
    );
}

export default ItemMangaSearch;