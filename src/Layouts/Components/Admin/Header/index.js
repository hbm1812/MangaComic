import clsx from "clsx";
import { useContext } from "react";
import { BarsIcon, BellIcon, CommentIcon } from "../../../../Components/Icon";
import GlobalContext from "../../../../Contexts/GlobalContext";
import styles from "./Header.module.scss"

function Header() {
    const LocalUserLogin = JSON.parse(localStorage.getItem("DataUser")) ?? null;
    // console.log("LocalUserLogin", LocalUserLogin)
    const { toggleSidebarInfoUser, setToggleSidebarInfoUser } = useContext(GlobalContext)
    return (
        <div className={clsx(styles.wrapper, {
            [styles.hidden]: toggleSidebarInfoUser,
        })}>
            <div className={clsx(styles.headerLeft)}>
                <BarsIcon className={clsx(styles.menuIcon)} 
                    onClick={() => setToggleSidebarInfoUser(!toggleSidebarInfoUser)}
                />
            </div>
            <div className={clsx(styles.headerRight)}>
                <CommentIcon className={clsx(styles.chatIcon)} />
                <BellIcon className={clsx(styles.bellIcon)} />
                <div className={clsx(styles.user)}>
                    <img className={clsx(styles.avatar)} src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_960_720.png" />
                    <p>Hi,<span>{LocalUserLogin && LocalUserLogin.name}</span></p>
                </div>
            </div>
        </div>
    );
}

export default Header;