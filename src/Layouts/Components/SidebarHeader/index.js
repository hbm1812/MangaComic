import styles from './SidebarHeader.module.scss';
import clsx from 'clsx';
//image
import bgHeader from "../../../assets/images/Base/sidebar-header-bg.jpg";
import bgAvatar from "../../../assets/images/Base/sidebar-user.png"; 
import bg from "../../../assets/images/Base/background.png";

// font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faUser, faPenToSquare, faUnlock, faFilm, faHeart, faBell, faLightbulb, faPowerOff } from '@fortawesome/free-solid-svg-icons';

// component
import Button from '../../../Components/Button';

function SidebarHeader() {
    return ( 
        <section className={clsx(styles.wrapper)}>
            <header className={clsx(styles.header)}>
                <img src={bgHeader} alt="" className={clsx(styles.headerBg)} />
                <div className={clsx(styles.headerMain)}>
                    <div className={clsx(styles.headerInfo)}>
                        <div className={clsx(styles.headerInfoTop)}>
                            <FontAwesomeIcon icon={faXmark} className={clsx(styles.headerClose)} />
                            <h3 className={clsx(styles.headerUsername)}>Chào Huy Nguyễn</h3>
                        </div>                        
                        <div className={clsx(styles.headerAvatar)}>
                            <img src={bgAvatar} alt="" />
                        </div>
                    </div>
                    <div className={clsx(styles.headerListAction)}>
                        <Button primary>Thông tin</Button>
                        <Button primary>Thông báo</Button>
                    </div>
                </div>                
            </header>
            <div className={clsx(styles.content)}>
                <ul className={clsx(styles.contentList)}>
                    <li className={clsx(styles.contentItem)}><a href="">
                        <FontAwesomeIcon icon={faUser} className={clsx(styles.contentIcon)}/>
                        <p>Trang cá nhân</p>
                    </a></li>
                    <li className={clsx(styles.contentItem)}><a href="">
                        <FontAwesomeIcon icon={faPenToSquare} className={clsx(styles.contentIcon)}/>
                        <p>Sửa thông tin</p>
                    </a></li>
                    <li className={clsx(styles.contentItem)}><a href="">
                        <FontAwesomeIcon icon={faUnlock} className={clsx(styles.contentIcon)}/>
                        <p>Dổi mật khẩu</p>
                    </a></li>
                    <hr />
                    <li className={clsx(styles.contentItem)}><a href="">
                        <FontAwesomeIcon icon={faFilm} className={clsx(styles.contentIcon)}/>
                        <p>Phim đã xem</p>
                    </a></li>
                    <li className={clsx(styles.contentItem)}><a href="">
                        <FontAwesomeIcon icon={faHeart} className={clsx(styles.contentIcon)}/>
                        <p>Phim đã thích</p>
                    </a></li>
                    <li className={clsx(styles.contentItem)}><a href="">
                        <FontAwesomeIcon icon={faBell} className={clsx(styles.contentIcon)}/>
                        <p>Phim đang theo dõi</p>
                    </a></li>
                    <hr />
                    <li className={clsx(styles.contentItem)}><a href="">
                        <FontAwesomeIcon icon={faLightbulb} className={clsx(styles.contentIcon)}/>
                        <p>Dark mode</p>
                    </a></li>                    
                    <hr />
                    <li className={clsx(styles.contentItem)}><a href="">
                        <FontAwesomeIcon icon={faPowerOff} className={clsx(styles.contentIcon)}/>
                        <p>Đăng xuất</p>
                    </a></li>                    
                    
                </ul>
            </div>            
        </section>
    );
}

export default SidebarHeader;