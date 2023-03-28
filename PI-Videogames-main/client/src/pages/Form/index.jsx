import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { Button } from "../../components/Button"
import { ButtonLink } from "../../components/ButtonLink"
import { getGenres, createGames } from "../../redux/actions";


import styles from "./styles.module.css"

export const Form = () => {
    const { push } = useHistory()
    const dispatch = useDispatch()
    const { genres } = useSelector(state => state)
    const [state, setState] = useState({
        name: "",
        description: "",
        image: "",
        releaseDate: "",
        rating: 1,
        platforms: "",
        genresId: ""
    })

    const [error, setError] = useState({
        name: "",
        description: "",
        image: "",
        releaseDate: "",
        rating: "",
        genresId: "",
        platforms: "",
    })

    const validateInput = ({name, value}) => {
        if(name === "rating") {
            if(parseInt(value) > 5 || parseInt(value) < 1) return setError(prevState => ({
                ...prevState,
                [name]: "Debe ser un numero entre 1 y 5"
            }))
        }
        if(value === "") setError(prevState => ({
            ...prevState,
            [name]: "Requerido"
        }))
        if(value !== "") setError(prevState => ({
            ...prevState,
            [name]: ""
        }))
    }

    useEffect(() => {
       dispatch(getGenres()) 
    }, [dispatch])

    const handleChange = ({target}) => {
        setState(prevState => ({
            ...prevState,
            [target.name]: target.value
        }))
        validateInput({name: target.name, value: target.value})   
    }
    
    const handleSubmit = () => {
        for (const key in state) {
            validateInput({name: key, value: state[key]})
        }
        const body = {
            ...state,
            genresId: [parseInt(state.genresId)],
            platforms: [state.platforms],
            rating: parseInt(state.rating)
        }
        dispatch(createGames(body))
        push('/home')
    }

    return (
        <div className={styles.form}>
            <div className={styles.container}>
                {genres.length && (
                <div className={styles.formContainer}>
                    <div className={styles.inputContainer}>
                        <label>Nombre</label>
                        <input 
                            className={styles.input} 
                            type="text" 
                            name="name"
                            onChange={handleChange}
                            value={state.name}
                        />
                        {error.name && (
                            <p className={styles.danger}>{error.name}</p>
                        )}
                    </div>
                    <div className={styles.inputContainer}>
                        <label>Descripcion</label>
                        <textarea
                            className={styles.input}
                            rows={3} 
                            type="text" 
                            name="description"
                            onChange={handleChange}
                            value={state.description}
                        />
                        {error.description && (
                            <p className={styles.danger}>{error.description}</p>
                        )}
                    </div>
                    <div className={styles.inputContainer}>
                        <label>Plataforma</label>
                        <select 
                            className={styles.input} 
                            name="platforms" 
                            onChange={handleChange}
                            value={state.platforms}
                        >
                            <option value="pc">pc</option>
                            <option value="play station 3">play station 3</option>
                            <option value="play station 4">play station 4</option>
                            <option value="play station 5">play station 5</option>
                        </select>
                    </div>
                    <div className={styles.inputContainer}>
                        <label>Imagen</label>
                        <input
                            className={styles.input} 
                            type="text" 
                            name="image"
                            onChange={handleChange}
                            value={state.image}
                        />
                        {error.image && (
                            <p className={styles.danger}>{error.image}</p>
                        )}
                    </div>
                    <div className={styles.inputContainer}>
                        <label>Fecha de lanzamiento</label>
                        <input
                            className={styles.input} 
                            type="date" 
                            name="releaseDate"
                            onChange={handleChange}
                            value={state.releaseDate}
                        />
                        {error.releaseDate && (
                            <p className={styles.danger}>{error.releaseDate}</p>
                        )}
                    </div>
                    <div className={styles.inputContainer}>
                        <label>Rating</label>
                        <input 
                            className={styles.input} 
                            type="number" 
                            name="rating"
                            onChange={handleChange}
                            value={state.rating}
                            min={1}
                            max={5}
                        />
                        {error.rating && (
                            <p className={styles.danger}>{error.rating}</p>
                        )}
                    </div>
                    <div className={styles.inputContainer}>
                        <label>Genero</label>
                        <select 
                            className={styles.input} 
                            name="genresId"
                            onChange={handleChange}
                            value={state.genresId}
                        >
                            {genres.map(({name, id}) => (
                                <option key={id} value={id}>{name}</option>
                            ))}
                        </select>
                    </div>
                    <div className={styles.buttonsContainer}>
                        <Button text="Guardar" onClick={handleSubmit}/>
                        <ButtonLink text="Cancelar" link="/home"/>
                    </div>
                </div>
                )}
            </div>
        </div>
    )
}