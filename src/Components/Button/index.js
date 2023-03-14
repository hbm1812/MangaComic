import styles from './Button.module.scss';
import clsx from 'clsx';
// link trong react route dom là link nội bộ trong web
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

Button.propTypes = {
    to: PropTypes.string,
    href: PropTypes.string,
    onClick: PropTypes.func,
    primary: PropTypes.bool,
    outline: PropTypes.bool,
    transparent: PropTypes.bool,
    small: PropTypes.bool,
    medium: PropTypes.bool,
    large: PropTypes.bool,
    active: PropTypes.bool,
    scale: PropTypes.bool,
    danger: PropTypes.bool,
    edit: PropTypes.bool,
    view: PropTypes.bool,
    disabled: PropTypes.bool,
    light: PropTypes.bool,

    iconLeft: PropTypes.element,
    iconRight: PropTypes.element,

    children: PropTypes.node,

}

// ...passProps để truyền các props khác từ các layout sd component này thêm vào 
function Button({
        to, 
        href,         
        children, 
        onClick,
        primary = false, 
        outline = false,
        transparent = false, 
        small = false, 
        medium = false, 
        large = false,
        active = false,
        iconLeft,
        iconRight,
        scale = false,
        rotate = false,
        danger = false,
        edit = false,
        view = false,
        disabled = false,  
        light = false,      
    }) {
    let Comp = 'button';
    const props = {
        onClick,    
        disabled,    
    };

    if(to) {
        props.to = to;
        Comp = Link;
    } else if(href) {
        props.href = href;
        Comp = 'a';
    }

    
    const classes = clsx(styles.wrapper, {
        [styles.primary]: primary,
        [styles.outline]: outline,
        [styles.transparent]: transparent,
        [styles.light]: transparent && light,
        [styles.small]: small,
        [styles.medium]: medium,
        [styles.large]: large,
        [styles.active]: active,
        [styles.scale]: scale,
        [styles.rotate]: rotate,
        [styles.danger]: danger,
        [styles.edit]: edit,
        [styles.view]: view,
        [styles.disabled]: disabled,

    });
    return ( 
        <Comp className={classes} {...props}>
            {iconLeft && <span className={clsx(styles.icon)}>{iconLeft}</span>}
            <span className={clsx(styles.title)}>{children}</span>
            {iconRight && <span className={clsx(styles.icon)}>{iconRight}</span>}
        </Comp> 
    );
}

export default Button;