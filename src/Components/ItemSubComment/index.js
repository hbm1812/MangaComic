import clsx from "clsx";
import styles from "./ItemSubComment.module.scss";
import Button from "../Button";
import { useState } from "react";
import { CommentLikeIcon, CommentCmtDotsIcon, CommentShareIcon, CommentAddImageIcon, CommentEmojiIcon, CommentArrowDownIcon, EllipsisVerticalIcon } from "../Icon";
import InputComment from "../InputComment";

function ItemSubComment() {
    const [showInputComment, setShowInputComment] = useState(false);
    const [activeUser, setActiveUser] = useState(false);
    return (
        <div className={clsx(styles.item)}>
            <header className={clsx(styles.itemHeader)}>
                <div className={clsx(styles.itemInfoUser)}>
                    <div className={clsx(styles.itemAvatar)}>
                        <img src="https://s199.imacdn.com/vg/2022/12/26/1728e590e5df27f8_2873d6919adda632_23998167204091333.jpg" alt="" />
                    </div>
                    <div className={clsx(styles.itemInfo)}>
                        <div className={clsx(styles.itemUsername)}>
                            Huy nguyễn
                        </div>
                        <p className={clsx(styles.itemTimeUpdate)}>
                            4 giờ trước
                        </p>
                    </div>
                </div>
                <div className={clsx(styles.itemActionUser)}>
                    <EllipsisVerticalIcon className={clsx(styles.itemIconMore)}
                        onClick={() => {
                            setActiveUser(!activeUser);
                        }}
                    />
                    {
                        activeUser &&
                        <ul className={clsx(styles.listActiveUser)}>
                            <li className={clsx(styles.itemActiveUser)}>
                                Ẩn bình luận
                            </li>
                            <li className={clsx(styles.itemActiveUser)}>
                                Chặn người dùng
                            </li>
                            <li className={clsx(styles.itemActiveUser)}>
                                Tố cáo
                            </li>
                        </ul>
                    }
                </div>
            </header>
            <div className={clsx(styles.itemBody)}>
                <div className={clsx(styles.itemContent)}>
                    Nahida siêu cấp pro vjp
                </div>
                <img className={clsx(styles.itemImgUpload)} src={"https://upload-os-bbs.hoyolab.com/upload/2022/10/28/40172375/e205cd258503b7a1527ab757afc0422c_3093601676826007971.png?x-oss-process=image/resize,s_500/quality,q_80/auto-orient,0/interlace,1/format,png" || ""} alt="" />
            </div>
            <div className={clsx(styles.itemFooter)}>
                <Button transparent small iconLeft={<CommentLikeIcon />}>525</Button>
                <Button transparent small iconLeft={<CommentCmtDotsIcon />}
                    onClick={() => {
                        setShowInputComment(!showInputComment);
                    }}
                >Comment</Button>
            </div>
            {
                showInputComment &&
                <div className={clsx(styles.inpComment)}>
                    <InputComment />
                </div>
            }
        </div>
    );
}

export default ItemSubComment;