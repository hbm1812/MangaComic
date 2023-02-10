import clsx from "clsx";
import styles from "./Menu.module.scss";
import MenuItem from "./MenuItem";

function Menu({ children, items=[] }) {

    const renderItem = () => {
        return items.map((item, index) => (
            <MenuItem key={index} data = {item} />
        ));
    }

    return (
        <div className={clsx(styles.navbarMenu)}>            
            {renderItem()}
        </div>
    );
}

export default Menu;