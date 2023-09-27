'use client'
import styles from './DownloadButton.module.css'

const DownloadButton = (props) => {

    function handleClick() {

        // Create a URL for the Blob
        const pdfUrl = `/pdfs/${props.location}`;

        // Create a temporary link and simulate a click to trigger the download
        const downloadLink = document.createElement('a');
        downloadLink.href = pdfUrl;
        downloadLink.download = props.location; // Replace 'example.pdf' with your desired file name
        document.body.appendChild(downloadLink);
        downloadLink.click();

        // Clean up the URL object after the download is initiated
        URL.revokeObjectURL(pdfUrl);
    }

    return(
        <button onClick={handleClick} className={styles.downloadButton}>
            Download PDF
        </button>
    )
}
export default DownloadButton;