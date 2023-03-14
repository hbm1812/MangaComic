import clsx from "clsx";
import { Fragment, useEffect, useRef, useState } from "react";
import Button from "../../../Components/Button";
import Modal from "../../../Components/Modal";
import styles from "./Dashboard.module.scss";
import FormInput from "../../../Components/FormInput";
import Heading from "../../../Components/Heading";
import { CircleCheckIcon, DangerIcon, PlusIcon, WarningIcon } from "../../../Components/Icon";
import axios from "axios";

import Toastify from "../../../Components/Toastify";

function Dashboard() {
    const [openModalCreateUser, setOpenModalCreateUser] = useState(false);
    const [openModalUpdateUser, setOpenModalUpdateUser] = useState(false);
    const [openModalViewUser, setOpenModalViewUser] = useState(false);
    const [openModalDeleteUser, setOpenModalDeleteUser] = useState(false);
    const [dataUpdate, setDataUpdate] = useState({});
    const [dataUserView, setDataUserView] = useState({});
    const [dataDelete, setDataDelete] = useState({});

    // render table
    const [listUsers, setListUsers] = useState([]);
    const [values, setValues] = useState({
        username: "",
        fullName: "",
        email: "",
        password: "",
        role: "",
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
            name: "role",
            type: "text",
            placeholder: "Role",
            label: "Role",
            // errorMessage: "Vui lòng chọn role hợp lệ",
            // pattern: "[A-Za-z0-9_]{3,15}",
            // required: true
        },
        {
            id: 6,
            name: "image",
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

    const resetValueCreate = () => {
        let newObj = {}
        for (let key in values) {
            newObj[key.toString()] = "";
        }

        setValues(newObj);
    }

    const onHandleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.target);

        data.append("username", values.username);
        data.append("email", values.email);
        data.append("password", values.password);
        data.append("role", "Admin");

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

    useEffect(() => {
        axios.get("http://localhost/manga-comic-be/")
            .then((res) => {
                // console.log("data", res.data)
                setListUsers(res.data);
            })

            .catch(() => {
                console.log("error")
            })
    }, [openModalCreateUser, openModalUpdateUser, openModalDeleteUser]);

    const handleToastNotify = () => {
        toastRef.current.showToast();
    }

    // update
    const handleClickBtnUpdate = (user, e) => {
        setOpenModalUpdateUser(true);
        setDataUpdate(user);
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
            for (let key in dataUpdate) {
                data.append(key.toString(), dataUpdate[key])
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
                {/* Dashboard */}
                <div className={clsx(styles.heading)}>
                    Quản lý người dùng
                </div>
                <div className={clsx(styles.addUser)}>
                    <Button primary
                        medium
                        iconLeft={<PlusIcon />}
                        onClick={() => setOpenModalCreateUser(true)}
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
                                        <td>{item.role}</td>
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
            {/* <Toastify warning icon={<PlusIcon />}
                ref={toastRef}
                timeout={3000}
            >Toastify</Toastify> */}

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

                                if (item.type === "file") {
                                    return (
                                        <FormInput
                                            key={index}
                                            value={values[item.name]}
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
                                return (
                                    <FormInput
                                        key={index}
                                        value={dataUpdate[item.name]}
                                        preview="https://lh3.googleusercontent.com/fife/AMPSemdzlzHyy1LN7ntzlAJlLzplTeck3qrrbzlkLUam8gX1sVsOd8m1hvPEgOK4j-rl3tyZ2ET16PlfMM7_QHFQQ8cvrU_cyg1-BqGjh0-qJRBEY0yMasqlLSFmdyUbhLd-LaH4JiNPgVhJ9ghhJwkCbMmtqod4dPpK_N5ixemcAyifUv0gt0_i6d0EOSdcDIrKpHVE2AcFqVvZXsecB3W3CBY06OyMblxUoJBI7mkeDZD70ZE0JAuTOVDheGk3z4XC90gK-08QeVE5dGFNlJeTsU_0HjNTX84cpfn2BgtuQ82Au3-6YEq1cZkDePT45kqVPDQqeswS8naanS8okgCLs7G1Aum_Wky7rziRS4BBNYQbhA1aBtDbHR6yV_OuukCDYwJ7nGCFYAILOzpVTWtm-uX3Qz1h6rfQoaTAYG2tamyva9qausn5sNe3xLsztrPKfD0h3YyUVxjWNaje7qaTPuh2WgxS_ls4hwawut0Cy6vpNbmtQxzUyfBu8CUMCGSrGVHAVgYVZQJSZIgf71HekgBc7IzRVJRNa28YG6OPUAnKTK_K31ur5ck_-x2ZZKDhWSjtkxwl30ddPMIbd67ntq9XH7_opAzYDma1_3_S8VUj2W-xI7e0DoEq4_-XAKChzcf_kl0mDD0IX6FDjixHACeFqHjVKTwjdhkhoCZJhHDlNnpUG0eBV_4nmHOdvQ3dSa405rwuv5-8vszsWlT8RHvF5mQkTv6N08ezDfZtKivAP-O7fh82xMzf7jJ_xbbBVqYQpOr5_eqhYuh8gEoDit7QDNS85Y3Ryt5FsA7FIQ40m_-frZ3dntAQdPW0F3IBtuGvbYNOKzfTTw2D7ywq4KFHJH1qYYNvgJ794pu2TP5VExGmJUcsWJVBAWNt8prp2imjjLeVz3MxfinOLF3dAeKtG_OxulZN2F73_lukcdU5AU6jwbJkTbYgjGjSBXV7qgqRK-3mUfu5XjyB1R1j1tdPKPdm5agnpDW9_8SjygWgUc0NGFI4qh2hLZt01X5AzGlJxde5YyuvVUo5hx4d_IHomNFwkOwbzBjXKk1qEDDWeKM9ZpmrpryshKDbYy0G7FYCZfgoo9x092UkRtoIuZ7_AZl9AR2FQ1DNvRWx6lvNv3AbYRIIwlVGIsq_G_ejLB4DofrzsMXc5Y7HEjoTpUpUvkbtIeLdmrnLjOZsFiWyifMHfj1LWd2-wMsL7qZ1BWjf2TG3IZESOR8ApvO5NLTMEyDN774s2wTCMIeSraslkOtMvFlgYoWUe-rMBXOcR5wFRDp6B4kNRwHVtB95LcDMskQRx9lR2wLzEi9W23QiB5jcf3gxTXRzUC7_yEweWKKeXPTHYGDjL0nScw83R3WJ5Yly4Lp1OdTPGw3iRB8nDQVTsGAxMIS7LWYpT32dvOUkLH64koTNmEiv4eWHoxg7EWgBi0CIyA9D601VN3PFB1ylkPrDrS4B7929RmS4aRa0ZktjUMMGDz1wMySrUsi9lp_8pajHgRM2X4Qrei6UyMpKBtiX68ob71YX=w1920-h942"
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
                            {inputs.map((item, index) => {
                                return (
                                    <FormInput
                                        key={index}
                                        value={dataUserView[item.name]}
                                        onChange={() => { }}
                                        disable="true"
                                        preview="https://lh3.googleusercontent.com/fife/AMPSemdzlzHyy1LN7ntzlAJlLzplTeck3qrrbzlkLUam8gX1sVsOd8m1hvPEgOK4j-rl3tyZ2ET16PlfMM7_QHFQQ8cvrU_cyg1-BqGjh0-qJRBEY0yMasqlLSFmdyUbhLd-LaH4JiNPgVhJ9ghhJwkCbMmtqod4dPpK_N5ixemcAyifUv0gt0_i6d0EOSdcDIrKpHVE2AcFqVvZXsecB3W3CBY06OyMblxUoJBI7mkeDZD70ZE0JAuTOVDheGk3z4XC90gK-08QeVE5dGFNlJeTsU_0HjNTX84cpfn2BgtuQ82Au3-6YEq1cZkDePT45kqVPDQqeswS8naanS8okgCLs7G1Aum_Wky7rziRS4BBNYQbhA1aBtDbHR6yV_OuukCDYwJ7nGCFYAILOzpVTWtm-uX3Qz1h6rfQoaTAYG2tamyva9qausn5sNe3xLsztrPKfD0h3YyUVxjWNaje7qaTPuh2WgxS_ls4hwawut0Cy6vpNbmtQxzUyfBu8CUMCGSrGVHAVgYVZQJSZIgf71HekgBc7IzRVJRNa28YG6OPUAnKTK_K31ur5ck_-x2ZZKDhWSjtkxwl30ddPMIbd67ntq9XH7_opAzYDma1_3_S8VUj2W-xI7e0DoEq4_-XAKChzcf_kl0mDD0IX6FDjixHACeFqHjVKTwjdhkhoCZJhHDlNnpUG0eBV_4nmHOdvQ3dSa405rwuv5-8vszsWlT8RHvF5mQkTv6N08ezDfZtKivAP-O7fh82xMzf7jJ_xbbBVqYQpOr5_eqhYuh8gEoDit7QDNS85Y3Ryt5FsA7FIQ40m_-frZ3dntAQdPW0F3IBtuGvbYNOKzfTTw2D7ywq4KFHJH1qYYNvgJ794pu2TP5VExGmJUcsWJVBAWNt8prp2imjjLeVz3MxfinOLF3dAeKtG_OxulZN2F73_lukcdU5AU6jwbJkTbYgjGjSBXV7qgqRK-3mUfu5XjyB1R1j1tdPKPdm5agnpDW9_8SjygWgUc0NGFI4qh2hLZt01X5AzGlJxde5YyuvVUo5hx4d_IHomNFwkOwbzBjXKk1qEDDWeKM9ZpmrpryshKDbYy0G7FYCZfgoo9x092UkRtoIuZ7_AZl9AR2FQ1DNvRWx6lvNv3AbYRIIwlVGIsq_G_ejLB4DofrzsMXc5Y7HEjoTpUpUvkbtIeLdmrnLjOZsFiWyifMHfj1LWd2-wMsL7qZ1BWjf2TG3IZESOR8ApvO5NLTMEyDN774s2wTCMIeSraslkOtMvFlgYoWUe-rMBXOcR5wFRDp6B4kNRwHVtB95LcDMskQRx9lR2wLzEi9W23QiB5jcf3gxTXRzUC7_yEweWKKeXPTHYGDjL0nScw83R3WJ5Yly4Lp1OdTPGw3iRB8nDQVTsGAxMIS7LWYpT32dvOUkLH64koTNmEiv4eWHoxg7EWgBi0CIyA9D601VN3PFB1ylkPrDrS4B7929RmS4aRa0ZktjUMMGDz1wMySrUsi9lp_8pajHgRM2X4Qrei6UyMpKBtiX68ob71YX=w1920-h942"
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
                            {/* {inputs.map((item, index) => {
                                return (
                                    <FormInput
                                        key={index}
                                        value={dataUserView[item.name]}
                                        onChange={() => {}}
                                        disable="true"
                                        preview="https://lh3.googleusercontent.com/fife/AMPSemdzlzHyy1LN7ntzlAJlLzplTeck3qrrbzlkLUam8gX1sVsOd8m1hvPEgOK4j-rl3tyZ2ET16PlfMM7_QHFQQ8cvrU_cyg1-BqGjh0-qJRBEY0yMasqlLSFmdyUbhLd-LaH4JiNPgVhJ9ghhJwkCbMmtqod4dPpK_N5ixemcAyifUv0gt0_i6d0EOSdcDIrKpHVE2AcFqVvZXsecB3W3CBY06OyMblxUoJBI7mkeDZD70ZE0JAuTOVDheGk3z4XC90gK-08QeVE5dGFNlJeTsU_0HjNTX84cpfn2BgtuQ82Au3-6YEq1cZkDePT45kqVPDQqeswS8naanS8okgCLs7G1Aum_Wky7rziRS4BBNYQbhA1aBtDbHR6yV_OuukCDYwJ7nGCFYAILOzpVTWtm-uX3Qz1h6rfQoaTAYG2tamyva9qausn5sNe3xLsztrPKfD0h3YyUVxjWNaje7qaTPuh2WgxS_ls4hwawut0Cy6vpNbmtQxzUyfBu8CUMCGSrGVHAVgYVZQJSZIgf71HekgBc7IzRVJRNa28YG6OPUAnKTK_K31ur5ck_-x2ZZKDhWSjtkxwl30ddPMIbd67ntq9XH7_opAzYDma1_3_S8VUj2W-xI7e0DoEq4_-XAKChzcf_kl0mDD0IX6FDjixHACeFqHjVKTwjdhkhoCZJhHDlNnpUG0eBV_4nmHOdvQ3dSa405rwuv5-8vszsWlT8RHvF5mQkTv6N08ezDfZtKivAP-O7fh82xMzf7jJ_xbbBVqYQpOr5_eqhYuh8gEoDit7QDNS85Y3Ryt5FsA7FIQ40m_-frZ3dntAQdPW0F3IBtuGvbYNOKzfTTw2D7ywq4KFHJH1qYYNvgJ794pu2TP5VExGmJUcsWJVBAWNt8prp2imjjLeVz3MxfinOLF3dAeKtG_OxulZN2F73_lukcdU5AU6jwbJkTbYgjGjSBXV7qgqRK-3mUfu5XjyB1R1j1tdPKPdm5agnpDW9_8SjygWgUc0NGFI4qh2hLZt01X5AzGlJxde5YyuvVUo5hx4d_IHomNFwkOwbzBjXKk1qEDDWeKM9ZpmrpryshKDbYy0G7FYCZfgoo9x092UkRtoIuZ7_AZl9AR2FQ1DNvRWx6lvNv3AbYRIIwlVGIsq_G_ejLB4DofrzsMXc5Y7HEjoTpUpUvkbtIeLdmrnLjOZsFiWyifMHfj1LWd2-wMsL7qZ1BWjf2TG3IZESOR8ApvO5NLTMEyDN774s2wTCMIeSraslkOtMvFlgYoWUe-rMBXOcR5wFRDp6B4kNRwHVtB95LcDMskQRx9lR2wLzEi9W23QiB5jcf3gxTXRzUC7_yEweWKKeXPTHYGDjL0nScw83R3WJ5Yly4Lp1OdTPGw3iRB8nDQVTsGAxMIS7LWYpT32dvOUkLH64koTNmEiv4eWHoxg7EWgBi0CIyA9D601VN3PFB1ylkPrDrS4B7929RmS4aRa0ZktjUMMGDz1wMySrUsi9lp_8pajHgRM2X4Qrei6UyMpKBtiX68ob71YX=w1920-h942"
                                        {...item}
                                    />
                                )

                            })} */}
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

export default Dashboard;