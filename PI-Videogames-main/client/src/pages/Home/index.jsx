import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGames, getGenres } from "../../redux/actions";
import { Search } from "../../components/Search";
import { Card } from "../../components/Card";

export const Home = () => {

    const dispatch = useDispatch();
    const {games, genres} = useSelector((state) => state);

    console.log('algo', games, genres);

    useEffect(() => {
        dispatch(getGames());
        dispatch(getGenres())
    },[dispatch])

    return (
        <div>
            <Search />
            {games.games && games.games.map((props) => (
                <Card key={props.id} {...props}/>
            ))}
        </div>
    )
}