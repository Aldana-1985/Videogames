import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCurrentGame } from "../../redux/actions";
import { ButtonLink } from "../../components/ButtonLink"
import styles from "../Detail/styles.module.css"


export const Detail = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { currentGame } = useSelector((state) => state);
   

    useEffect(() => {
        dispatch(getCurrentGame(id))
    },[dispatch]);

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                {currentGame.name && (
                    <>
                        <img src={currentGame.image || currentGame.background_image} alt={currentGame.name} className={styles.img}/>
                        <h1 className={styles.title}>{currentGame.name}</h1>
                        <h3 className={styles.text}>{`Descripción: ${currentGame?.description}`}</h3>
                        <div className={styles.listContainer}>
                            {currentGame?.platforms.map((platform, i) => (
                                <p key={i} className={styles.platform}>{platform?.platform?.name || platform}</p>
                            ))}
                        </div>
                        <p className={styles.text}>{`Rating: ${currentGame?.rating}`}</p>
                        <p className={styles.text}>{`Fecha de Lanzamiento: ${currentGame?.releaseDate || currentGame?.released}`}</p>
                        <div className={styles.listContainer}>
                            {currentGame?.genres.map((genres, i)=> (
                                <p key={i} className={styles.text}>{genres?.name || genres}</p>
                            ))}
                        </div>
                        <div>
                            <ButtonLink text="Volver" link="/home"/>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}