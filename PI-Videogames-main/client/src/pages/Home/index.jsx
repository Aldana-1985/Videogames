import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getFilteredGames, getGames, getGenres } from "../../redux/actions";
import { Search } from "../../components/Search";
import { Card } from "../../components/Card";
import { Select } from "../../components/Select";
import { Paginated } from "../../components/Paginated";
import { ORDEN, ORIGEN, RATING } from "../../utils/constants";

import styles from "../Home/styles.module.css";

export const Home = () => {

    const dispatch = useDispatch();
    const {games, genres} = useSelector((state) => state);
    const [genre, setGenre] = useState("none");
    const [origin, setOrigin] = useState("none");
    const [order, setOrder] = useState("none");
    const [ratingOrder, setRatingOrder] = useState("none");

    useEffect(() => {
        dispatch(getGames({}));
        dispatch(getGenres())
    },[dispatch])

    useEffect(() => {
        if(genre !== "none") {
            dispatch(getFilteredGames({genres: genre}))
        }
    }, [genre, dispatch])

    useEffect(() => {
        if(origin !== "none") {
            dispatch(getFilteredGames({origin}))
        }
    }, [origin, dispatch])

    useEffect(() => {
        if(order !== "none") {
            dispatch(getFilteredGames({order}))
        }
    }, [order, dispatch])

    useEffect(() => {
        if(ratingOrder !== "none") {
            dispatch(getFilteredGames({ratingOrder}))
        }
    }, [ratingOrder, dispatch])


    const handleChangeGenres = (e) => {
        setGenre(e.target.value)
    }

    const handleChangeOrigin = (e) => {
        setOrigin(e.target.value)
    }

    const handleChangeOrderByName = (e) => {
        setOrder(e.target.value)
    }

    const handlChangeRating = (e) => {
        setRatingOrder(e.target.value)
    }

    return (
        <div>
            <Search />
            <div className={styles.selectContainer}>
                <Select 
                    options={genres} 
                    title="Generos" 
                    onChange={handleChangeGenres} 
                    value={genre}
                />
                <Select 
                    options={ORIGEN} 
                    title="Origen" 
                    value={origin}
                    onChange={handleChangeOrigin}
                />
                <Select 
                    options={ORDEN} 
                    title="Orden" 
                    value={order}
                    onChange={handleChangeOrderByName}
                />
                <Select 
                    options={RATING} 
                    title="Rating" 
                    value={ratingOrder}
                    onChange={handlChangeRating}
                />
            </div>
            <div className={styles.homeContainer}>
                {games.games && games.games.map((props, i) => (
                    <Card key={i} {...props}/>
                ))}
            </div>
            {games.currentPage && (
            <div className={styles.page}>
                  <Paginated page={games.currentPage} totalPages={games.totalPages}/>
            </div>
            )}
        </div>
    )
}