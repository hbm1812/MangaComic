import styles from "./ItemMangaSearch.module.scss";
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import Image from "../Image";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";

ItemMangaSearch.propTypes = {
    data: PropTypes.object.isRequired,
    onClick: PropTypes.func,
}

function ItemMangaSearch({ data, onClick }) {
    const props = {
        onClick
    };
    const [dataManga, setDataManga] = useState([]);    

    useEffect(() => {
        axios.get(`http://localhost/manga-comic-be/api/stories/read.php`)
            .then((res) => {
                // console.log("data", res.data)
                setDataManga(res.data)
            })

            .catch(() => {
                console.log("error")
            })
    }, [])
    const filterData = dataManga.filter((item) => item.keyword === data.keyword)

    // console.log("datadatadataa", filterData)
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
                <h5 className={clsx(styles.sreachResultItemView)}>{filterData[0].count_views} lượt xem</h5>
            </div>
        </Link></div>
    );
}

export default ItemMangaSearch;