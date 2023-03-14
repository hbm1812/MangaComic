import clsx from "clsx";
import { Fragment, useState } from "react";
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
import { UploadIcon } from "../../Components/Icon";


function Login() {
    // router dom
    const navigate = useNavigate();

    const [values, setValues] = useState({
        username: "",
        password: "",
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
            name: "password",
            type: "password",
            placeholder: "Password",
            label: "Password",
            errorMessage: "Vui lòng nhập mật khẩu 3-16 ký tự",
            pattern: "[A-Za-z0-9_]{3,15}",
            required: true
        },
    ];

    const onHandleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        console.log(data);
        console.log(Object.fromEntries(data.entries()))

        // try {
        //     const res = await request.post({
        //         method: "post",
        //         url: "localhost",
        //         data: data,
        //         config: {
        //             header: {
        //                 'Content-Type': 'multipart/form-data'
        //             }
        //         }
        //     });
        //     console.log(res);
        // } catch (error) {
        //     console.log(error)

        // }


    }

    const onChangeInput = (e) => {
        // e.target.name lấy key trong obj
        // e.target.value lấy giá trị trong obj
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    return (
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
                    don't have an account? 
                    <span
                        onClick={() => navigate("/register")}
                    >Register now!</span>
                </div>
            </form>
        </div>
    );
}

export default Login;