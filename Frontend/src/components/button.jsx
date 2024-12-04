import styles from './button.module.scss'
const Button = (props) =>{
    const { type,children , ...rest} = props
    return (
        <div className={`${styles.buttonWrapper}`}>
            <button className={styles.customButton} type={type} {...rest}>
                {children}
            </button>
        </div>
    )
}
export default Button;