import clsx from "clsx";
import { Fragment, useState } from "react";
import Button from "../../Components/Button";
import styles from "./Login.module.scss";
import { useNavigate } from "react-router-dom";
import users from "../../data/user";

// validate 
// npm install validator
import isEmpty from "validator/lib/isEmpty";
import Image from "../../Components/Image";


function Login() {
    // router dom
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [validationMsg, setValidationMsg] = useState({});
    const [accountList, setAccountList] = useState(users);
    
    const onChangeEmail = (e) => {
        const value = e.target.value;
        setEmail(value);

    }

    const onChangePassword = (e) => {
        const value = e.target.value;
        setPassword(value);
    }

    const validateAll = (e) => {
        const msg = {};
        if (isEmpty(email)) {
            msg.email = "Vui lòng nhập email của bạn";
        }

        if (isEmpty(password)) {
            msg.password = "vui lòng nhập password";
        }

        setValidationMsg(msg);
        if (Object.keys(msg).length > 0) return false;
        return true;
    }
    

    const onSubmitLogin = () => {
        const isValid = validateAll();
        if (!isValid) {
            return;
        }
        navigate("/");                
                
    }

    return (
        <div className={clsx(styles.container)}>
            <div className={clsx(styles.wrapper)}>
                <div className={clsx(styles.header)}>
                    Đăng nhập
                </div>
                <div className={clsx(styles.content)}>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" value={email} id="email"
                        placeholder="Email@gmail.com"
                        onChange={onChangeEmail}
                    />
                    <p>{validationMsg.email}</p>

                    <label htmlFor="password">Your Password</label>
                    <input type="password" name="password" value={password} id="password"
                        placeholder="******"
                        onChange={onChangePassword}
                    />
                    <p>{validationMsg.password}</p>
                </div>
                <div className={clsx(styles.footer)}>
                    <Button primary
                        onClick={onSubmitLogin}
                    >Login</Button>
                </div>
                <Image
                    src=""
                    className={clsx(styles.testImg)}
                    fallback="https://tinhocdaiviet.com/wp-content/uploads/Genshin-Impact-Se-Duoc-Chuyen-The-Thanh-Anime-1.jpg"
                />
            </div>
        </div>
    );
}

export default Login;