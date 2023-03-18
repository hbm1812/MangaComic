import clsx from 'clsx';
import styles from './Header.module.scss';
import { useEffect, useState } from 'react';

// component
import { Link } from 'react-router-dom';
import Button from '../../../Components/Button';
import { BellIcon, UserIcon, CaretDownIcon } from '../../../Components/Icon';
import Search from '../Search';
import Menu from '../../../Components/Menu';


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
        icon: <CaretDownIcon/>,
        title: "BXH",
        to: "/"
    },
    {
        icon: <CaretDownIcon/>,
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
    return (
        <div className={clsx(styles.navbar)}>
            <Link to="/" className={clsx(styles.navbarLogoLink)}>
                <img src="https://disney-clone-a532a.web.app/images/logo.svg" alt="" className={clsx(styles.navbarLogo)} />
            </Link>
            <div className={clsx(styles.navbarCenter)}>
                <Menu
                    items={MENU_ITEM}
                >
                    <Button>hello test</Button>
                </Menu>                
                <Search/>
            </div>
            <div className={clsx(styles.navbarUser)}>
                <BellIcon className={clsx(styles.navbarNotify)}/>                
                <UserIcon className={clsx(styles.navbarUserAvatar)} />
            </div>
        </div>
    );
}

export default Header;