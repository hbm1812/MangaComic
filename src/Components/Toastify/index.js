import React, { useState, forwardRef, useImperativeHandle } from 'react';
import clsx from 'clsx';
import styles from "./Toastify.module.scss";
import { XmarkIcon } from '../Icon';
import PropTypes from "prop-types";

function Toastify({ children, onClick, icon, error, success, warning, timeout = 1500}, ref) {
    const [show, setShow] = useState(false);

    useImperativeHandle(ref, () => {
        return {
            showToast: () => {
                setShow(true);
                setTimeout(() => {
                    setShow(false);
                }, timeout)
            }
        }
    })

    const classes = clsx(styles.container, {
        [styles.error]: error,
        [styles.success]: success,
        [styles.warning]: warning,
    })

    const classesShow = clsx(styles.container, {
        [styles.show]: true,
        [styles.error]: error,
        [styles.success]: success,
        [styles.warning]: warning,

    })

    return (
        <div className={show ? classesShow : classes}>
            <XmarkIcon className={clsx(styles.btnClose)} onClick={() => {
                setShow(false);
            }}/>
            {icon && <span className={clsx(styles.icon)}>{icon}</span>}
            <span className={clsx(styles.title)}>{children}</span>
        </div>
    );
}

const ModalToastify = forwardRef(Toastify);

ModalToastify.propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
    icon: PropTypes.element,
    error: PropTypes.bool,
    success: PropTypes.bool,
    warning: PropTypes.bool,
    timeout: PropTypes.number,
}

export default forwardRef(Toastify);