import clsx from "clsx";
import { Fragment, useContext, useEffect, useState } from "react";
import GlobalContext from "../../Contexts/GlobalContext";
import { CaretDownIcon } from "../Icon";
import Image from "../Image";
import styles from "./FormInput.module.scss";

function FormInput({ ...props }) {
    const {nameCombobox, setNameCombobox} = useContext(GlobalContext)
    const { label, onChange, id, errorMessage, imagePreview, onlyRead, dataCombobox, ...inputProps } = props;
    const [focus, setFocus] = useState(false);

    //combobox 
    const [showDataComboBox, setShowDataCombobox] = useState(false);

    const onHandleFocus = (e) => {
        setFocus(true);
    }

    return (
        <div className={clsx(styles.wrapper, {
            [styles.onlyRead]: onlyRead
        })}>
            <label htmlFor={id}>{label}</label>
            {props.type !== "file" && !(props.combobox) &&
                <Fragment>
                    <input id={id} placeholder={props.placeholder} {...inputProps}
                        onChange={onChange}
                        onBlur={onHandleFocus}
                        focused={focus.toString()}
                        disable={onlyRead}
                    />
                    <span>{errorMessage}</span>
                </Fragment>
            }
            {props.type === "file" &&
                <Fragment>
                    <label htmlFor={id} className={clsx(styles.labelFile, {
                        [styles.hidden]: onlyRead,
                    })}>
                        {label}
                    </label>

                    {!onlyRead ?
                        <Fragment>
                            <input id={id} placeholder={props.placeholder}
                                {...inputProps}
                                onChange={onChange}
                                onBlur={onHandleFocus}
                                focused={focus.toString()}
                                hidden
                            />
                            <div className={clsx(styles.imagePreview)}>
                                {/* {imagePreview &&
                                } */}
                                <Image
                                    alt={"hello"}
                                    // src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeiDrB2s3_CnalkKnSpmf14nSXSJeQxYUhxQ&usqp=CAU"
                                    // src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRg4ktM8KVJlJT5FtqVk4cPTZjfxzH9_aaLvg&usqp=CAU"
                                    // src="https://i0.wp.com/www.alittlebithuman.com/wp-content/uploads/2022/04/maxresdefault-1.jpg?fit=1280%2C720&ssl=1"
                                    // src="https://www.stylevore.com/wp-content/uploads/2020/01/0aecae65e9c73f438c2c77120067ce29.jpg"
                                    src={imagePreview ?? "https://us.123rf.com/450wm/urfandadashov/urfandadashov1809/urfandadashov180901275/109135379-photo-not-available-vector-icon-isolated-on-transparent-background-photo-not-available-logo-concept.jpg?ver=6"}
                                />
                            </div>
                        </Fragment>
                        :
                        <Fragment>
                            <div className={clsx(styles.imagePreview)}>
                                {/* {imagePreview &&
                                    
                                } */}
                                <Image
                                    alt={"hello"}
                                    src={imagePreview ?? "https://us.123rf.com/450wm/urfandadashov/urfandadashov1809/urfandadashov180901275/109135379-photo-not-available-vector-icon-isolated-on-transparent-background-photo-not-available-logo-concept.jpg?ver=6"}
                                />
                            </div>
                        </Fragment>
                    }
                </Fragment>
            }

            {props.combobox &&
                // <select className={clsx(styles.combobox)} id={id}>
                //     <option className={clsx(styles.item)}>Hello</option>
                //     <option className={clsx(styles.item)}>Hi</option>
                // </select>

                <div className={clsx(styles.combobox)}
                    onClick={() => { }}
                >
                    <p className={clsx(styles.name)}>{nameCombobox}</p>
                    <CaretDownIcon className={clsx(styles.icon)}
                        onClick={() => setShowDataCombobox(!showDataComboBox)}
                    />
                    {dataCombobox && showDataComboBox &&
                        <ul className={clsx(styles.listData)}>
                            {dataCombobox.map((item, index) => {
                                return (
                                    <li className={clsx(styles.item)} key={index}
                                        onClick={() => {
                                            setNameCombobox(item.name)
                                            setShowDataCombobox(false)
                                        }}
                                    >{item.name}</li>
                                )
                            })}
                        </ul>
                    }
                </div>
            }
        </div >
    );
}

export default FormInput;