import clsx from "clsx";
import { Fragment, useContext, useEffect, useState } from "react";
import styles from "./Day.module.scss";
import dayjs from "dayjs";
import GlobalContext from "../../Contexts/GlobalContext";
import PropTypes from "prop-types";

Day.propTypes = {
    dataDay: PropTypes.object.isRequired,
    rowIndex: PropTypes.number,
}

function Day({ dataDay, rowIndex }) {
    // console.log("dataday", typeof(dataDay));
    // console.log("rowIndex", typeof(rowIndex));
    const { showModal, setShowModal, daySelected, setDaySelected, dataDate, setDataDate, arrDataDate, setSendDesc, setSendTitle } = useContext(GlobalContext);
    // console.log(arrDataDate);
    const handleDataSend = () => {
        arrDataDate.map((item) => {
            if(item.id === dataDay.format("DD-MM-YYYY")) {
                setSendDesc(item.desc);
                setSendTitle(item.title);
            }           
        })
    }
    return (
        <div className={clsx(styles.wrapper)}
            onClick={(e) => {
                setShowModal(true)
                setDaySelected(dataDay.format("dddd, MMMM DD"))
                // console.log(dataDay);
                // console.log(typeof(dataDay));
                // console.log(typeof(dataDay.format("DD-MM-YYYY")))
                setDataDate(dataDay)
                handleDataSend()
            }}
        >
            {rowIndex === 0 && <p className={clsx(styles.header)}>{dataDay.format("ddd").toString()}</p>}
            <p className={dataDay.format("DD-MM-YYYY") === dayjs().format("DD-MM-YYYY") ? clsx(styles.dayNumber, {
                [styles.active]: true,
            }) :
                clsx(styles.dayNumber)
            }>{dataDay.format("DD")}</p>
            {arrDataDate &&
                <div className={clsx(styles.contentWrapper)}>
                    <div className={clsx(styles.task)}>
                        {arrDataDate.map((item, index) => {
                            if (item.id === dataDay.format("DD-MM-YYYY")) {
                                return (
                                    <p key={index}>{item.title}</p>
                                )

                            }
                        })}
                    </div>
                </div>
            }
        </div>
    );
}

export default Day;