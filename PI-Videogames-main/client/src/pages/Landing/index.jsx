import React from "react";
import { ButtonLink } from "../../components/ButtonLink";
import styles from "./styles.module.css";

export const Landing = () => {
    return (
        <div className={styles.landing}>
            <h1 className={styles.title}>Bienvenidos</h1>
            <ButtonLink text="INGRESAR" link="/home"/>
        </div>
    )
}