import styles from './DefaultLayout.module.scss';
import clsx from 'clsx';

// component layout
import Header from '../Components/Header';
import SidebarHeader from '../Components/SidebarHeader';

import bg from '../../assets/images/Base/background.png';
import { useContext } from 'react';
import GlobalContext from '../../Contexts/GlobalContext';

function DefaultLayout({ children }) {
    const { toggleSidebar, setToggleSidebar } = useContext(GlobalContext);

    const handleCloseSidebar = () => {
        setToggleSidebar(false);
    }
    return (
        <div className={clsx(styles.wrapper)}>
            <Header />
            {/* <Sidebar/> */}
            <SidebarHeader />
            <section className={clsx(styles.container)}
                onClick={() => handleCloseSidebar()}
            >
                {children}
            </section>
            <div className={clsx(styles.overlay)}
                style={{
                    background: `url(${bg})`,
                    backgroundRepeat: "no-repeat",
                    backgroundAttachment: "fixed",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >

            </div>
        </div>
    );
}

export default DefaultLayout;