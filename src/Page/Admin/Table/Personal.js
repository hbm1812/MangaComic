import clsx from "clsx";
import { Fragment, useContext, useEffect, useRef, useState } from "react";
import Button from "../../../Components/Button";
import Modal from "../../../Components/Modal";
import styles from "./Table.module.scss";
import FormInput from "../../../Components/FormInput";
import Heading from "../../../Components/Heading";
import { CircleCheckIcon, DangerIcon, PlusIcon, WarningIcon } from "../../../Components/Icon";
import axios from "axios";

import Toastify from "../../../Components/Toastify";
import GlobalContext from "../../../Contexts/GlobalContext";
import Image from "../../../Components/Image";
import ItemManga from "../../../Components/ItemManga";

function Personal() {
    const { nameCombobox, setNameCombobox } = useContext(GlobalContext)
    const [openModalUpdateUser, setOpenModalUpdateUser] = useState(false);
    const [openModalChangePassword, setOpenModalChangePassword] = useState(false);
    const [dataUpdate, setDataUpdate] = useState({});
    // data manga
    const [dataManga, setDataManga] = useState([]);
    // local item login
    var LocalUserLogin = JSON.parse(localStorage.getItem("DataUser")) ?? null;

    useEffect(() => {
        LocalUserLogin = JSON.parse(localStorage.getItem("DataUser")) ?? null;
        // console.log("LocalUserLogin", LocalUserLogin)
    }, [openModalUpdateUser])

    const [dataUser, setDataUser] = useState([]);
    // console.log("dataUser", dataUser)    


    useEffect(() => {
        if (dataUser.length > 0) {
            const jsonUser = JSON.stringify(dataUser[0]);
            localStorage.setItem("DataUser", jsonUser);
        }
    }, [LocalUserLogin])

    // handle image 
    const [image, setImage] = useState("");

    // render table
    const [listUsers, setListUsers] = useState([]);
    const [listRoles, setListRoles] = useState([]);

    // values inputs
    const [values, setValues] = useState({
        // oldPassword: "",
        password: "",
        confirmPassword: "",
    });

    const inputs = [
        // {
        //     id: 1,
        //     name: "username",
        //     type: "text",
        //     placeholder: "Username",
        //     label: "Username",
        //     errorMessage: "Vui lòng nhập tên đăng nhập 3-20 ký tự",
        //     pattern: "[A-Za-z0-9_]{3,20}",
        //     required: true
        // },
        {
            id: 2,
            name: "email",
            type: "email",
            placeholder: "Email",
            label: "Email",
            errorMessage: "Vui lòng điền email chính xác",
            pattern: "[A-Za-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$",
            required: true
        },
        {
            id: 3,
            name: "name",
            type: "text",
            placeholder: "Name",
            label: "Name",
            errorMessage: "Tên không được để trống",
            pattern: "[A-Za-z0-9_]{3,20}",
            required: true
        },
        {
            id: 4,
            name: "password",
            type: "password",
            placeholder: "Password",
            label: "Password",
            errorMessage: "Vui lòng nhập mật khẩu 3-20 ký tự",
            pattern: "[A-Za-z0-9_]{3,20}",
            required: true
        },        
        {
            id: 6,
            name: "phone",
            type: "text",
            placeholder: "Phone",
            label: "Phone",
            errorMessage: "Vui lòng nhập đúng số điện thoại",
            pattern: "[0-9_]{9,11}",
            required: true
        },
        {
            id: 7,
            name: "created_at",
            type: "text",
            placeholder: "Created At",
            label: "Created At",
            disable: true.toString(),
            typetime: true.toString(),
        },
        {
            id: 8,
            name: "avatar",
            type: "file",
            placeholder: "Choose a image",
            label: "Choose a image",
            accept: "image/png, image/jpeg, image/gif, image/jpg",
        },
    ];

    const inputsChangePassword = [
        // {
        //     id: 1,
        //     name: "username",
        //     type: "text",
        //     placeholder: "Username",
        //     label: "Username",
        //     errorMessage: "Vui lòng nhập tên đăng nhập 3-20 ký tự",
        //     pattern: "[A-Za-z0-9_]{3,20}",
        //     required: true
        // },
        // {
        //     id: 2,
        //     name: "oldPassword",
        //     type: "password",
        //     placeholder: "Input your Old Password",
        //     label: "Old Password",
        //     // errorMessage: "Vui lòng nhập đúng mật khẩu",
        //     // pattern: values.oldPassword,
        //     // required: true
        // },        
        {
            id: 4,
            name: "password",
            type: "password",
            placeholder: "Password",
            label: "Password",
            errorMessage: "Vui lòng nhập mật khẩu 3-16 ký tự",
            pattern: "[A-Za-z0-9_]{3,20}",
            required: true
        },
        {
            id: 5,
            name: "confirmPassword",
            type: "password",
            placeholder: "Confirm Password",
            label: "Confirm Password",
            errorMessage: "Mật khẩu không trùng khớp vui lòng kiểm tra lại",
            pattern: values.password,
            required: true
        }
    ];

    // Toastify
    const [typeNotify, setTypeNotify] = useState("");

    const toastRef = useRef();

    const handleToastNotify = () => {
        toastRef.current.showToast();
    }

    // console.log("LocalUserLogin update", LocalUserLogin)

    // fetch api manga 
    useEffect(() => {
        axios.get("http://localhost/manga-comic-be/api/stories/read.php")
            .then((res) => {
                // console.log("data manga", res.data);
                setDataManga(res.data)
            })

            .catch(() => {
                console.log("error")
            })
    }, []);

    // handle image 
    const handlePreviewImage = (e) => {
        const file = e.target.files[0];
        // console.log(URL.createObjectURL(file))

        // tự thêm attribute
        file.preview = URL.createObjectURL(file);
        setImage(file);
    }

    useEffect(() => {

        // cleanup
        return () => {
            // xóa ảnh cũ
            image && URL.revokeObjectURL(image.preview)
        }
    }, [image]);

    // fetch api
    // users
    useEffect(() => {
        axios.get("http://localhost/manga-comic-be/api/users/read.php")
            .then((res) => {
                // console.log("data", res.data)
                setListUsers(res.data);
                setDataUser(res.data.filter(item => item.id === LocalUserLogin.id))
                // const filterUser = listUsers.filter((item) => item.id === LocalUserLogin.id)
                // console.log("filterUser", filterUser)
            })

            .catch(() => {
                console.log("error")

            })
    }, [openModalUpdateUser]);

    useEffect(() => {
        axios.get("http://localhost/manga-comic-be/api/roles/read.php")
            .then((res) => {
                // console.log("data roles", res.data)
                setListRoles(res.data);
                // setListUsers(res.data);
            })

            .catch(() => {
                console.log("error")
            })
    }, [])



    // update
    const handleClickBtnUpdate = (user, e) => {
        setOpenModalUpdateUser(true);
        setDataUpdate(user);

        // loadcombobox
        setNameCombobox(user.role_name);
        console.log("role name:", user.role_name)
        if (user.avatar) {
            setImage(user.avatar)
        }
        // setValues(user);        
        // console.log(user)
        // let newObj = {};
        // for (let key in user) {
        //     newObj[key.toString()] = user[key];
        //     // console.log("obj in loop:", newObj)
        // }

        // console.log("new obj:", newObj);
    }

    const handleClickBtnChangePassword = (user, e) => {
        setOpenModalChangePassword(true);
        setDataUpdate(user);

        if (user.avatar) {
            setImage(user.avatar)
        }
    }

    const handleCloseModalUpdateUser = () => {
        setOpenModalUpdateUser(false)
    }

    const handleCloseModalChangePassword = () => {
        setOpenModalChangePassword(false)
    }

    const onChangeInput = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const onChangeInputUpdate = (e) => {
        setDataUpdate({ ...dataUpdate, [e.target.name]: e.target.value })
    }

    const onHandleSubmitUpdate = (e) => {
        e.preventDefault();
        const data = new FormData(e.target);

        if (dataUpdate && dataUpdate !== {}) {
            console.log("dataupdate", dataUpdate);
            for (let key in dataUpdate) {
                console.log("key", key);

                if (key.toString() === "avatar") {
                    data.append(key.toString(), image)
                } else if (key.toString() === "role_name") {
                    listRoles.find((item) => {
                        if (item.name === nameCombobox) {
                            data.append("role_id", item.id);
                        }
                    })
                } else if (key.toString() === "role_id") {

                } else {
                    data.append(key.toString(), dataUpdate[key])
                }
            }
            // console.log("data:", data);
            // console.log("data entry:", Object.fromEntries(data.entries()))            
        }


        let checkBool = true;
        // listUsers.find((item) => {
        //     if (item.username === dataUpdate.username) {
        //         console.log("tài khoản đã tồn tại");
        //         checkBool = false;
        //         handleCloseModalUpdateUser();
        //         handleToastNotify();
        //         setTypeNotify("error");
        //     }
        // })

        if (checkBool) {
            axios({
                method: "POST",
                url: "http://localhost/manga-comic-be/api/users/update.php",
                data: data,
                headers: { "Content-Type": "multipart/form-data" },
            })
                .then(() => {
                    console.log("success");
                    checkBool = false;
                    handleCloseModalChangePassword(false)
                    handleCloseModalUpdateUser();
                    handleToastNotify();
                    setTypeNotify("update");
                })
                .catch(() => {
                    console.log("error");
                })
        }
    }


    // console.log("image.preview", image.preview)
    return (
        <Fragment>
            <div className={clsx(styles.wrapper)}>
                {/* Table */}
                <div className={clsx(styles.heading)}>
                    Hồ sơ cá nhân
                </div>
                {/* show detail info :v */}
                {dataUser.length > 0 &&
                    <div className={clsx(styles.personalWrapper)}>
                        <div className={clsx(styles.infoOutStanding)}>
                            <Image
                                className={clsx(styles.infoAvatar)}
                                src={dataUser[0].avatar ?? "https://us.123rf.com/450wm/urfandadashov/urfandadashov1809/urfandadashov180901275/109135379-photo-not-available-vector-icon-isolated-on-transparent-background-photo-not-available-logo-concept.jpg?ver=6"}
                            />
                            <div className={clsx(styles.infoDetail)}>
                                <h1>{dataUser[0].username}</h1>
                                <h2>{dataUser[0].name ?? ""}</h2>
                                <Button primary medium
                                    onClick={() => {
                                        handleClickBtnUpdate(dataUser[0])
                                    }}
                                >Chỉnh sửa trang cá nhân</Button>
                                <Button primary medium
                                    onClick={() => {
                                        handleClickBtnChangePassword(dataUser[0])
                                    }}
                                >Đổi mật khẩu</Button>
                            </div>
                        </div>
                        <div className={clsx(styles.infoUserBody)}>
                            <div className={clsx(styles.navbarWrapper)}>
                                <h2>Thông tin</h2>
                                <ul className={clsx(styles.navbar)}>
                                    <li className={clsx(styles.item)}>
                                        <span>UserId:</span> {dataUser[0].id ?? "*****"}
                                    </li>
                                    <li className={clsx(styles.item)}>
                                        <span>Username:</span> {dataUser[0].username ?? ""}
                                    </li>
                                    <li className={clsx(styles.item)}>
                                        <span>Email:</span> {dataUser[0].email ?? "Not Found"}
                                    </li>
                                    <li className={clsx(styles.item)}>
                                        <span>Số điện thoại:</span> {dataUser[0].phone}
                                    </li>
                                    <li className={clsx(styles.item)}>
                                        <span>Chức danh:</span> {dataUser[0].role_name}
                                    </li>
                                </ul>
                            </div>
                            <div className={clsx(styles.contentMore)}>
                                <h2>Lịch sử</h2>
                                <div className={clsx(styles.listHistory)}>
                                    <Button medium outline>Phim đã xem</Button>
                                    <Button medium outline>Phim đã thích</Button>
                                    <Button medium outline>Phim đang theo dõi</Button>
                                    {/* <Button medium primary>Hello</Button> */}
                                </div>
                                <div className={clsx(styles.listItem)}>
                                    {dataManga.map((item, index) => {
                                        // console.log("item detail", item)
                                        return (
                                            <ItemManga setColumn={4} data={item} key={index} to={`/manga/detail/${item.keyword}/${item.id}`} />
                                        )
                                    })}
                                    {dataManga.map((item, index) => {
                                        // console.log("item detail", item)
                                        return (
                                            <ItemManga setColumn={4} data={item} key={index} to={`/manga/detail/${item.keyword}/${item.id}`} />
                                        )
                                    })}
                                    {dataManga.map((item, index) => {
                                        // console.log("item detail", item)
                                        return (
                                            <ItemManga setColumn={4} data={item} key={index} to={`/manga/detail/${item.keyword}/${item.id}`} />
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>

            {/* Toastify */}
            {typeNotify === "" ?
                <Toastify icon={<PlusIcon />}
                    ref={toastRef}
                    timeout={3000}
                >test</Toastify>
                : typeNotify === "success" ?
                    <Toastify icon={<CircleCheckIcon />}
                        success
                        ref={toastRef}
                        timeout={3000}
                    >Thêm người dùng thành công</Toastify>
                    : typeNotify === "error" ?
                        <Toastify icon={<DangerIcon />}
                            error
                            ref={toastRef}
                            timeout={3000}
                        >Có lỗi đã xảy ra!</Toastify>
                        : typeNotify === "warning" ?
                            <Toastify icon={<WarningIcon />}
                                warning
                                ref={toastRef}
                                timeout={3000}
                            >Tài khoản đã tồn tại!</Toastify>
                            : typeNotify === "update" ?
                                <Toastify icon={<WarningIcon />}
                                    success
                                    ref={toastRef}
                                    timeout={3000}
                                >Cập nhật người dùng thành công</Toastify>
                                : typeNotify === "delete" ?
                                    <Toastify icon={<WarningIcon />}
                                        success
                                        ref={toastRef}
                                        timeout={3000}
                                    >Xóa người dùng thành công</Toastify>
                                    :
                                    ""
            }

            {/* modal update*/}
            {openModalUpdateUser && <Modal open={openModalUpdateUser}
                close={() => {
                    setOpenModalUpdateUser(false)
                }}
            >
                <form className={clsx(styles.modal)}
                    onSubmit={onHandleSubmitUpdate}
                >
                    <div className={clsx(styles.contentTop)}>
                        <div className={clsx(styles.heading)}>
                            Update a user
                        </div>
                        <div className={clsx(styles.body)}>
                            {inputs.map((item, index) => {
                                if (item.typetime) {
                                    return;
                                }

                                if (item.combobox) {
                                    return (
                                        <FormInput key={index}
                                            dataCombobox={listRoles}
                                            {...item}
                                        />
                                    )
                                }

                                if (item.type === "file") {
                                    return (
                                        <FormInput
                                            key={index}
                                            onChange={handlePreviewImage}
                                            imagePreview={image.preview ?? LocalUserLogin[item.name]}
                                            {...item}
                                        />
                                    )
                                }

                                return (
                                    <FormInput
                                        key={index}
                                        value={dataUpdate[item.name]}
                                        imagePreview={dataUpdate[item.name]}
                                        onChange={onChangeInputUpdate}
                                        {...item}
                                    />
                                )

                            })}
                        </div>
                    </div>
                    <div className={clsx(styles.userActive)}>
                        <Button className={clsx(styles.test)} primary medium onClick={() => handleCloseModalUpdateUser(false)}>exit</Button>
                        <Button primary medium>update</Button>
                    </div>
                </form>
            </Modal>
            }

            {/* chưa xg :( */}
            {/* modal changePass*/}
            {openModalChangePassword && <Modal open={openModalChangePassword}
                close={() => {
                    setOpenModalChangePassword(false)
                }}
            >
                <form className={clsx(styles.modal)}
                    onSubmit={onHandleSubmitUpdate}
                >
                    <div className={clsx(styles.contentTop)}>
                        <div className={clsx(styles.heading)}>
                            Change Password
                        </div>
                        <div className={clsx(styles.body)}>
                            {inputsChangePassword.map((item, index) => {

                                return (
                                    <FormInput
                                        key={index}
                                        value={values[item.name]}
                                        onChange={onChangeInput}
                                        {...item}
                                    />
                                )

                            })}
                        </div>
                    </div>
                    <div className={clsx(styles.userActive)}>
                        <Button className={clsx(styles.test)} primary medium onClick={() => handleCloseModalChangePassword(false)}>exit</Button>
                        <Button primary medium>update</Button>
                    </div>
                </form>
            </Modal>
            }
        </Fragment>

    );
}

export default Personal;