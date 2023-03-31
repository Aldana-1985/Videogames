import { useDispatch } from "react-redux";
import { getFilteredGames } from "../../redux/actions";
import styles from "../Paginated/styles.module.css";

export const Paginated = ({ page, totalPages, filters }) => {

    const dispatch = useDispatch()

    const handleAddClick = () => {
        dispatch(getFilteredGames({page: page + 1, order: filters.order, origin: filters.origin, ratingOrder: filters.ratingOrder, genres: filters.genre}))
    }

    const handleSubsClick = () => {
        dispatch(getFilteredGames({page: page - 1, order: filters.order, origin: filters.origin, ratingOrder: filters.ratingOrder, genres: filters.genre}))
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