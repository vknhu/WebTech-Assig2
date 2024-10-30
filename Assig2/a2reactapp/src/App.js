import { Link, Outlet } from "react-router-dom";
import "./App.css";

function App() {
    return (
        <div className="App container">
            <nav class="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-light border-bottom box-shadow mb-3">
                <div class="container-fluid">
                    <Link className="navbar-brand" to="/Login">Expiations SA!</Link>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target=".navbar-collapse" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="navbar-collapse collapse d-sm-inline-flex justify-content-between">
                        <div class="navbar-nav flex-grow-1">
                            <Link className="nav-link" to="/About">About</Link>
                            <Link className="nav-link" to="/Login">Login</Link>
                            <Link className="nav-link" to="/Register">Register</Link>
                            <Link className="nav-link" to="/Dashboard">Dashboard</Link>
                            <Link className="nav-link" to="/Report">Report</Link>
                        </div>
                    </div >
                </div >
            </nav >
            <Outlet />
        </div >
    );
}

export default App;
