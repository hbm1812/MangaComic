import clsx from "clsx";
import styles from "./Menu.module.scss";
import { Link } from "react-router-dom";
import { CaretDownIcon } from "../Icon";
import PropTypes from "prop-types";

MenuItem.propTypes = {
    data: PropTypes.object.isRequired,
    onClick: PropTypes.func,
}

function MenuItem({ data, onClick }) {
    let Comp = "div";
    const props = {
        onClick,
    }

    if (data.to) {
        Comp = Link;
        props.to = data.to;
    }

    if (data.href) {
        Comp = "a";
        props.href = data.href;
    }


    const renderSubnav = () => {
        let items = data.subNav;
        return items.map((item, index) => (
            <li className={clsx(styles.navbarSubMenuItem)} key={index}>
                {item.href &&
                    <a href={item.href}>
                        {item.title}
                    </a>
                }

                {item.to &&
                    <Link to={item.to}>
                        {item.title}
                    </Link>
                }

                {!item.href && !item.to &&
                    <div href={item.href}>
                        {item.title}
                    </div>
                }
            </li>
        ))
    }

    return (
        <div className={clsx(styles.navbarMenuItem)}>
            <Comp {...props}>
                {data.title}
                {data.icon &&
                    <span className={clsx(styles.icon)}>
                        {data.icon}
                    </span>
                }

            </Comp>
            {data.subNav &&
                <ul className={clsx(styles.navbarSubMenu)}>
                    {renderSubnav()}
                </ul>
            }
        </div>

    );
}

export default MenuItem;