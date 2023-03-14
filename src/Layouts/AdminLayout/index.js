import styles from './AdminLayout.module.scss';
import clsx from 'clsx';

// component layout

import bg from '../../assets/images/Base/background.png';
import Sidebar from '../Components/Admin/Sidebar';
import Header from '../Components/Admin/Header';

function AdminLayout({ children }) {
    return (
        <div className={clsx(styles.wrapper)}>
            <Header/>
            <Sidebar/>            
            <section className={clsx(styles.container)}>
                {children}
            </section>
            {/* <div className={clsx(styles.overlay)}
                style={{
                    background: `url(${bg})`,
                    backgroundRepeat: "no-repeat",
                    backgroundAttachment: "fixed",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >

            </div> */}
        </div>
    );
}

export default AdminLayout;