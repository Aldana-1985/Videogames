import { useDispatch } from "react-redux"
import { getGames } from "../../redux/actions";

import styles from "../Paginated/styles.module.css";

export const Paginated = ({ page, totalPages }) => {

    const dispatch = useDispatch()

    const handleAddClick = () => {
        dispatch(getGames({page: page + 1}))
    }

    const handleSubsClick = () => {
        dispatch(getGames({page: page - 1}))
    }

    return(
        <div className={styles.paginated}>
            <button 
                className={styles.button} 
                disabled={page === 1}
                onClick={handleSubsClick}
            >
                {"<"}
            </button>
            <p className={styles.page}>{page}</p>
            <button 
                className={styles.button} 
                disabled={page === totalPages}
                onClick={handleAddClick}
            >
                {">"}
            </button>
        </div>
    )
}