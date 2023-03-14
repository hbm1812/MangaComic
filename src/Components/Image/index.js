import clsx from "clsx";
import { useState } from "react";
import styles from "./Image.module.scss";
import PropTypes from "prop-types";

Image.propTypes = {
    alt: PropTypes.string,
    src: PropTypes.string,    
    className: PropTypes.string,
    fallback: PropTypes.string,
}

function Image({
        alt,
        src = "",
        className,
        fallback: customFallback = "https://media.istockphoto.com/id/1424817878/vector/no-image-vector-symbol-missing-available-icon-no-gallery-for-this-moment-placeholder.jpg?b=1&s=170667a&w=0&k=20&c=mWbBeVd7Ptyd6QO7Ta-XiErOhW0VHJWEWhPishcKGMk=",
        ...props 
    }) {
    const [fallback, setFallBack] = useState("");

    const handleError = () => {
        setFallBack(customFallback)
    }

    return (
        <div className={clsx(styles.wrapper, className)}>
            <img className={className} src={fallback || src} alt={alt} {...props} onError={handleError} />
        </div>
    );
}

export default Image;