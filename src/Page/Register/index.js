import clsx from "clsx";
import { Fragment, useState } from "react";
import Button from "../../Components/Button";
import styles from "./Register.module.scss";
import { useNavigate } from "react-router-dom";
import users from "../../data/user";

// validate 
// npm install validator
import isEmpty from "validator/lib/isEmpty";
import Image from "../../Components/Image";
import FormInput from "../../Components/FormInput";

import axios from "axios";

function Register() {
    // router dom
    const navigate = useNavigate();

    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const inputs = [
        {
            id: 1,
            name: "username",
            type: "text",
            placeholder: "Username",
            label: "Username",
            errorMessage: "Vui lòng nhập tên đăng nhập 3-16 ký tự",
            pattern: "[A-Za-z0-9_]{3,15}",
            required: true
        },
        {
            id: 2,
            name: "email",
            type: "email",
            placeholder: "Email",
            label: "Email",
            errorMessage: "Vui lòng điền email chính xác",
            pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$",
            required: true
        },
        {
            id: 4,
            name: "password",
            type: "password",
            placeholder: "Password",
            label: "Password",
            errorMessage: "Vui lòng nhập mật khẩu 3-16 ký tự",
            pattern: "[A-Za-z0-9_]{3,15}",
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

    const onChangeInput = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
        // console.log({ ...values, [e.target.name]: e.target.value })
        // console.log("name Base")
        // console.log({...values, [e.target.name]: "hello"})
    }

    const onHandleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.target);

        // console.log("image", image);

        data.append("name", "");
        data.append("username", values.username);
        data.append("email", values.email);
        data.append("password", values.password);
        data.append("phone", "");
        data.append("role_id", 2);
        data.append("avatar", "")        


        let checkBool = true;
        // listUsers.find((item) => {
        //     if (item.username === values.username) {
        //         console.log("tài khoản đã tồn tại");
        //         checkBool = false;
        //         handleCloseModal();
        //         handleToastNotify();
        //         setTypeNotify("error");
        //     }
        // })

        if (checkBool) {
            axios({
                method: "POST",
                url: "http://localhost/manga-comic-be/api/users/register.php",
                data: data,
                headers: { "Content-Type": "multipart/form-data" },
            })
                .then(() => {
                    console.log("success");
                    checkBool = false;
                    // handleCloseModal();
                    // handleToastNotify();
                    // setTypeNotify("success");
                    // resetValueCreate();
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


    // console.log(values)

    return (
        <div className={clsx(styles.container)}>
            <form className={clsx(styles.wrapper)}
                onSubmit={onHandleSubmit}
            >
                <div className={clsx(styles.header)}>
                    Register
                </div>
                {inputs.map((item, index) => {
                    return (
                        <FormInput
                            key={index}
                            value={values[item.name]}
                            onChange={onChangeInput}
                            {...item}
                        />

                    )
                })}

                <Button primary large>Register</Button>
                <div className={clsx(styles.login)}>
                    Already have account?
                    <span
                        onClick={() => navigate("/login")}
                    >Login now!</span>
                </div>
            </form>
        </div>
    );
}

export default Register;