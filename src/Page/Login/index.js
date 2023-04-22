import clsx from "clsx";
import { Fragment, useContext, useEffect, useState } from "react";
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
import axios from "axios";
import GlobalContext from "../../Contexts/GlobalContext";


function Login() {
    // router dom
    const navigate = useNavigate();
    const [values, setValues] = useState({
        username: "",
        password: "",
    });
    const [listUsers, setListUsers] = useState([]);
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

    useEffect(() => {
        axios.get("http://localhost/manga-comic-be/api/users/read.php")
            .then((res) => {
                // console.log("data", res.data)
                setListUsers(res.data);
            })

            .catch(() => {
                console.log("error")
                
            })
    }, [])

    const onHandleSubmit = (e) => {
        e.preventDefault();   

        console.log("values", values)
        
        let filter = listUsers.filter(item => item.username === values.username && item.password === values.password)
        console.log("filter", filter);

        if(filter.length > 0 ) {
            const jsonUser = JSON.stringify(filter[0]);
            localStorage.setItem("DataUser", jsonUser);
            navigate("/")
        }
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
                    Don't have an account? 
                    <span
                        onClick={() => navigate("/register")}
                    >Register now!</span>
                </div>
            </form>
        </div>
    );
}

export default Login;