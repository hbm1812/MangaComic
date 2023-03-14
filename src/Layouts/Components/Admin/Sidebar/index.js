import clsx from "clsx";
import styles from "./Sidebar.module.scss";
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { XmarkIcon } from "../../../../Components/Icon";

const dataLink = [
    {
        title: "Manage",
        links: [
            {
                to: "table",
                name: "Table",
                icon: <XmarkIcon />
            },
            {
                to: "table",
                name: "orders",
                icon: <XmarkIcon />
            },
            {
                to: "table",
                name: "orders",
                icon: <XmarkIcon />
            },
        ]
    },
    {
        title: "Apps",
        links: [
            {
                to: "calendar",
                name: "Calendar",
                icon: <XmarkIcon />
            },
            {
                to: "table",
                name: "orders",
                icon: <XmarkIcon />
            },
            {
                to: "table",
                name: "orders",
                icon: <XmarkIcon />
            },
        ]
    },
    {
        title: "Pages",
        links: [
            {
                to: "table",
                name: "orders",
                icon: <XmarkIcon />
            },
            {
                to: "table",
                name: "orders",
                icon: <XmarkIcon />
            },
            {
                to: "table",
                name: "orders",
                icon: <XmarkIcon />
            },
        ]
    },
    {
        title: "Pages",
        links: [
            {
                to: "table",
                name: "orders",
                icon: <XmarkIcon />
            },
            {
                to: "table",
                name: "orders",
                icon: <XmarkIcon />
            },
            {
                to: "table",
                name: "orders",
                icon: <XmarkIcon />
            },
        ]
    },
    {
        title: "Pages",
        links: [
            {
                to: "table",
                name: "orders",
                icon: <XmarkIcon />
            },
            {
                to: "table",
                name: "orders",
                icon: <XmarkIcon />
            },
            {
                to: "table",
                name: "orders",
                icon: <XmarkIcon />
            },
        ]
    },
    {
        title: "Pages",
        links: [
            {
                to: "table",
                name: "orders",
                icon: <XmarkIcon />
            },
            {
                to: "table",
                name: "orders",
                icon: <XmarkIcon />
            },
            {
                to: "table",
                name: "orders",
                icon: <XmarkIcon />
            },
        ]
    },
    {
        title: "Pages",
        links: [
            {
                to: "table",
                name: "orders",
                icon: <XmarkIcon />
            },
            {
                to: "table",
                name: "orders",
                icon: <XmarkIcon />
            },
            {
                to: "table",
                name: "orders",
                icon: <XmarkIcon />
            },
        ]
    },
    {
        title: "Pages",
        links: [
            {
                to: "table",
                name: "orders",
                icon: <XmarkIcon />
            },
            {
                to: "table",
                name: "orders",
                icon: <XmarkIcon />
            },
            {
                to: "table",
                name: "orders",
                icon: <XmarkIcon />
            },
        ]
    },
    {
        title: "Pages",
        links: [
            {
                to: "table",
                name: "orders",
                icon: <XmarkIcon />
            },
            {
                to: "table",
                name: "orders",
                icon: <XmarkIcon />
            },
            {
                to: "table",
                name: "orders",
                icon: <XmarkIcon />
            },
        ]
    },
]

function Sidebar() {
    const [activeMenu, setActiveMenu] = useState(true);
    return (
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.head)}>
                <Link to="/admin" className={clsx(styles.linkDashboard)}>
                    <div className={clsx(styles.imgWrap)}>
                        <img src="https://marketplace.magento.com/media/catalog/product/4/a/4acb_rsz_admin-logo_1.png" alt="" />
                    </div>
                    <p className={clsx(styles.nameLogo)}>Admin</p>
                </Link>
                <XmarkIcon className={clsx(styles.closeIcon)} />
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