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
    const [toggleSidebar, setToggleSidebar] = useState(false);
    const [toggleSidebarInfoUser, setToggleSidebarInfoUser] = useState(false);
    const [selectedIdCharacter, setSelectedIdCharacter] = useState(-1);
    const [showInputClone, setShowInputClone] = useState(false);
    const [saveImageSubComment, setSaveImageSubComment] = useState("");
    const [saveNameStatus, setSaveNameStatus] = useState("");
    const [saveCategory, setSaveCategory] = useState("");



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
                // toggle sidebar header 
                toggleSidebar,
                setToggleSidebar,  
                // toggle sidebar info user layout 
                toggleSidebarInfoUser,
                setToggleSidebarInfoUser,
                // character id show detail 
                selectedIdCharacter,
                setSelectedIdCharacter,
                // comment
                showInputClone,
                setShowInputClone,
                saveImageSubComment,
                setSaveImageSubComment,
                // find manga detail 
                saveNameStatus,
                setSaveNameStatus,
                saveCategory,
                setSaveCategory,
            }}>
            {props.children}
        </GlobalContext.Provider>
    );
}

export default ContextWrapper;