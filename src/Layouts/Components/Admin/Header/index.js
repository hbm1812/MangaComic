import clsx from "clsx";
import { BarsIcon, BellIcon, CommentIcon } from "../../../../Components/Icon";
import styles from "./Header.module.scss"

function Header() {
    return (  
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.headerLeft)}>
                <BarsIcon className={clsx(styles.menuIcon)}/>
            </div>
            <div className={clsx(styles.headerRight)}>
                <CommentIcon className={clsx(styles.chatIcon)}/>
                <BellIcon className={clsx(styles.bellIcon)}/>
                <div className={clsx(styles.user)}>
                    <img className={clsx(styles.avatar)} src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_960_720.png"/>
                    <p>Hi,<span>huy1233213213213213213213213</span></p>
                </div>
            </div>
        </div>
    );
}

export default Header;