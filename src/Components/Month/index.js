import clsx from "clsx";
import { Fragment } from "react";
import Day from "../Day";
import styles from "./Month.module.scss";
import PropTypes from "prop-types";

Month.propTypes = {
    dataMonth: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array,
    ]).isRequired,
}

function Month({ dataMonth }) {
    return (
        <div className={clsx(styles.wrapper)}>
            {dataMonth.map((item, i) => {
                // console.log("item:", item);
                return item.map((day, index) => {
                    return (
                        <Day dataDay={day} key={index} rowIndex={i} />                    
                    )
                })                 
            })}
        </div>
    );
}

export default Month;