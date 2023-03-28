import styles from "../Select/styles.module.css";

export const Select = ({ options, title, onChange, value }) => {
    
    return(
        <select 
            className={styles.selectContainer} 
            onChange={onChange}
            value={value}
        >
            <option value="none" disabled hidden>{title}</option>
            {options.map(({ id, name }) => (
                <option key={id} value={id}>{name}</option>
            ))}
        </select>
    )
}