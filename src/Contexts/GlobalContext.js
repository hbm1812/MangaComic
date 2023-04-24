import React from "react";

const GlobalContext = React.createContext({
    // Calendar
    monthIndex: 0,
    setMonthIndex: (index) => {},
    daySelected: null,
    setDaySelected: (day) => {},
    showModal: false,
    setShowModal: (show) => {},
    dispatchCallEvent: ({type, payload}) => {},
    dataDate: null,
    setDataDate: () => {},
    arrDataDate: null,
    setArrDataDate: () => {},
    sendTitle: null,
    setSendTitle: () => {},
    sendDesc: null,
    setSendDesc: () => {},

    // combobox
    nameCombobox: "",
    setNameCombobox: () => {},

    // news detail
    newsDetail: null,
    setNewsDetail: () => {},

    // comments 
    fetchApiComment: false,
    setFetchApiComment: () => {},

    // dataChapter manga 
    dataItemChapter: {},
    setDataItemChapter: () => {},

    // sidebar header
    toggleSidebar: false,
    setToggleSidebar: () => {},

    // toggle menu sidebar in admin layout (info user) 
    toggleSidebarInfoUser: false,
    setToggleSidebarInfoUser: () => {},

    // selectedIdCharacter
    selectedIdCharacter: -1,
    setSelectedIdCharacter: () => {},

})

export default GlobalContext;