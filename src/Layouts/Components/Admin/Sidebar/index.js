import clsx from "clsx";
import styles from "./Sidebar.module.scss";
import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { CalendarIcon, HouseIcon, NewsPaperIcon, TableCellsLargeIcon, UserIcon, XmarkIcon } from "../../../../Components/Icon";
import GlobalContext from "../../../../Contexts/GlobalContext";

const dataLink = [
    {
        title: "Manage",
        links: [
            {
                to: "table",
                name: "Bảng tính",
                icon: <TableCellsLargeIcon />
            },
            {
                to: "users",
                name: "Người Dùng",
                icon: <UserIcon />
            },
            {
                to: "Personal",
                name: "Hồ sơ người dùng",
                icon: <NewsPaperIcon />
            },
        ]
    },
    {
        title: "Apps",
        links: [
            {
                to: "calendar",
                name: "Lịch",
                icon: <CalendarIcon />
            },
            {
                to: "/",
                name: "Manga Comic",
                icon: <HouseIcon />
            },
            // {
            //     to: "table",
            //     name: "orders",
            //     icon: <XmarkIcon />
            // },
        ]
    }    
]

function Sidebar() {
    const { toggleSidebarInfoUser, setToggleSidebarInfoUser } = useContext(GlobalContext)
    
    return (
        <div className={clsx(styles.wrapper, {
            [styles.hidden]: toggleSidebarInfoUser
        })}>
            <div className={clsx(styles.head)}>
                <Link to="/" className={clsx(styles.linkDashboard)}>
                    <div className={clsx(styles.imgWrap)}>
                        <img src="https://marketplace.magento.com/media/catalog/product/4/a/4acb_rsz_admin-logo_1.png" alt="" />
                    </div>
                    <p className={clsx(styles.nameLogo)}>Welcome</p>
                </Link>
                <XmarkIcon className={clsx(styles.closeIcon)} 
                    onClick={() => setToggleSidebarInfoUser(!toggleSidebarInfoUser)}
                />
            </div>
            <div className={clsx(styles.menu)}>
                {dataLink.map((item, index) => {
                    return (
                        <div className={clsx(styles.item)} key={index}>
                            <p className={clsx(styles.title)}>
                                {item.title}
                            </p>
                            <ul className={clsx(styles.subMenu)}>
                                {item.links.map((item, index) => {
                                    if(item.to == "/") {
                                        return (
                                            <li className={clsx(styles.subItem)} key={index}>
                                                <Link to={`${item.to}`} className={clsx(styles.navLink)}>
                                                    <span className={clsx(styles.subItemIcon)}>
                                                        {item.icon}
                                                    </span>
                                                    <p className={clsx(styles.subItemName)}>{item.name}</p>
                                                </Link>
                                            </li>
                                        )
                                    }

                                    return (
                                        <li className={clsx(styles.subItem)} key={index}>
                                            <Link to={`/admin/${item.to}`} className={clsx(styles.navLink)}>
                                                <span className={clsx(styles.subItemIcon)}>
                                                    {item.icon}
                                                </span>
                                                <p className={clsx(styles.subItemName)}>{item.name}</p>
                                            </Link>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default Sidebar;