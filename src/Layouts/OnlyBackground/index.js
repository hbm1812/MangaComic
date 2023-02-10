import styles from './OnlyBackground.module.scss';
import clsx from 'clsx';

import bg from '../../assets/images/Base/background.png';

function OnlyBackground({ children }) {
    return (
        <div className={clsx(styles.wrapper)}>                        
            <section className={clsx(styles.container)}>                                            
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

export default OnlyBackground;