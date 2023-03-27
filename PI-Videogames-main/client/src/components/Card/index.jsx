import styles from "../Card/styles.module.css";
import { Link } from "react-router-dom";

export const Card = ({id, name, background_image}) => {
    

    return (
        <div className={styles.card}>
            <div className={styles.cardContent}>

                <Link to={`/videogames/${id}`}>
                    <img src={background_image} alt={name} className={styles.img} />                
                </Link>

                <h3 className={styles.title}>{name}</h3>
                <h5 className={styles.genres}>genero</h5>
                
            </div>
        </div>
    )
}