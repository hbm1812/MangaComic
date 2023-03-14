import clsx from "clsx";
import { useContext } from "react";
import Button from "../../../Components/Button";
import { AngleLeftIcon, AngleRightIcon } from "../../../Components/Icon";
import GlobalContext from "../../../Contexts/GlobalContext";
import styles from "./Calendar.module.scss";
import dayjs from "dayjs";

function CalendarHeader() {
    const { monthIndex, setMonthIndex, setShowModal, daySelected, setDaySelected } = useContext(GlobalContext);

    const handlePrevMonth = () => {
        setMonthIndex(monthIndex - 1);
    }

    const handleNextMonth = () => {
        setMonthIndex(monthIndex + 1);
    }

    const handleReset = () => {
        // setMonthIndex(dayjs().month());
        setMonthIndex(monthIndex === dayjs().month() ? monthIndex + Math.random() : dayjs().month());
    }

    return (
        <div className={clsx(styles.subUseractive)}>
            <div className={clsx(styles.subNavLeft)}>
                <AngleLeftIcon className={clsx(styles.iconPrev)} onClick={handlePrevMonth} />
                <AngleRightIcon className={clsx(styles.iconNext)} onClick={handleNextMonth} />
                <Button primary medium
                    onClick={handleReset}
                >Today</Button>
                <h2 className={clsx(styles.date)}>{dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}</h2>
            </div>
            <div className={clsx(styles.subNavRight)}>
                <Button primary medium onClick={() => {
                    setShowModal(true)
                    let getCurrentDay = dayjs().format("dddd, MMMM DD");
                    // console.log(dayjs().format("dddd, MMMM DD"))
                    setDaySelected(getCurrentDay)
                }}>Create</Button>
            </div>
        </div>
    );
}

export default CalendarHeader;