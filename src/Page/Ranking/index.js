import axios from "axios";
import clsx from "clsx";
import { useEffect, useState } from "react";
import Heading from "../../Components/Heading";
import { HeadingRightIcon } from "../../Components/Icon";
import ItemManga from "../../Components/ItemManga";
import styles from "./Ranking.module.scss";

function Ranking() {
    const [dataManga, setDataManga] = useState([]);

    // fetch api manga 
    useEffect(() => {
        axios.get("http://localhost/manga-comic-be/api/stories/readRanking.php")
            .then((res) => {
                // console.log("data manga", res.data);
                setDataManga(res.data)
            })

            .catch(() => {
                console.log("error")
            })
    }, []);

    return (
        <div className={clsx(styles.wrapper)}>
            <Heading primary iconRight={<HeadingRightIcon />}>Bảng xếp hạng</Heading>
            <div className={clsx(styles.listItem)}>            
                {dataManga.map((item, index) => {
                    // console.log("item detail", item)
                    return (
                        <ItemManga setColumn={6} data={item} key={index} rankingIndex={index} type="ranking" to={`/manga/detail/${item.keyword}/${item.id}`} />
                    )
                })}
            </div>
        </div>
    );
}

export default Ranking;