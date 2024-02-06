import logo from "./logo.svg";
import "./App.css";
import Header from "./Components/Header/Header";
import ContactsList from "./Components/ContactsList/ContactsList";

function App() {
    return (
        <div className="App">
            <Header />
            <ContactsList />
        </div>
    );
}

export default App;
