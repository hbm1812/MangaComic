import clsx from "clsx";
import styles from "./Character.module.scss";
import { AngleLeftIcon, XmarkIcon, AngleRightIcon } from "../Icon";

function Character({ item = {}, onClick, showDetailChar = -1, toggleDetailChar = false}) {
    const props = {
        onClick,
    };
    
    const renderDetailChar = () => {
        if(item.id == (showDetailChar + 1)) {
            return (
                <div className={clsx(styles.overlay, {
                    [styles.show]: toggleDetailChar,
                })} onClick={(e) => {
                    e.stopPropagation();
                }}>
                    <div className={clsx(styles.userActive)}>
                        <AngleLeftIcon className={clsx(styles.icon)} />
                        <XmarkIcon className={clsx(styles.icon)} onClick={onClick}/>
                        <AngleRightIcon className={clsx(styles.icon)} />
                    </div>
                    <div className={clsx(styles.info)}>
                        <div className={clsx(styles.detail)}>
                            <div className={clsx(styles.nameWrap)}>
                                <h2 className={clsx(styles.name)}>
                                    {item.name}
                                </h2>
                            </div>
                            <h4 className={clsx(styles.role)}>
                                {item.role}
                            </h4>
                            <p className={clsx(styles.desc)}>
                                {item.desc}
                            </p>
                        </div>
                        <img src={item.charFull} alt="" />
                    </div>
                </div>
            )
        } else {
            return (
                <div className={clsx(styles.overlay, {
                    [styles.show]: false,
                })}>
                    <div className={clsx(styles.userActive)}>
                        <AngleLeftIcon className={clsx(styles.icon)} />
                        <XmarkIcon className={clsx(styles.icon)} onClick={() => {
                            
                        }}/>
                        <AngleRightIcon className={clsx(styles.icon)} />
                    </div>
                    <div className={clsx(styles.info)}>
                        <div className={clsx(styles.detail)}>
                            <div className={clsx(styles.nameWrap)}>
                                <h2 className={clsx(styles.name)}>
                                    {item.name}
                                </h2>
                            </div>
                            <h4 className={clsx(styles.role)}>
                                {item.role}
                            </h4>
                            <p className={clsx(styles.desc)}>
                                {item.desc}
                            </p>
                        </div>
                        <img src={item.charFull} alt="" />
                    </div>
                </div>
            )
        }
    }

    return (
        <div className={clsx(styles.wrapper)} {...props}>
            <div className={clsx(styles.avatar)}>
                <img src={item.avatar} alt="" />
                <p className={clsx(styles.name)}>{item.name}</p>
            </div>
            {renderDetailChar()}
            
            {/* <div className={clsx(styles.overlay, {
                [styles.show]: item.id = (showDetailChar + 1) ? true : false,
            })}>
                <div className={clsx(styles.userActive)}>
                    <AngleLeftIcon className={clsx(styles.icon)}/>
                    <XmarkIcon className={clsx(styles.icon)}/>
                    <AngleRightIcon className={clsx(styles.icon)}/>
                </div>
                <div className={clsx(styles.info)}>
                    <div className={clsx(styles.detail)}>
                        <div className={clsx(styles.nameWrap)}>
                            <h2 className={clsx(styles.name)}>
                                {item.name}
                            </h2>
                        </div>
                        <h4 className={clsx(styles.role)}>
                            {item.role}
                        </h4>
                        <p className={clsx(styles.desc)}>
                            {item.desc}
                        </p>
                    </div>
                    <img src={item.charFull} alt="" />
                </div>
            </div> */}
        </div>
    );
}

export default Character;