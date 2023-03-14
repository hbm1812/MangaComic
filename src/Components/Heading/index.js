import styles from './Heading.module.scss';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";

Heading.propsTypes = {
    children: PropTypes.node.isRequired,
    to: PropTypes.string,
    href: PropTypes.string,
    onClick: PropTypes.func,
    primary: PropTypes.bool,
    origin: PropTypes.bool,
    active: PropTypes.bool,
    small: PropTypes.bool,
    normal: PropTypes.bool,
    large: PropTypes.bool,

    iconLeft: PropTypes.element,
    iconRight: PropTypes.element,

}

function Heading({children, to, href, onClick, primary, origin, small, normal, large, active, iconLeft, iconRight}) {
    let Comp = 'a';
    const props = {
        onClick,
    }

    if(to) {
        props.to = to;
        Comp = Link;
    } else if(href) {
        props.href = href;
        Comp = 'a';
    }

    const classes = clsx(styles.wrapper, {
        [styles.active] : active,
        [styles.primary] : primary,
        [styles.origin] : origin,
        [styles.smallSize] : small,
        [styles.normalSize] : normal,
        [styles.largeSize] : large,
        
    });

    return (
        <Comp className={classes} {...props}>
            {iconLeft && <span className={clsx(styles.icon)}>{iconLeft}</span>}
            <span className={clsx(styles.title)}>
                {children}                
            </span>
            {iconRight && <span className={clsx(styles.icon)}>{iconRight}</span>}
        </Comp> 
    );
}

export default Heading;