import {Link} from "react-router-dom";
import styles from "./styles.module.css";

export const ButtonLink = ({ text, link }) => {
    return (
        <Link to={link}>
            <button className={styles.button}>
                {text}
            </button>
        </Link>
    )
}