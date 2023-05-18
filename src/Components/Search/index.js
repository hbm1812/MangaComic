import clsx from "clsx";
import styles from "./Search.module.scss";
import React, { useContext, useState } from "react";
import { CaretDownIcon, CircleCheckIcon } from "../Icon";
import GlobalContext from "../../Contexts/GlobalContext";

function Search({ onClick, selected, children, data, type = "", ...props }) {
    const { setSaveNameStatus, setSaveCategory } = useContext(GlobalContext)
    // sources languages
    const [selectItem, setSelectItem] = useState("");
    const [toggle, setToggle] = useState(false);

    return (
        <div className={clsx(styles.top)}>
            {data && type === "status" &&
                <div className={clsx(styles.itemWrapper)}
                    onClick={() => {
                        setToggle(!toggle);
                    }}
                >
                    {/* <p>{type === "status" && selectItem === "" ? "Trạng thái" : selectItem}</p> */}
                    <p>{type === "status" && selectItem === "" ? "Trạng thái" : selectItem}</p>

                    <CaretDownIcon className={clsx(styles.icon)} />
                    {
                        toggle &&
                        <ul className={clsx(styles.menu)}>
                            {data.length !== 0 && data.map((item, index) => {
                                return (
                                    <li className={clsx(styles.item)} key={index}
                                        onClick={() => {
                                            setSelectItem(item.name);
                                            setSaveNameStatus(item.name);
                                        }}
                                    >
                                        {item.name}
                                        {selectItem === item.name && <CircleCheckIcon className={clsx(styles.iconSelect)} />}
                                    </li>
                                )
                            })}

                        </ul>
                    }
                </div>
            }

            {data && type === "category" &&
                <div className={clsx(styles.itemWrapper)}
                    onClick={() => {
                        setToggle(!toggle);
                    }}
                >
                    {/* <p>{type === "status" && selectItem === "" ? "Trạng thái" : selectItem}</p> */}
                    <p>{type === "category" && selectItem === "" ? "Thể loại" : selectItem}</p>

                    <CaretDownIcon className={clsx(styles.icon)} />
                    {
                        toggle &&
                        <ul className={clsx(styles.menu)}>
                            {data.length !== 0 && data.map((item, index) => {
                                return (
                                    <li className={clsx(styles.item)} key={index}
                                        onClick={() => {
                                            setSelectItem(item.name);
                                            setSaveCategory(item.name);
                                        }}
                                    >
                                        {item.name}
                                        {selectItem === item.name && <CircleCheckIcon className={clsx(styles.iconSelect)} />}
                                    </li>
                                )
                            })}

                        </ul>
                    }
                </div>
            }
        </div>
    );
}

export default Search;