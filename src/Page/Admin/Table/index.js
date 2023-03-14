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

function Table() {
    const { nameCombobox, setNameCombobox } = useContext(GlobalContext)
    const [openModalCreateUser, setOpenModalCreateUser] = useState(false);
    const [openModalUpdateUser, setOpenModalUpdateUser] = useState(false);
    const [openModalViewUser, setOpenModalViewUser] = useState(false);
    const [openModalDeleteUser, setOpenModalDeleteUser] = useState(false);
    const [dataUpdate, setDataUpdate] = useState({});
    const [dataUserView, setDataUserView] = useState({});
    const [dataDelete, setDataDelete] = useState({});

    const [image, setImage] = useState("");

    // roles
    const [showDataCombobox, setShowDataCombobox] = useState(false);
    // render table
    const [listUsers, setListUsers] = useState([]);
    const [listRoles, setListRoles] = useState([]);
    const [values, setValues] = useState({
        username: "",
        name: "",
        email: "",
        password: "",
        phone: "",
        role_id: "",
        role_name: "",
        create_at: "",
        update_at: "",
        avatar: "",
    });

    const inputs = [
        {
            id: 1,
            name: "username",
            type: "text",
            placeholder: "Username",
            label: "Username",
            errorMessage: "Vui lòng nhập tên đăng nhập 3-20 ký tự",
            pattern: "[A-Za-z0-9_]{3,20}",
            required: true
        },
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
            errorMessage: "Vui lòng nhập tên 3-20 ký tự",
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
            id: 5,
            name: "role_name",
            type: "text",
            placeholder: "Role",
            label: "Role",
            combobox: true.toString()
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

    const [typeNotify, setTypeNotify] = useState("");

    const toastRef = useRef();

    // create
    const handleCloseModal = () => {
        setOpenModalCreateUser(false)
    }

    const onChangeInput = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
        // console.log({ ...values, [e.target.name]: e.target.value })
        // console.log("name Base")
        // console.log({...values, [e.target.name]: "hello"})
    }


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
            })

            .catch(() => {
                console.log("error")
            })
    }, [openModalCreateUser, openModalUpdateUser, openModalDeleteUser]);

    useEffect(() => {
        axios.get("http://localhost/manga-comic-be/api/roles/read.php")
            .then((res) => {
                console.log("data roles", res.data)
                setListRoles(res.data);
                // setListUsers(res.data);
            })

            .catch(() => {
                console.log("error")
            })
    }, [])

    // create
    const resetValueCreate = () => {
        let newObj = {}
        for (let key in values) {
            newObj[key.toString()] = "";
        }

        setValues(newObj);
        setImage("");
    }

    const onHandleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.target);

        // console.log("image", image);

        data.append("name", values.name);
        data.append("username", values.username);
        data.append("email", values.email);
        data.append("password", values.password);
        data.append("phone", values.phone);
        data.append("avatar", image)

        listRoles.find((item) => {
            if (item.name === nameCombobox) {                
                data.append("role_id", item.id);
                console.log("id", item.id);
            }
        })


        let checkBool = true;
        listUsers.find((item) => {
            if (item.username === values.username) {
                console.log("tài khoản đã tồn tại");
                checkBool = false;
                handleCloseModal();
                handleToastNotify();
                setTypeNotify("error");
            }
        })

        if (checkBool) {
            axios({
                method: "POST",
                url: "http://localhost/manga-comic-be/api/users/create.php",
                data: data,
                headers: { "Content-Type": "multipart/form-data" },
            })
                .then(() => {
                    console.log("success");
                    checkBool = false;
                    handleCloseModal();
                    handleToastNotify();
                    setTypeNotify("success");
                    resetValueCreate();
                })
                .catch(() => {
                    console.log("error");
                })
        }

        // console.log(data);
        // console.log(Object.fromEntries(data.entries()))

        // console.log("hi");
        // console.log(values.username);
    }

    const handleToastNotify = () => {
        toastRef.current.showToast();
    }

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

    const handleCloseModalUpdateUser = () => {
        setOpenModalUpdateUser(false)
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
                } else if(key.toString() === "role_name") {
                    listRoles.find((item) => {
                        if (item.name === nameCombobox) {                
                            data.append("role_id", item.id);
                        }
                    })
                } else if(key.toString() === "role_id") {
                    
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
                    handleCloseModalUpdateUser();
                    handleToastNotify();
                    setTypeNotify("update");
                })
                .catch(() => {
                    console.log("error");
                })
        }
    }

    // view 
    const handleClickBtnView = (user) => {
        setOpenModalViewUser(true);
        setDataUserView(user);
    }

    // delete
    const handleClickBtnDelete = (user) => {
        setOpenModalDeleteUser(true);
        setDataDelete(user);
    }

    const onHandleSubmitDelete = (e) => {
        e.preventDefault();
        const data = new FormData(e.target);

        if (dataDelete && dataDelete !== {}) {
            for (let key in dataDelete) {
                data.append(key.toString(), dataDelete[key])
            }
            // console.log("data:", data);
            // console.log("data entry:", Object.fromEntries(data.entries()))

        }


        let checkBool = true;

        if (checkBool) {
            axios({
                method: "POST",
                url: "http://localhost/manga-comic-be/api/users/delete.php",
                data: data,
                headers: { "Content-Type": "multipart/form-data" },
            })
                .then(() => {
                    console.log("success");
                    checkBool = false;
                    setOpenModalDeleteUser(false);
                    handleToastNotify();
                    setTypeNotify("delete");
                })
                .catch(() => {
                    console.log("error");
                })
        }
    }

    return (
        <Fragment>
            <div className={clsx(styles.wrapper)}>
                {/* Table */}
                <div className={clsx(styles.heading)}>
                    Quản lý người dùng
                </div>
                <div className={clsx(styles.addUser)}>
                    <Button primary
                        medium
                        iconLeft={<PlusIcon />}
                        onClick={() => {
                            // load combobox
                            const find = listRoles.find(element => element.id === 1)
                            setNameCombobox(find.name)        
                            setOpenModalCreateUser(true)                            
                        }}
                    >Add new user</Button>
                </div>
                <table className={clsx(styles.table)}>
                    <thead>
                        <tr>
                            <th style={{ width: "5%" }}>No</th>
                            <th style={{ width: "15%" }}>Username</th>
                            <th style={{ width: "25%" }}>Email</th>
                            <th style={{ width: "15%" }}>Role</th>
                            <th style={{ width: "40%" }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listUsers && listUsers.length > 0 &&
                            listUsers.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.id}</td>
                                        <td>{item.username}</td>
                                        <td>{item.email}</td>
                                        <td>{item.role_name}</td>
                                        <td>
                                            <Button view
                                                onClick={() => {
                                                    handleClickBtnView(item)
                                                }}
                                            >View</Button>
                                            <Button edit
                                                onClick={() => {
                                                    handleClickBtnUpdate(item)
                                                }}
                                            >Update</Button>
                                            <Button danger
                                                onClick={() => {
                                                    handleClickBtnDelete(item)
                                                }}
                                            >Delete</Button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
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
                        >Tài khoản đã tồn tại!</Toastify>
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

            {/* modal create*/}
            {openModalCreateUser && <Modal open={openModalCreateUser}
                close={() => {
                    setOpenModalCreateUser(false)
                }}
            >
                <form className={clsx(styles.modal)}
                    onSubmit={onHandleSubmit}
                >
                    <div className={clsx(styles.contentTop)}>
                        <div className={clsx(styles.heading)}>
                            add new user
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
                                            value={values[item.name]}
                                            imagePreview={image.preview}
                                            {...item}
                                        />
                                    )
                                }

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
                        <Button className={clsx(styles.test)} primary medium onClick={handleCloseModal}>exit</Button>
                        <Button primary medium>Add</Button>
                    </div>
                </form>
            </Modal>
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
                                            imagePreview={image.preview ?? image}
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

            {/* modal view*/}
            {openModalViewUser && <Modal open={openModalViewUser}
                close={() => {
                    setOpenModalViewUser(false)
                }}
            >
                <form className={clsx(styles.modal)}
                    onSubmit={onHandleSubmitUpdate}
                >
                    <div className={clsx(styles.contentTop)}>
                        <div className={clsx(styles.heading)}>
                            View a user
                        </div>
                        <div className={clsx(styles.body)}>
                            {/* view */}
                            {inputs.map((item, index) => {
                                if (item.type === "file") {
                                    return (
                                        <FormInput
                                            key={index}
                                            onChange={() => { }}
                                            value={dataUserView[item.name]}
                                            imagePreview={dataUserView[item.name]}
                                            onlyRead="true"
                                            {...item}
                                        />
                                    )
                                }

                                return (
                                    <FormInput
                                        key={index}
                                        value={dataUserView[item.name]}
                                        onChange={onChangeInput}
                                        onlyRead="true"
                                        {...item}
                                    />
                                )
                            })}
                        </div>
                    </div>
                    <div className={clsx(styles.userActive)}>
                        <Button className={clsx(styles.test)} primary medium onClick={() => setOpenModalViewUser(false)}>exit</Button>
                        {/* <Button primary medium>submit</Button> */}
                    </div>
                </form>
            </Modal>
            }

            {/* modal delete*/}
            {openModalDeleteUser && <Modal open={openModalDeleteUser}
                close={() => {
                    setOpenModalDeleteUser(false)
                }}
            >
                <form className={clsx(styles.modal)}
                    onSubmit={onHandleSubmitDelete}
                >
                    <div className={clsx(styles.contentTop)}>
                        <div className={clsx(styles.heading)}>
                            Confirm DELETE the user
                        </div>
                        <div className={clsx(styles.body)}>
                            <div className={clsx(styles.delete)}>
                                <div className={clsx(styles.title)}>
                                    Are you sure delete this user
                                </div>
                                <div className={clsx(styles.info)}>
                                    <p>username:<b>{dataDelete && dataDelete.username}</b></p>
                                    <p>email:<b>{dataDelete && dataDelete.email}</b></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={clsx(styles.userActive)}>
                        <Button className={clsx(styles.test)} primary medium onClick={() => setOpenModalDeleteUser(false)}>exit</Button>
                        <Button primary medium>delete</Button>
                    </div>
                </form>
            </Modal>
            }
        </Fragment>

    );
}

export default Table;