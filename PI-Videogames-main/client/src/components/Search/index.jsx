import styles from "../Search/styles.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getGameByName, getGames } from "../../redux/actions";


export const Search = () => {

    const [name, setName] = useState('');
    const handleInputChange = (e) => {
        setName(e.target.value)    
    };

    const dispatch = useDispatch();
    const handleOnClick = (e) => {
        if (name === '') {
            dispatch(getGames());
        } else {
            dispatch(getGameByName(name));
        }
        setName('');
    }

    return (
        <div className={styles.searchBar}>
            <input 
                type="text" 
                placeholder="Buscar..." 
                className={styles.searchInput} 
                onChange={handleInputChange}
                value={name}
            />
            <button 
                className={styles.searchButton} 
                onClick={handleOnClick}
            >
                Buscar
            </button>            
        </div>
    )
}