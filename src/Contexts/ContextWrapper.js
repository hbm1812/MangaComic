import React, { useEffect, useReducer, useState } from "react";
import GlobalContext from "./GlobalContext";
import dayjs from "dayjs";

function ContextWrapper(props) {
    const [monthIndex, setMonthIndex] = useState(dayjs().month());
    const [daySelected, setDaySelected] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [dataDate, setDataDate] = useState({});
    const [arrDataDate, setArrDataDate] = useState([]);
    const [sendTitle, setSendTitle] = useState("");
    const [sendDesc, setSendDesc] = useState("");
    const [newsDetail, setNewsDetail] = useState({});
    const [fetchApiComment, setFetchApiComment] = useState(false);
    const [dataItemChapter, setDataItemChapter] = useState({});

    // combobox
    const [nameCombobox, setNameCombobox] = useState("");    
    return (
        <GlobalContext.Provider
            value={{
                monthIndex,
                setMonthIndex,
                daySelected,
                setDaySelected,
                showModal,
                setShowModal,
                dataDate,
                setDataDate,
                arrDataDate,
                setArrDataDate,
                sendTitle,
                setSendTitle,
                sendDesc,
                setSendDesc,
                nameCombobox,
                setNameCombobox,
                newsDetail,
                setNewsDetail,
                fetchApiComment,
                setFetchApiComment,
                dataItemChapter,
                setDataItemChapter,
            }}>
            {props.children}
        </GlobalContext.Provider>
    );
}

export default ContextWrapper;