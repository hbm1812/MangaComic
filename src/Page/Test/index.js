import clsx from "clsx";
import { Fragment, useEffect, useState } from "react";
import styles from "./Test.module.scss";

function Test() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/posts`)
            .then(res => res.json())
            .then(res => {
                setData(res)
                // console.log(res)
            })

            .catch(() => {
                console.log("error")
            })
    }, []);

    return (
        <Fragment>
            {data.map((item, index) => {
                console.log(index)
                console.log(item)
                return (
                    <div className={clsx(styles.item)} key={index}>
                        <h2>Title: {item.title}</h2>
                        <p>Body: {item.body}</p>
                    </div>
                )
            })}
        </Fragment>
    );
}

export default Test;