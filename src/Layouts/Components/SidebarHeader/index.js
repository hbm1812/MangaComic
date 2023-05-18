import styles from './SidebarHeader.module.scss';
import clsx from 'clsx';
//image
import bgHeader from "../../../assets/images/Base/sidebar-header-bg.jpg";
import bgAvatar from "../../../assets/images/Base/sidebar-user.png";
import bg from "../../../assets/images/Base/background.png";

// font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faUser, faPenToSquare, faUnlock, faFilm, faHeart, faBell, faLightbulb, faPowerOff, faL } from '@fortawesome/free-solid-svg-icons';

// component
import Button from '../../../Components/Button';
import GlobalContext from '../../../Contexts/GlobalContext';
import { Fragment, useContext, useEffect, useState } from 'react';
import Modal from '../../../Components/Modal';
import FormInput from '../../../Components/FormInput';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { WindowScrollTop } from '../../../util';

function SidebarHeader() {
    const { toggleSidebar, setToggleSidebar } = useContext(GlobalContext);     
    // check user login
    const LocalUserLogin = JSON.parse(localStorage.getItem("DataUser")) ?? null;    

    // console.log("LocalUserLogin", LocalUserLogin)

    return (
        <Fragment>
            <section className={clsx(styles.wrapper, {
                [styles.show]: toggleSidebar,
            })}
                onClick={(e) => {
                    e.preventDefault();
                }}
            >
                <header className={clsx(styles.header)}>
                    <img src={bgHeader} alt="" className={clsx(styles.headerBg)} />
                    <div className={clsx(styles.headerMain)}>
                        <div className={clsx(styles.headerInfo)}>
                            <div className={clsx(styles.headerInfoTop)}>
                                <FontAwesomeIcon icon={faXmark} className={clsx(styles.headerClose)}
                                    onClick={() => {
                                        setToggleSidebar(false);
                                    }}
                                />
                                {LocalUserLogin ?
                                    <h3 className={clsx(styles.headerUsername)}>Chào {LocalUserLogin && LocalUserLogin.name}</h3>
                                    :
                                    <h3 className={clsx(styles.headerUsername)}>Welcome to Manga Comic</h3>
                                }
                            </div>
                            <div className={clsx(styles.headerAvatar)}>
                                <img src={LocalUserLogin && LocalUserLogin.avatar || "https://us.123rf.com/450wm/urfandadashov/urfandadashov1809/urfandadashov180901275/109135379-photo-not-available-vector-icon-isolated-on-transparent-background-photo-not-available-logo-concept.jpg?ver=6"} alt="" 
                                    style={{borderRadius: "50%"}}
                                />
                            </div>
                        </div>
                        <div className={clsx(styles.headerListAction)}>
                            {!LocalUserLogin ?
                                <Button primary to="/login">Đăng nhập</Button>
                                :
                                <Fragment>
                                    <Button primary>Thông tin</Button>
                                    <Button primary>Thông báo</Button>
                                </Fragment>
                            }
                        </div>
                    </div>
                </header>
                <div className={clsx(styles.content)}>
                    <ul className={clsx(styles.contentList)}>
                        <li className={clsx(styles.contentItem)} onClick={() => {
                            WindowScrollTop();
                            setToggleSidebar(false);
                        }}><Link to={`/admin/Personal`}>
                            <FontAwesomeIcon icon={faUser} className={clsx(styles.contentIcon)} />
                            <p>Trang cá nhân</p>
                        </Link></li>
                        <li className={clsx(styles.contentItem)} onClick={() => {
                            WindowScrollTop();
                            setToggleSidebar(false);
                        }}><Link to={`/admin/Personal`}>
                            <FontAwesomeIcon icon={faPenToSquare} className={clsx(styles.contentIcon)} />
                            <p>Sửa thông tin</p>
                        </Link></li>
                        <li className={clsx(styles.contentItem)} onClick={() => {
                            WindowScrollTop();
                            setToggleSidebar(false);
                        }}><Link to={`/admin/Personal`}>
                            <FontAwesomeIcon icon={faUnlock} className={clsx(styles.contentIcon)} />
                            <p>Dổi mật khẩu</p>
                        </Link></li>
                        <hr />
                        <li className={clsx(styles.contentItem)} onClick={() => {
                            WindowScrollTop();
                            setToggleSidebar(false);
                        }}><Link to={`/admin/Personal`}>
                            <FontAwesomeIcon icon={faFilm} className={clsx(styles.contentIcon)} />
                            <p>Phim đã xem</p>
                        </Link></li>
                        <li className={clsx(styles.contentItem)} onClick={() => {
                            WindowScrollTop();
                            setToggleSidebar(false);
                        }}><Link to={`/admin/Personal`}>
                            <FontAwesomeIcon icon={faHeart} className={clsx(styles.contentIcon)} />
                            <p>Phim đã thích</p>
                        </Link></li>
                        <li className={clsx(styles.contentItem)} onClick={() => {
                            WindowScrollTop();
                            setToggleSidebar(false);
                        }}><Link to={`/admin/Personal`}>
                            <FontAwesomeIcon icon={faBell} className={clsx(styles.contentIcon)} />
                            <p>Phim đang theo dõi</p>
                        </Link></li>
                        <hr />
                        <li className={clsx(styles.contentItem)} onClick={() => {
                            WindowScrollTop();
                            setToggleSidebar(false);
                        }}><Link to={`/admin/Personal`}>
                            <FontAwesomeIcon icon={faLightbulb} className={clsx(styles.contentIcon)} />
                            <p>Dark mode</p>
                        </Link></li>
                        {LocalUserLogin &&
                            <Fragment>
                                <hr />
                                <li className={clsx(styles.contentItem)}
                                    onClick={() => {
                                        setToggleSidebar(false);
                                        localStorage.removeItem("DataUser");
                                    }}
                                ><a href="">
                                        <FontAwesomeIcon icon={faPowerOff} className={clsx(styles.contentIcon)} />
                                        <p>Đăng xuất</p>
                                    </a></li>
                            </Fragment>
                        }

                    </ul>
                </div>
            </section>            
        </Fragment>
    );
}

export default SidebarHeader;