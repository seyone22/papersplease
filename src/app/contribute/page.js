'use client'
import TopNav from "../../../components/TopNav";
import PaperEntryForm from "../../../components/Forms/PaperEntryForm";
import AuthGuard from "../../../components/AuthGuard";

export default function Contribute() {

    return (
        <AuthGuard>
            <div>
                <TopNav/>
                <main>
                    <PaperEntryForm/>
                </main>
            </div>
        </AuthGuard>
    )
}