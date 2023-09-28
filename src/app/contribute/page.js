'use client'
import styles from './page.module.css'
import TopNav from "../../../components/TopNav";
import globals from '../globals.css';
import PaperEntryForm from "../../../components/Forms/PaperEntryForm";

export default function Contribute() {
    return (
        <main className={globals.main}>
            <TopNav/>
            <div className={styles.page}>
                <div>
                    <PaperEntryForm/>
                </div>
            </div>
        </main>
    )
}