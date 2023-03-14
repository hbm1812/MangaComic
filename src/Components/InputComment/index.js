import clsx from "clsx";
import styles from "./InputComment.module.scss";
import { Fragment, useEffect, useState } from "react";
import Button from "../Button";
import { EmojiIcon, AddImageIcon, XmarkIcon, DeleteTrashIcon, EditPenSquareIcon } from "../Icon";
import Picker from "@emoji-mart/react";
import DataEmoji from "@emoji-mart/data";
import Heading from "../Heading";
import Modal from "../Modal";
import FormInput from "../FormInput";

function InputComment({ handleSubmit, parentId, close, currentId, clone, resetImage }) {
    // console.log("inp parrent id", parentId);

    const [text, setText] = useState("");
    const [showEmoji, setShowEmoji] = useState(false);
    // handle image
    const [image, setImage] = useState("");
    const [showModalImage, setShowModalImage] = useState(false);
    const [showFullScreen, setShowFullScreen] = useState(false);

    // if(resetImage) {
    //     setImage("");
    // }

    const onSubmit = (e) => {
        e.preventDefault();
        handleSubmit(text, parentId ?? null, e, currentId, image ?? null)
        // console.log("submit", text)
        setText("");
        setImage("");
        setShowEmoji(false);
        setShowModalImage(false);
        if (close) {
            close();
        }

        console.log("submit success");
    }

    // handle image
    const handlePreviewImage = (e) => {
        const file = e.target.files[0];
        file.preview = URL.createObjectURL(file);
        setImage(file);
        setShowModalImage(true);
        // console.log("select file", file);
        // console.log("showModalImage", showModalImage);
        // console.log("image", image);
    }

    useEffect(() => {

        // cleanup
        return () => {
            // xóa ảnh cũ
            image && URL.revokeObjectURL(image.preview)
        }
    }, [image]);

    useEffect(() => {
        return () => {
            setImage("");
            image && URL.revokeObjectURL(image.preview)
        }
    }, [resetImage]);

    // console.log("image", image)

    if (clone) {
        return (
            <form onSubmit={() => { }}>
                <textarea className={clsx(styles.inputWrap)}
                    value={text}
                    onChange={() => {}}
                    placeholder="Nhập bình luận của bạn"
                />                
                <div className={clsx(styles.yourAction)}>
                    <div className={clsx(styles.extend)}>
                        <EmojiIcon
                            className={clsx(styles.emojiIcon)}
                            onClick={() => {}}
                        />                        
                        <label style={{ display: "inline-block" }}>
                            <AddImageIcon
                                className={clsx(styles.imageIcon)}
                                onClick={() => {}}
                            />
                        </label>                        
                    </div>
                    <Button primary disabled>
                        Gửi
                    </Button>
                </div>
            </form>
        )
    }

    return (
        <form onSubmit={onSubmit}>
            <textarea className={clsx(styles.inputWrap)}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Nhập bình luận của bạn"
            />
            {showModalImage && image !== "" &&
                <div className={clsx(styles.imageContain)}>
                    <Heading small>Ảnh đã chọn</Heading>
                    <div className={clsx(styles.imagePreview)}>
                        <div className={clsx(styles.header)}>
                            <EditPenSquareIcon className={clsx(styles.icon)} onClick={() => {
                                setShowModalImage(!showModalImage)
                            }} />

                            <DeleteTrashIcon className={clsx(styles.icon)} onClick={() => {
                                setImage("");
                                setShowModalImage(false);
                            }} />
                        </div>
                        <img src={image.preview} alt=""
                            onClick={() => {
                                setShowFullScreen(true);
                            }}
                        />
                    </div>
                </div>
            }

            {showFullScreen && image !== "" &&
                <Modal open={true} custom close={() => setShowFullScreen(false)}>
                    <div className={clsx(styles.modal)}>
                        <img className={clsx(styles.imageFullScreen)} src={image.preview} alt="" />
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

            <div className={clsx(styles.yourAction)}>
                <div className={clsx(styles.extend)}>
                    <EmojiIcon
                        className={clsx(styles.emojiIcon)}
                        onClick={() => {
                            setShowEmoji(!showEmoji);
                        }}
                    />
                    {showEmoji &&
                        <div className={clsx(styles.modalEmoji)}>
                            <Picker
                                data={DataEmoji}
                                previewPosition="none"
                                className={clsx(styles.modalEmoji)}
                                onEmojiSelect={(e) => {
                                    // setCurrentEmoji(e.native);
                                    setText((prevInp => prevInp + e.native))
                                }}
                            />
                        </div>
                    }
                    <label style={{ display: "inline-block" }} htmlFor="inpImage">
                        <AddImageIcon
                            className={clsx(styles.imageIcon)}
                            onClick={() => {
                                setShowModalImage(true);
                            }}
                        />
                    </label>
                    <input type="file" name="myFile" id="inpImage" hidden
                        onChange={(e) => handlePreviewImage(e)}
                    />
                </div>
                <Button primary disabled={text.length === 0 && image === "" ? true : false}>
                    Gửi
                </Button>
            </div>
        </form>
    );
}

export default InputComment;