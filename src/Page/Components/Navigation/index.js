import styles from "./Navigation.module.scss";
import clsx from "clsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";

function Navigation({children, onClick, to, href, icon, active}) {
    const props = {
        onClick,
    };
    let Comp = "a";

    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = "a";
    }

    const classesWrapper = clsx(styles.wrapper, {
        [styles.active]: active,
    })

    const classesIc = clsx(styles.icon, {
        [styles.paddingLeft]: children && icon,
    })

    return ( 
        <Comp className={classesWrapper} {...props}>
            <span>
                {children}
                {icon == "right" ?
                    <FontAwesomeIcon icon={faAngleRight} className={classesIc} />
                    : icon == "left" ?
                    <FontAwesomeIcon icon={faAngleLeft} className={classesIc} />
                    : ""
                }
            </span>
        </Comp>
    );
}

export default Navigation;