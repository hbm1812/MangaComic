import clsx from "clsx";
import styles from "./Search.module.scss";
import React, { useState } from "react";
import { CaretDownIcon, CircleCheckIcon } from "../Icon";

function Search({ onClick, selected, children, data, type = "", ...props }) {
    // sources languages
    const [selectItem, setSelectItem] = useState("");
    const [toggle, setToggle] = useState(false);

    // const sendData = () => {
    //     props.parentCallback("Message from Child");
    // };

    // if (props.parentCallback) {
    //     sendData();
    // }
    if (data && type === "status") {
        // setSelectItem("Trạng thái");
    }
    // console.log("data,", data);
    // console.log("type,", type);


    return (
        <div className={clsx(styles.top)}>
            {data && type !== "" &&
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