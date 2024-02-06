import "./Header.css";
import buildbot from "../../Assets/buildbot.png";

const Header = () => {
    return (
        <nav className="header-nav">
            <img src={buildbot} alt="" logo />
            <div>
                <h1>Contacts</h1>
            </div>
        </nav>
    );
};
export default Header;
