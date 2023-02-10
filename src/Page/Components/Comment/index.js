import clsx from "clsx";
import styles from "./Comment.module.scss";
import Button from "../../../Components/Button";
import { useState } from "react";
import { CommentLikeIcon, CommentCmtDotsIcon, CommentShareIcon, CommentAddImageIcon, CommentEmojiIcon, CommentArrowDownIcon, EllipsisVerticalIcon } from "../../../Components/Icon";
import ItemComment from "../../../Components/ItemComment";
import InputComment from "../../../Components/InputComment";

function Comment({ totalLike = false, totalComment = false, totalShare = false }) {
    const [inpComment, setInpComment] = useState("");
    // show comment mode
    const [showCommentMode, setShowCommentMode] = useState(false);
    const [textCommentMode, setTextCommentMode] = useState("Tất cả bình luận");
    // comment mode
    const [allCommentActive, setAllCommentActive] = useState(true);
    const [newCommentActive, setNewCommentActive] = useState(false);
    const [suitableCommentActive, setSuitableCommentActive] = useState(false);

    const props = {
        
    }

    let classesCommentMode = clsx(styles.commentModeItem, {
        [styles.active]: true,
    })

    return (
        <div className={clsx(styles.yourComment)} {...props}>
            <div className={clsx(styles.listAction)}>
                {totalLike && <Button outline iconLeft={<CommentLikeIcon />}>525</Button>}
                {totalComment && <Button outline iconLeft={<CommentCmtDotsIcon />}>233</Button>}
                {totalShare && <Button outline iconLeft={<CommentShareIcon />}>2</Button>}
            </div>
            <InputComment/>            
            <div className={clsx(styles.tabList)}>
                <div className={clsx(styles.commentMode)}>
                    <div className={clsx(styles.commentModeName)}
                        onClick = {() => {
                            setShowCommentMode(!showCommentMode);
                        }}
                    >
                        {textCommentMode}
                        <CommentArrowDownIcon
                            className={clsx(styles.commentModeIcon)}
                        />
                    </div>
                    {
                        showCommentMode &&
                        <ul className={clsx(styles.listCommentMode)}>
                            <li className={allCommentActive ? classesCommentMode : clsx(styles.commentModeItem)}
                                onClick={() => {
                                    setAllCommentActive(true);
                                    setNewCommentActive(false);
                                    setSuitableCommentActive(false);

                                    // close comment mode and change text
                                    setShowCommentMode(!showCommentMode);
                                    setTextCommentMode("Tất cả bình luận");
                                }}
                            >Tất cả bình luận</li>
                            <li className={newCommentActive ? classesCommentMode : clsx(styles.commentModeItem)}
                                onClick={() => {
                                    setAllCommentActive(false);
                                    setNewCommentActive(true);
                                    setSuitableCommentActive(false);

                                    // close comment mode and change text
                                    setShowCommentMode(!showCommentMode);
                                    setTextCommentMode("Mới nhất");
                                }}
                            >Mới nhất</li>
                            <li className={suitableCommentActive ? classesCommentMode : clsx(styles.commentModeItem)}
                                onClick={() => {
                                    setAllCommentActive(false);
                                    setNewCommentActive(false);
                                    setSuitableCommentActive(true);

                                    // close comment mode and change text
                                    setShowCommentMode(!showCommentMode);
                                    setTextCommentMode("Phù hợp nhất");
                                }}
                            >Phù hợp nhất</li>
                        </ul>
                    }

                </div>
                <div className={clsx(styles.listComment)}>
                    <ItemComment/>
                    <ItemComment/>                    
                </div>
            </div>
        </div>
    );
}

export default Comment;