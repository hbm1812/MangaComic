import clsx from "clsx";
import { Fragment, useContext, useEffect, useRef, useState } from "react";
import Button from "../../Components/Button";
import styles from "./Login.module.scss";
import { useNavigate } from "react-router-dom";
import users from "../../data/user";
import request, { post } from "../../util/request";

// validate 
// npm install validator
import isEmpty from "validator/lib/isEmpty";
import Image from "../../Components/Image";
import FormInput from "../../Components/FormInput";
import axios from "axios";


function Login() {
    // router dom
    const navigate = useNavigate();
    const [values, setValues] = useState({
        username: "",
        password: "",
    });
    // console.log("listUsers", listUsers);
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
            name: "password",
            type: "password",
            placeholder: "Password",
            label: "Password",
            errorMessage: "Vui lòng nhập mật khẩu 3-20 ký tự",
            pattern: "[A-Za-z0-9_]{3,20}",
            required: true
        },
    ];    

    const onHandleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.target);

        data.append("username", values.username);
        data.append("password", values.password);

        axios({
            method: "POST",
            url: "http://localhost/manga-comic-be/api/users/login.php",
            data: data,
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then((res) => res.data)
            .then((resData) => {
                console.log("resData", resData)
                if(resData.length === 0) {
                    alert("Sai tài khoản hoặc mật khẩu!")
                    setValues({
                        username: "",
                        password: "",
                    })
                    return;
                }                

                const jsonUser = JSON.stringify(resData[0]);
                localStorage.setItem("DataUser", jsonUser);
                navigate("/")
                console.log("success");
            })
            .catch(() => {
                console.log("error");
            })

    }

    const onChangeInput = (e) => {
        // e.target.name lấy key trong obj
        // e.target.value lấy giá trị trong obj
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    return (
        <Fragment>
            <div className={clsx(styles.container)}>
                <form className={clsx(styles.wrapper)}
                    onSubmit={onHandleSubmit}
                >
                    <div className={clsx(styles.header)}>
                        Login
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
                    <Button primary large>Login</Button>
                    {/* <Button iconLeft={<UploadIcon/>} transparent large>Login with Google</Button>                 */}
                    <div className={clsx(styles.register)}>
                        Don't have an account?
                        <span
                            onClick={() => navigate("/register")}
                        >Register now!</span>
                    </div>
                </form>
            </div>            
        </Fragment>
    );
}

export default Login;