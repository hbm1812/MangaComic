import clsx from "clsx";
import styles from "./InputComment.module.scss";
import { Fragment, useState } from "react";
import Button from "../Button";
import { CommentEmojiIcon, CommentAddImageIcon } from "../Icon";

function InputComment() {
    return (  
        <Fragment>
            <div className={clsx(styles.inputWrap)}
                placeholder="Nhập bình luận của bạn"
                contentEditable
            >                                
            </div>
            <div className={clsx(styles.yourAction)}>
                <div className={clsx(styles.extend)}>
                    <CommentEmojiIcon
                        className={clsx(styles.emojiIcon)}
                        onClick={() => {
                            console.log("hello");
                        }}
                    />
                    <CommentAddImageIcon
                        className={clsx(styles.imageIcon)}
                        onClick={() => {
                            console.log("hello");
                        }}
                    />
                </div>
                <Button primary>
                    Gửi
                </Button>
            </div>
        </Fragment>
    );
}

export default InputComment;