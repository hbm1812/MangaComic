import clsx from 'clsx';
import styles from './Header.module.scss';
import { useContext, useEffect, useState } from 'react';

// component
import { Link } from 'react-router-dom';
import Button from '../../../Components/Button';
import { BellIcon, UserIcon, CaretDownIcon } from '../../../Components/Icon';
import Search from '../Search';
import Menu from '../../../Components/Menu';
import GlobalContext from '../../../Contexts/GlobalContext';
import Image from '../../../Components/Image';


const MENU_ITEM = [
    {
        icon: null,
        title: "Truyện tranh",
        to: "/manga"
    },
    {
        icon: null,
        title: "Tin tức",
        // to: "/tin-tuc"
        to: "/news"
    },
    {
        icon: null,
        title: "BXH",
        to: "/ranking"
    },
    {
        icon: <CaretDownIcon />,
        title: "Xem thêm",
        to: "/",
        subNav: [
            {
                title: "Giới thiệu thêm",
                to: "/"
            },
            {
                title: "Cửa Hàng",
                to: "/"
            },
            {
                title: "About me",
                to: "/"
            },
            {
                title: "Nạp tiền :v",
                to: "/"
            }
        ]
    },
]

function Header() {
    const { toggleSidebar, setToggleSidebar } = useContext(GlobalContext);
    const LocalUserLogin = JSON.parse(localStorage.getItem("DataUser")) ?? null;

    // console.log("LocalUserLogin", LocalUserLogin)
    const closeSidebar = () => {
        setToggleSidebar(false);
    }
    // console.log("toggleSidebar", toggleSidebar)
    return (
        <div className={clsx(styles.navbar)}>
            <Link to="/" className={clsx(styles.navbarLogoLink)}
                onClick={() => closeSidebar()}
            >
                <img src="https://disney-clone-a532a.web.app/images/logo.svg" alt="" className={clsx(styles.navbarLogo)} />
            </Link>
            <div className={clsx(styles.navbarCenter)}
                onClick={() => closeSidebar()}
            >
                <Menu
                    items={MENU_ITEM}
                >
                    <Button>hello test</Button>
                </Menu>
                <Search />
            </div>
            <div className={clsx(styles.navbarUser)}
                onClick={(e) => e.preventDefault()}
            >
                <BellIcon className={clsx(styles.navbarNotify)} />
                {!LocalUserLogin &&
                    <UserIcon className={clsx(styles.navbarUserAvatar)}
                        onClick={() => {
                            setToggleSidebar(true)
                        }}
                    />
                }

                {LocalUserLogin &&
                    <div className={clsx(styles.userAvatarWrapper)}
                        onClick={() => {
                            setToggleSidebar(true)
                        }}
                    >
                        <Image
                            className={clsx(styles.avatar)}
                            alt={"hello"}
                            src={LocalUserLogin.avatar ?? "https://us.123rf.com/450wm/urfandadashov/urfandadashov1809/urfandadashov180901275/109135379-photo-not-available-vector-icon-isolated-on-transparent-background-photo-not-available-logo-concept.jpg?ver=6"}
                        />
                    </div>
                }
            </div>
        </div>
    );
}

export default Header;