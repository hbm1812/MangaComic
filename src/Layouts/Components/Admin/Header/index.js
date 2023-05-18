import clsx from "clsx";
import { useContext } from "react";
import { BarsIcon, BellIcon, CommentIcon } from "../../../../Components/Icon";
import Image from "../../../../Components/Image";
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
                    <Image
                        className={clsx(styles.avatar)}
                        alt={"hello"}
                        src={LocalUserLogin.avatar ?? "https://us.123rf.com/450wm/urfandadashov/urfandadashov1809/urfandadashov180901275/109135379-photo-not-available-vector-icon-isolated-on-transparent-background-photo-not-available-logo-concept.jpg?ver=6"}
                    />
                    {/* <img className={clsx(styles.avatar)} src={LocalUserLogin && LocalUserLogin.avatar} /> */}
                    <p>Hi,<span>{LocalUserLogin && LocalUserLogin.name}</span></p>
                </div>
            </div>
        </div>
    );
}

export default Header;