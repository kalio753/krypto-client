import "./App.css"
import { Footer, Navbar, Services, Welcome } from "./components"
import { MoralisProvider } from "react-moralis"

const App = () => {
    return (
        <MoralisProvider initializeOnMount={false}>
            <div className="min-h-screen">
                <div className="gradient-bg-welcome">
                    <Navbar />
                    <Welcome />
                </div>
                <Services />
                {/* <Transaction /> */}
                <Footer />
            </div>
        </MoralisProvider>
    )
}

export default App
