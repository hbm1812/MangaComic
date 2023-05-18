import clsx from "clsx";
import styles from "./ItemSubComment.module.scss";
import Button from "../Button";
import { useState, Fragment, useContext } from "react";
import { LikeIcon, CmtDotsIcon, EllipsisVerticalIcon, EditPenSquareIcon, DeleteTrashIcon } from "../Icon";
import InputComment from "../InputComment";
import PropTypes from "prop-types";
import Modal from "../Modal";
import { useParams } from "react-router-dom";
import axios from "axios";
import GlobalContext from "../../Contexts/GlobalContext";
import Image from "../Image";

// ItemSubComment.propTypes = {
//     data: PropTypes.object.isRequired,
// }


function ItemSubComment({ data, currentUserId }) {
    const { fetchApiComment, setFetchApiComment, showInputClone, setShowInputClone, saveImageSubComment, setSaveImageSubComment } = useContext(GlobalContext);
    const [showInputComment, setShowInputComment] = useState(false);
    const [activeUser, setActiveUser] = useState(false);
    const param = useParams();

    // active user :v
    // handle data reply 
    const [dataReply, setDataReply] = useState({});
    // handle data edit 
    const [dataEdit, setDataEdit] = useState({});

    // handle data delete
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [dataDelete, setDataDelete] = useState({});

    // handle reply comment 
    const [checkTypeBtn, setCheckTypeBtn] = useState("");

    if (data) {
        let arrDateCreated = data.created_at.split(" ");
        let getTime = arrDateCreated[1].split(":");
        let getHour = getTime[0] + ":" + getTime[1];
        var getDate = getHour + " " + arrDateCreated[0].split("-").reverse().join("/");
    }

    if (currentUserId) {
        var canReply = Boolean(currentUserId);
        var canEdit = currentUserId === data.user_id;
        var canDelete = currentUserId === data.user_id;
    }
    // handle delete comment 
    const handleClickBtnDelete = (item) => {
        setShowModalDelete(true);
        setDataDelete(item);
    }

    const handleOnSubmitDelete = (e) => {
        e.preventDefault();
        const data = new FormData(e.target);

        data.append("id", dataDelete.id);

        axios({
            method: "POST",
            url: "http://localhost/manga-comic-be/api/comments/delete.php",
            data: data,
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then(() => {
                console.log("success");
                setFetchApiComment(!fetchApiComment);
                setShowModalDelete(false);
                setShowInputClone(false);
                setSaveImageSubComment("");
            })
            .catch(() => {
                console.log("error");
                setShowModalDelete(false);
            })
    }

    // handle reply
    const handleReplyComment = (text, parentId, e) => {
        // console.log("reply comment", text, parentId, e.target);
        const data = new FormData(e.target);

        // console.log("dataReply", dataReply);
        // console.log("data.parent_id", data.parent_id)

        data.append("user_id", currentUserId);
        { param.newsId && data.append("news_id", param.newsId) };
        { param.idManga && data.append("story_id", param.idManga) };
        data.append("parent_id", dataReply.parent_id);
        data.append("thumbnail", saveImageSubComment);
        data.append("content", `@${dataReply.name}` + " " + text)

        axios({
            method: "POST",
            url: "http://localhost/manga-comic-be/api/comments/create.php",
            data: data,
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then(() => {
                console.log("success");
                setFetchApiComment(!fetchApiComment);
                setShowInputClone(false);
                setSaveImageSubComment("");
            })
            .catch(() => {
                console.log("error");
            })
    }

    // handle update/edit
    const handleEditComment = (text, parentId, e, currentId) => {
        const data = new FormData(e.target);

        // console.log("data edit", dataEdit);
        // console.log("current id", currentId);
        // console.log("texxt", text);

        data.append("id", currentId)
        data.append("user_id", currentUserId);
        { param.newsId && data.append("news_id", param.newsId) };
        { param.idManga && data.append("story_id", param.idManga) };
        data.append("parent_id", dataEdit.parent_id);
        data.append("thumbnail", saveImageSubComment);
        data.append("content", text);

        axios({
            method: "POST",
            url: "http://localhost/manga-comic-be/api/comments/update.php",
            data: data,
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then(() => {
                console.log("success");
                setFetchApiComment(!fetchApiComment);
                setShowInputClone(false);
                setSaveImageSubComment("");
            })
            .catch(() => {
                console.log("error");
            })
    }

    return (
        <div className={clsx(styles.item)}
            onClick={() => {
                setShowInputComment(false);                
            }}
        >
            <header className={clsx(styles.itemHeader)}>
                <div className={clsx(styles.itemInfoUser)}>
                    <div className={clsx(styles.itemAvatar)}>
                        <Image src={data && data.user_avatar || ""} />
                        {/* <img src={data && data.user_avatar || ""} alt="" /> */}
                    </div>
                    <div className={clsx(styles.itemInfo)}>
                        <div className={clsx(styles.itemUsername)}>
                            {data && data.name}
                        </div>
                        <p className={clsx(styles.itemTimeUpdate)}>
                            {getDate}
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
                    {data && data.content}
                </div>
                <img className={clsx(styles.itemImgUpload)} src={data && data.thumbnail || ""} alt="" />
            </div>
            <div className={clsx(styles.itemFooter)}
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <Button transparent small light iconLeft={<LikeIcon />}>525</Button>
                {canReply &&
                    <Button transparent small light iconLeft={<CmtDotsIcon />}
                        onClick={() => {
                            setCheckTypeBtn("Reply");
                            setShowInputComment(!showInputComment);
                            setDataReply(data);
                            setShowInputClone(true);
                        }}
                    >Reply</Button>
                }
                {canEdit &&
                    <Button transparent small light iconLeft={<EditPenSquareIcon />}
                        onClick={() => {
                            setCheckTypeBtn("Edit");
                            setShowInputComment(!showInputComment);
                            setDataEdit(data);
                            setShowInputClone(true);
                            console.log("dataEdit", data);
                        }}
                    >Edit</Button>
                }

                {canDelete &&
                    <Button transparent small light iconLeft={<DeleteTrashIcon />}
                        onClick={() => handleClickBtnDelete(data)}
                    >Delete</Button>
                }
            </div>
            {
                showInputComment &&
                <div className={clsx(styles.inpComment)}
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                >
                    {checkTypeBtn === "Reply" ?
                        <InputComment
                            handleSubmit={handleReplyComment}
                            parentId={data.id}
                            close={() => {
                                setShowInputComment(false);
                                setShowInputClone(true);
                            }}
                        />
                        : checkTypeBtn === "Edit" ?
                            <InputComment
                                handleSubmit={handleEditComment}
                                // parentId={null}
                                currentId={data.id}
                                close={() => {
                                    setShowInputComment(false);
                                    setShowInputClone(true);

                                }}
                            />
                            : <Fragment />
                    }
                </div>
            }

            {/* modal */}
            {showModalDelete &&
                <Modal open={showModalDelete}
                    close={() => {
                        setShowModalDelete(false)
                    }}
                >
                    <form className={clsx(styles.modal)}
                        onSubmit={handleOnSubmitDelete}
                    >
                        <div className={clsx(styles.contentTop)}>
                            <div className={clsx(styles.heading)}>
                                Delete comments
                            </div>
                            <div className={clsx(styles.body)}>
                                Bạn có chắc muốn xóa comment này không?
                            </div>
                        </div>
                        <div className={clsx(styles.userActive)}>
                            <Button className={clsx(styles.test)} primary medium onClick={() => setShowModalDelete(false)}>exit</Button>
                            <Button primary medium>Delete</Button>
                        </div>
                    </form>
                </Modal>
            }
        </div>
    );
}

export default ItemSubComment;