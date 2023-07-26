'use client'
import styles from './DownloadButton.module.css'

const DownloadButton=() => {

    function handleClick() {
        // Random string of data, TODO: FIGURE OUT HOW TO STORE THE PDF (MONGODB OR EXTERNALLY)
        const pdfData = 'sample-pdf-data';

        // Convert the PDF data to a Blob
        const pdfBlob = new Blob([pdfData], {type: 'application/pdf'});

        // Create a URL for the Blob
        const pdfUrl = URL.createObjectURL(pdfBlob);

        // Create a temporary link and simulate a click to trigger the download
        const downloadLink = document.createElement('a');
        downloadLink.href = pdfUrl;
        downloadLink.download = 'example.pdf'; // Replace 'example.pdf' with your desired file name
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