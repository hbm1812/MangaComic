import clsx from "clsx";
import Button from "../Button";
import styles from "./Pagination.module.scss";
import PropTypes from 'prop-types';

Pagination.propTypes = {
    postsPerPage: PropTypes.number.isRequired,
    totalPosts: PropTypes.number,
    paginate: PropTypes.func,
}

function Pagination(props) {
    const { postsPerPage, totalPosts, paginate } = props;
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className={clsx(styles.wrapper)}>
            {pageNumbers.map((number, index) => (
                <span key={index} className={clsx(styles.pageNumber)}
                    onClick={() => paginate(number)}
                >{number}</span>
            ))}    

        </div>
    );
}

export default Pagination;