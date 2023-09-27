import styles from './page.module.css'
import LoginForm from '../../../components/Auth/LoginForm'

export default async function login() {

    return (
        <div className={styles.main}>
            <LoginForm/>
        </div>
    )
}