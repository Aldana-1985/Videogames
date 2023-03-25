import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGames, getGenres } from "../../redux/actions";

export const Home = () => {

    const dispatch = useDispatch();
    const {games, genres} = useSelector((state) => state);
    console.log('algo', {games, genres});

    useEffect(() => {
        dispatch(getGames());
        dispatch(getGenres())
    },[dispatch])

    return (
        <div>
            <h1>HOME</h1>
        </div>
    )
}