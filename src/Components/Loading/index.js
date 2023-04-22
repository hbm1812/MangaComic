import clsx from "clsx";
import styles from "./Loading.module.scss";


function LoadingSkeleton() {
    return (
        <div className={clsx(styles.container)}>
            <div className={clsx(styles.loader)}></div>
        </div>
    );
}

export default LoadingSkeleton;