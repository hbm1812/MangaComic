import styles from './Button.module.scss';
import clsx from 'clsx';
// link trong react route dom là link nội bộ trong web
import { Link } from 'react-router-dom';

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
        scale,
        rotate, 
    }) {
    let Comp = 'button';
    const props = {
        onClick,        
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
        [styles.small]: small,
        [styles.medium]: medium,
        [styles.large]: large,
        [styles.active]: active,
        [styles.scale]: scale,
        [styles.rotate]: rotate,
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