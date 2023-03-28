import { useState } from "react";
import { useDispatch } from "react-redux";

import { getGameByName, getGames } from "../../redux/actions";
import { Button } from "../Button";
import { ButtonLink } from "../ButtonLink";
import styles from "../Search/styles.module.css";


export const Search = () => {

    const [name, setName] = useState('');
    const handleInputChange = (e) => {
        setName(e.target.value)    
    };

    const dispatch = useDispatch();
    const handleOnClick = () => {
        if (name === '') {
            dispatch(getGames({}));
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
            <Button text="Buscar" onClick={handleOnClick}/>
            <ButtonLink
                link="/form"
                text="Crear"
            />
                   
        </div>
    )
}