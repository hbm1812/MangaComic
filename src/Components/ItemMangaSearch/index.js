import styles from "./ItemMangaSearch.module.scss";
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import Image from "../Image";
import { Link } from "react-router-dom";

function ItemMangaSearch({ data, onClick }) {
    const props = {
        onClick
    };

    return (
        // sau thay thành link động
        <div className={clsx(styles.sreachResultItem)} {...props}><Link to={`/truyen-tranh-ct/1`}>
            <div className={clsx(styles.sreachResultItemImgBox)}>
                <Image
                    src={data.avatar}
                    alt={data.avatar}
                />
                <span className={clsx(styles.sreachResultItemTime)}>
                    Chapter {data.followers_count}
                </span>
            </div>
            <div className={clsx(styles.sreachResultItemDesc)}>
                <h4 className={clsx(styles.sreachResultItemName)}>{data.full_name}</h4>
                <h5 className={clsx(styles.sreachResultItemView)}>{data.likes_count || "126.000"} lượt xem</h5>
            </div>
        </Link></div>
    );
}

export default ItemMangaSearch;