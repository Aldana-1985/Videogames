import styles from "./styles.module.css"

export const Button = ({text, onClick}) => {
    return (
        <button 
            className={styles.button} 
            onClick={onClick}
        >
            {text}
        </button>
    )
}