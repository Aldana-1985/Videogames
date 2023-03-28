import { Link } from "react-router-dom";

import styles from "../Card/styles.module.css";

export const Card = ({id, name, background_image, genres, image}) => {
    
    return (
        <div className={styles.card}>
            <div className={styles.cardContent}>

                <Link to={`/videogames/${id}`}>
                    <img src={background_image || image} alt={name} className={styles.img} />                
                </Link>

                <h3 className={styles.title}>{name}</h3>
                <div className={styles.genresContainer}>
                    {genres && genres.map(({ name }) => (
                        <h5 className={styles.genres}>{name}</h5>
                    ))}
                </div>
                
            </div>
        </div>
    )
}