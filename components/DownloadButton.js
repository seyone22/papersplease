'use client'
import styles from './DownloadButton.module.css'

const DownloadButton=() => {

    function handleClick() {

    }

    return(
        <button onClick={handleClick} className={styles.downloadButton}>
            Download PDF
        </button>
    )
}
export default DownloadButton;