import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
//import { useHistory } from "react-router-dom"
import { Button } from "../../components/Button"
import { ButtonLink } from "../../components/ButtonLink"
import { getGenres, createGames } from "../../redux/actions";
import styles from "./styles.module.css"

export const Form = () => {
    //const { push } = useHistory()
    const dispatch = useDispatch()
    const { genres } = useSelector(state => state)
    const [state, setState] = useState({
        name: "",
        description: "",
        image: "",
        releaseDate: "",
        rating: 1,
        platforms: [],
        genresId: []
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
    
    const validateInput = () => {
        let isValid = true
        for(let name in state) {
            if(name === "rating") {
                if(parseInt(state[name]) > 5 || parseInt(state[name]) < 1) {
                    setError(prevState => ({
                        ...prevState,
                        [name]: "Debe ser un numero entre 1 y 5"
                    }))
                } 
            }
            if(state[name] === "") {
                isValid = false
                setError(prevState => ({
                    ...prevState,
                    [name]: "Requerido",
                }))
            } else {
                setError(prevState => ({
                    ...prevState,
                    [name]: ""
                }))
            }
        }
        return isValid
    }

    useEffect(() => {
       dispatch(getGenres()) 
    }, [dispatch])

    const handleChange = ({target}) => {
        if(target.name === "platforms" || target.name === "genresId") {
            return setState(prevState => ({
                ...prevState,
                [target.name]: [...prevState[target.name], target.value]
            }))
        }
        setState(prevState => ({
            ...prevState,
            [target.name]: target.value
        }))
        if(target.value === "") {
            setError(prevState => ({
                ...prevState,
                [target.name]: "Requerido"
            }))
        } else {
            setError(prevState => ({
                ...prevState,
                [target.name]: ""
            }))
        }  
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        const body = {
            ...state,
            rating: parseInt(state.rating)
        }
        if(validateInput()) {
            dispatch(createGames(body))
            alert("Guardado con exito")
            //push('/home')
            setState({
                name: "",
                description: "",
                image: "",
                releaseDate: "",
                rating: 1,
                platforms: [],
                genresId: []
            })
        
        }

        
    }

  

    return (
        <div className={styles.form}>
            <div className={styles.container}>
                {genres.length && (
                <form className={styles.formContainer} onSubmit={handleSubmit}>
                    <div className={styles.inputContainer}>
                        <label>Nombre</label>
                        <input 
                            className={styles.input} 
                            type="text" 
                            name="name"
                            onChange={handleChange}
                            value={state.name}
                            required
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
                            required
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
                            multiple
                            size={3}
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
                            multiple
                            size={3}
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
                </form>
                )}
            </div>
        </div>
    )
}