import clsx from "clsx";
import styles from "./Calendar.module.scss";
import { useState, useContext, useEffect, Fragment } from "react";

// calendar
// import "dayjs/locale/*";
import dayjs from "dayjs";
import { getMonth } from "../../../util";
import { AngleLeftIcon, AngleRightIcon } from "../../../Components/Icon";
import Button from "../../../Components/Button";
import Month from "../../../Components/Month";
import GlobalContext from "../../../Contexts/GlobalContext";
import CalendarHeader from "./CalendarHeader";
import ContextWrapper from "../../../Contexts/ContextWrapper";
import Modal from "../../../Components/Modal";
import FormInput from "../../../Components/FormInput";

function Calendar() {
    const [currentMonth, setCurrentMonth] = useState(getMonth());
    const { monthIndex, showModal, setShowModal, daySelected, dataDate, setDataDate, arrDataDate, setArrDataDate, sendDesc, sendTitle, setSendDesc, setSendTitle } = useContext(GlobalContext);

    const localSto = JSON.parse(localStorage.getItem("DateNotify"));
    const [dataSave, setDataSave] = useState(localSto ?? []);
    const [title, setTitle] = useState(sendDesc);
    const [desc, setDesc] = useState(sendTitle);

    useEffect(() => {
        setCurrentMonth(getMonth(monthIndex));
    }, [monthIndex, dataDate]);

    // change localStorage
    useEffect(() => {
        setArrDataDate(dataSave);
    }, [dataSave])

    useEffect(() => {
        setTitle(sendTitle);
        setDesc(sendDesc);
    }, [showModal])

    const onHandleSubmit = (e) => {
        e.preventDefault();
        let calendarEvent = {
            id: dataDate.format("DD-MM-YYYY"),
            // id: Date.now(),
            title: title,
            desc: desc,
            day: daySelected.valueOf(),
        }

        // setDataSave(dataSave.push(calendarEvent))
        // console.log(calendarEvent);
        // console.log("DataDate:", dataDate)
        // console.log("data local:", dataSave);

        setShowModal(false);
        // console.log(dataDate)
        // console.log(calendarEvent);
        setDataSave((prev) => {
            const newData = [...prev];      
            // const newArr = newData.filter(item => item.id !== dataDate.format("DD-MM-YYYY").toString())
            // console.log("new ARR:", newArr);
            // newArr.push(calendarEvent);
            // console.log("arr sau khi add:", newArr);

            for(let i=0; i<newData.length; i++){
                if(newData[i].id === dataDate.format("DD-MM-YYYY")) {
                    newData.splice(i, 1);
                }
            }

            newData.push(calendarEvent);
            const jsonDate = JSON.stringify(newData);
            localStorage.setItem("DateNotify", jsonDate);
            return newData;
        });

        calendarEvent = {};

    }



    return (
        <Fragment>
            <div className={clsx(styles.wrapper)}>
                <div className={clsx(styles.heading)}>Calendar</div>
                <CalendarHeader />
                <div className={clsx(styles.table)}>
                    <Month dataMonth={currentMonth} />
                </div>
            </div>

            {showModal &&
                <Modal open
                    close={() => {
                        setShowModal(false)
                        setSendDesc("");
                        setSendTitle("");
                    }}
                >
                    <form className={clsx(styles.modal)}
                        onSubmit={onHandleSubmit}
                    >
                        <div className={clsx(styles.contentTop)}>
                            <div className={clsx(styles.heading)}>
                                Add new notify
                            </div>
                            <div className={clsx(styles.body)}>
                                <FormInput
                                    label="Add title"
                                    type="text"
                                    name="title"
                                    placeholder="Add title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                                <FormInput
                                    label="Date"
                                    type="text"
                                    name="date"
                                    placeholder="Date"
                                    value={daySelected}
                                    onChange={() => { }}
                                    disable="true"
                                />
                                <FormInput
                                    label="Description"
                                    type="text"
                                    name="desc"
                                    placeholder="Add description"
                                    value={desc}
                                    onChange={(e) => setDesc(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className={clsx(styles.userActive)}>
                            <Button className={clsx(styles.test)} primary medium onClick={() => {
                                setShowModal(false)
                                setSendDesc("");
                                setSendTitle("");
                            }}>exit</Button>
                            {dataSave &&
                                dataSave.map((item, index) => {
                                    if (item.id === dataDate.format("DD-MM-YYYY")) {
                                        return (
                                            <Button primary medium
                                                onClick={() => {
                                                    setDataSave((prev) => {
                                                        const newData = [...prev];
                                                        newData.splice(index, 1);
                                                        const jsonDate = JSON.stringify(newData);
                                                        localStorage.setItem("DateNotify", jsonDate);
                                                        return newData;
                                                    })
                                                    setShowModal(false);
                                                }}
                                                key={index}
                                            >Delete</Button>
                                        )
                                    }


                                })
                            }
                            <Button primary medium>Update</Button>
                        </div>
                    </form>
                </Modal>
            }

        </Fragment>
    );
}

export default Calendar;