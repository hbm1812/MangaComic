import clsx from "clsx";
import styles from "./Modal.module.scss";
import Button from "../Button";
import { Fragment } from "react";
import PropTypes from "prop-types";

Modal.propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
    open: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.bool,
    ]),
    close: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.bool,
    ]),
}

function Modal({ children, onClick, open, close, custom }) {
    if (!open) return null;

    if (custom) {
        return (
            <div className={clsx(styles.wrapper)} onClick={close}>
                <div className={clsx(styles.mainCustom)}
                    onClick={(e) => e.stopPropagation()}
                >
                    {children}
                </div>
            </div>
        )
    }

    return (
        <div className={clsx(styles.wrapper)} onClick={close}>
            <div className={clsx(styles.main)}
                onClick={(e) => e.stopPropagation()}
            >
                <div className={clsx(styles.content)}>
                    {children}
                </div>

            </div>
        </div>
    );
}

export default Modal;