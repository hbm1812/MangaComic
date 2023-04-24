import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import Button from "../../Components/Button";
import styles from "./Error404.module.scss";

function Error404() {
    const navigate = useNavigate();
    return (
        <div style={{ fontSize: 24, fontWeight: 400 }}
            className={clsx(styles.container)}
        >
            <h1>Error 404</h1>
            <hr />
            <p>Oops! The page you requested was not found.</p>
            <Button primary medium onClick={() => navigate(-1)}>Go back</Button>
        </div>
    );
}

export default Error404;