import clsx from "clsx";
import { Fragment, useContext, useEffect, useState } from "react";
import styles from "./Comments.module.scss";
import { LikeIcon, CmtDotsIcon, EllipsisVerticalIcon, EditPenSquareIcon, DeleteTrashIcon, XmarkIcon, BanIcon } from "../Icon";
import Button from "../Button";
import ItemSubComment from "../ItemSubComment";
import InputComment from "../InputComment";
import axios from "axios";
import Image from "../Image"
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../Modal";
import GlobalContext from "../../Contexts/GlobalContext";

function Comments({ currentUserId }) {
    const navigate = useNavigate();
    const { fetchApiComment, setFetchApiComment, showInputClone, setShowInputClone } = useContext(GlobalContext);

    const [dataComments, setDataComments] = useState([]);
    console.log("dataComments", dataComments)
    // handle fullscreen image 
    const [showFullScreen, setShowFullScreen] = useState(false);
    const [dataImage, setDataImage] = useState({});
    // const [showInputClone, setShowInputClone] = useState(false);
    const [showModalIsSubComment, setShowModalIsSubComment] = useState(false);
    // custom
    const [showInputComment, setShowInputComment] = useState(false);
    const [inputRepId, setInputRepId] = useState(0);
    // active user :v
    const [activeUser, setActiveUser] = useState(false);

    // handle data delete
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [dataDelete, setDataDelete] = useState({});

    // handle reply comment 
    const [checkTypeBtn, setCheckTypeBtn] = useState("");

    // console.log("checkTypeBtn" , checkTypeBtn);
    console.log("currentUserId", currentUserId)

    const param = useParams();
    console.log("param", param)    

    useEffect(() => {
        let checkType = "";
        if (param.newsId) {
            checkType = `news_id=${param.newsId}`;
        } else if (param.idManga) {
            checkType = `story_id=${param.idManga}`;
        }
        console.log("checkType", checkType);

        axios.get(`http://localhost/manga-comic-be/api/comments/show.php?${checkType}`)
            .then((res) => {
                console.log("data", res.data);
                setDataComments(res.data);
                // if(res.data.length <= 0) {
                //     console.log("not found :v");
                //     navigate("/notfound");
                // }
            })

            .catch(() => {
                console.log("error");
            })
    }, [fetchApiComment])

    // get replies 
    const getReplies = (commentId) => {
        return (
            dataComments
                .filter(item => item.parent_id === commentId)
                .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
        );
    }

    // add comment 
    const addComment = (text, parentId, e, currentId, image) => {
        // console.log("addComment", text, parentId)
        // console.log(e.target);
        const data = new FormData(e.target);

        console.log("image add cmt", image);
        data.append("user_id", currentUserId);
        { param.newsId && data.append("news_id", param.newsId) };
        { param.idManga && data.append("story_id", param.idManga) };
        if (!(parentId === null)) {
            data.append("parent_id", parentId);
        }
        data.append("thumbnail", image);
        data.append("content", text)

        axios({
            method: "POST",
            url: "http://localhost/manga-comic-be/api/comments/create.php",
            data: data,
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then(() => {
                console.log("success");
                setFetchApiComment(!fetchApiComment);
            })
            .catch(() => {
                console.log("error");
            })


        console.log(data);
        console.log(Object.fromEntries(data.entries()))
    }

    // handle delete comment 
    const handleClickBtnDelete = (item) => {
        setShowModalDelete(true);
        // console.log("item delete", item);
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
                setShowInputComment(false);
                setShowModalIsSubComment(false);
                setCheckTypeBtn("");
                setShowInputClone(false);
                setShowModalDelete(false);
                setFetchApiComment(!fetchApiComment);
            })
            .catch(() => {
                console.log("error");
                setShowModalDelete(false);
            })

        console.log(data);
        console.log(Object.fromEntries(data.entries()))
    }

    // handle reply
    const handleReplyComment = (text, parentId, e, currentId, image) => {
        // console.log("reply comment", text, parentId, e.target);
        const data = new FormData(e.target);
        console.log("image reply", image);
        console.log("parent id", parentId);

        data.append("user_id", currentUserId);
        { param.newsId && data.append("news_id", param.newsId) };
        { param.idManga && data.append("story_id", param.idManga) };
        if (!(parentId === null)) {
            // console.log("add parent id", parentId);
            data.append("parent_id", parentId);
        }
        data.append("thumbnail", image ?? "");
        data.append("content", text ?? "")

        axios({
            method: "POST",
            url: "http://localhost/manga-comic-be/api/comments/create.php",
            data: data,
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then(() => {
                console.log("success");
                setShowInputComment(false);
                setShowModalIsSubComment(false);
                setCheckTypeBtn("");
                setShowInputClone(false);

                setFetchApiComment(!fetchApiComment);
            })
            .catch(() => {
                console.log("error");
            })

        console.log(data);
        console.log(Object.fromEntries(data.entries()))
    }

    // handle update/edit
    const handleEditComment = (text, parentId, e, currentId, image) => {
        const data = new FormData(e.target);
        // console.log("currentId", currentId);
        // console.log("parentId", parentId);
        console.log("image edit", image)
        data.append("id", currentId)
        data.append("user_id", currentUserId);
        { param.newsId && data.append("news_id", param.newsId) };
        { param.idManga && data.append("story_id", param.idManga) };
        if (!(parentId === null)) {
            // console.log("add parent id", parentId);
            data.append("parent_id", parentId);
        }
        data.append("thumbnail", image);
        data.append("content", text)

        axios({
            method: "POST",
            url: "http://localhost/manga-comic-be/api/comments/update.php",
            data: data,
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then(() => {
                console.log("success");
                setShowInputComment(false);
                setShowModalIsSubComment(false);
                setCheckTypeBtn("");
                setShowInputClone(false);
                setFetchApiComment(!fetchApiComment);
            })
            .catch(() => {
                console.log("error");
            })

        console.log(data);
        console.log(Object.fromEntries(data.entries()))
    }

    // handle image fullscreen
    const handleDataImage = (data) => {
        // console.log("image data", data);
        setDataImage(data);
    }

    return (
        <div className={clsx(styles.wrapper)}
            onClick={() => {
                if (checkTypeBtn !== "") {
                    setShowModalIsSubComment(true);
                }
            }}
        >
            {!showInputClone ?
                <InputComment handleSubmit={addComment} resetImage={showModalIsSubComment} />
                :
                <InputComment clone />
            }

            {dataComments.map((item, index) => {
                const newArrReplies = getReplies(item.id);
                // console.log("item", item);
                // console.log("newArrReplies", newArrReplies);   
                let arrDateCreated = item.created_at.split(" ");
                let getTime = arrDateCreated[1].split(":");
                let getHour = getTime[0] + ":" + getTime[1];
                let getDate = getHour + " " + arrDateCreated[0].split("-").reverse().join("/");

                // xử lý login rep, edit update comment 
                const canReply = Boolean(currentUserId);
                const canEdit = currentUserId === item.user_id;
                const canDelete = currentUserId === item.user_id;

                // click btn rep edit delete

                if (item.parent_id === null) {
                    return (
                        <div className={clsx(styles.item)} key={index}
                            onClick={() => {
                                console.log("item", item)
                                // setShowInputComment(false);
                            }}
                        >
                            <header className={clsx(styles.itemHeader)}>
                                <div className={clsx(styles.itemInfoUser)}>
                                    <div className={clsx(styles.itemAvatar)}>
                                        <Image src={item.user_avatar || ""} />
                                    </div>
                                    <div className={clsx(styles.itemInfo)}>
                                        <div className={clsx(styles.itemUsername)}>
                                            {item.name}
                                        </div>
                                        <p className={clsx(styles.itemTimeUpdate)}>
                                            {/* {item.created_at} */}
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

                            {/* content comment */}
                            <div className={clsx(styles.itemBody)}>
                                <div className={clsx(styles.itemContent)}>
                                    {item.content}
                                </div>
                                <img className={clsx(styles.itemImgUpload)} src={item.thumbnail || ""} alt=""
                                    onClick={() => {
                                        setShowFullScreen(true);
                                        handleDataImage(item);
                                        console.log("fullscreen");
                                    }}
                                />
                                {/* <img className={clsx(styles.itemImgUpload)} src={"https://w0.peakpx.com/wallpaper/688/409/HD-wallpaper-anime-girl-skirt-smiling-short-hair-cute-anime.jpg"} alt="" /> */}
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
                                            setShowInputComment(true);
                                            setInputRepId(item.id);
                                            setShowInputClone(true);
                                            console.log("item parent id", item)

                                        }}
                                    >Reply</Button>
                                }
                                {canEdit &&
                                    <Button transparent small light iconLeft={<EditPenSquareIcon />}
                                        onClick={() => {
                                            setCheckTypeBtn("Edit");
                                            setShowInputComment(true);
                                            setInputRepId(item.id);
                                            setShowInputClone(true);
                                            console.log("btn edit item", item)
                                        }}
                                    >Edit</Button>
                                }

                                {canDelete &&
                                    <Button transparent small light iconLeft={<DeleteTrashIcon />}
                                        onClick={() => handleClickBtnDelete(item)}
                                    >Delete</Button>
                                }

                                {showInputComment && inputRepId === item.id &&
                                    <Button transparent small light iconLeft={<BanIcon />}
                                        onClick={() => {
                                            setShowInputComment(false);
                                        }}
                                    >Cancle</Button>
                                }
                            </div>
                            {
                                showInputComment && inputRepId === item.id &&
                                <div className={clsx(styles.inpComment)}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                    }}
                                >
                                    {checkTypeBtn === "Reply" ?
                                        <InputComment
                                            handleSubmit={handleReplyComment}
                                            parentId={item.id}
                                            close={() => {
                                                // setShowInputComment(false);
                                            }}
                                        />
                                        : checkTypeBtn === "Edit" ?
                                            <InputComment
                                                handleSubmit={handleEditComment}
                                                // parentId={null}
                                                currentId={item.id}
                                                close={() => {
                                                    // setShowInputComment(false);
                                                }}
                                            />
                                            : <Fragment />
                                    }
                                </div>
                            }
                            <div className={clsx(styles.subItem)}>
                                {newArrReplies.length > 0 && newArrReplies.map((subItem, subIndex) => {
                                    // console.log("subitem", subItem);                                    
                                    return (
                                        <ItemSubComment key={subIndex} data={subItem} currentUserId={currentUserId} />
                                    )
                                })}
                            </div>
                        </div>
                    )
                }

            })}


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

            {/* modal fullscreen */}
            {showFullScreen &&
                <Modal open={true} custom close={() => setShowFullScreen(false)}>
                    <div className={clsx(styles.modalFullScreen)}>
                        <img className={clsx(styles.imageFullScreen)} src={dataImage.thumbnail} alt="" />
                        {/* "https://wallpapersmug.com/download/1024x768/2d07b6/cute-anime-girl-cake.jpg" ?? "https://w0.peakpx.com/wallpaper/688/409/HD-wallpaper-anime-girl-skirt-smiling-short-hair-cute-anime.jpg" */}
                        {/* <img className={clsx(styles.imageFullScreen)} src={"https://i.pinimg.com/originals/45/87/0c/45870c609864fdded4b8869276f57314.jpg"} alt="" /> */}
                        {/* <img className={clsx(styles.imageFullScreen)} src={"https://w0.peakpx.com/wallpaper/688/409/HD-wallpaper-anime-girl-skirt-smiling-short-hair-cute-anime.jpg"} alt="" /> */}

                        {/* btn close */}
                        <div className={clsx(styles.header)}>
                            <XmarkIcon className={clsx(styles.btnClose)}
                                onClick={() => {
                                    setShowFullScreen(false);
                                }}
                            />
                        </div>
                    </div>
                </Modal>
            }

            {/* modal check isEdit, isReply */}
            {showModalIsSubComment && checkTypeBtn !== "" &&
                <Modal open={showModalIsSubComment}
                    close={() => {
                        // setShowModalDelete(false)
                    }}
                >
                    <form className={clsx(styles.modal)}
                        onSubmit={(e) => {
                            e.preventDefault();
                            setShowInputComment(false);
                            setShowModalIsSubComment(false);
                            setCheckTypeBtn("");
                            setShowInputClone(false);
                        }}
                    >
                        <div className={clsx(styles.contentTop)}>
                            <div className={clsx(styles.heading)}>
                                {checkTypeBtn === "Reply" ? "You are replying" : checkTypeBtn === "Edit" ? "You are editing" : ""}
                            </div>
                            <div className={clsx(styles.body)}>
                                Bạn có chắc muốn hủy comment này không?
                            </div>
                        </div>
                        <div className={clsx(styles.userActive)}>
                            <Button className={clsx(styles.test)} primary medium onClick={() => setShowModalIsSubComment(false)}>exit</Button>
                            <Button primary medium>Delete</Button>
                        </div>
                    </form>
                </Modal>
            }

        </div>
    );
}

export default Comments;