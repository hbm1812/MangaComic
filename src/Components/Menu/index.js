import clsx from "clsx";
import styles from "./Menu.module.scss";
import MenuItem from "./MenuItem";
import PropTypes from "prop-types";
import { WindowScrollTop } from "../../util";

Menu.propTypes = {
    children: PropTypes.node,
    items: PropTypes.array,
}

function Menu({ children, items=[] }) {

    const renderItem = () => {
        return items.map((item, index) => (
            <MenuItem key={index} data = {item} onClick={() => {
                WindowScrollTop();
            }}/>
        ));
    }

    return (
        <div className={clsx(styles.navbarMenu)}>            
            {renderItem()}
        </div>
    );
}

export default Menu;