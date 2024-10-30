import "./Dashboard.css";
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

function Dashboard() {
    const [suburbs, setSuburb] = useState([]);
    const [selectedSuburb, setSelectedSuburb] = useState("");
    const [desc, setDesc] = useState("");
    const [startDate, setStartDate] = useState("");
    const [checkbox, setCheckbox] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if the user is authenticated
        const isAuthenticated = localStorage.getItem("isAuthenticated");
        if (isAuthenticated != "true") {
            // If not authenticated, redirect to the login page
            navigate("/Login");
        } else {
            fetch(`http://localhost:5147/api/Get_ListCameraSuburbs`, {
                method: "GET",
                headers: { "Content-Type": "application/json", }
            }).then(response => response.json())
                .then(data => setSuburb(data))
                .catch(err => { console.log(err); });
            fetch(`http://localhost:5147/api/Get_`)
        }
    }, [navigate]);

    function onSubmit(e) {
        e.preventDefault();
    }

    function handleSuburbChange(e) {
        setSelectedSuburb(e.target.value);
    }

    function handleStartDateChange(e) {
        setStartDate(e.target.value);
    }

    function handleCheckboxChange(e) {
        setCheckbox(e.target.checked);
    }

    function handleOffenceSearch(e) {
        setDesc(e.target.value);
    }

    function handleLogout() {
        localStorage.setItem("isAuthenticated", "false");
    }

    return (
        <div class="container">
            <div class="d-flex justify-content-between align-items-center text-light bg-gradient p-2 my-2 border rounded">
                <h2>Welcome to MPDC Dashboard!</h2>
                <p class="mb-0">
                    <Link to="/Login" onClick={handleLogout} class="text-light">Log out</Link>
                </p>
            </div>
            <div className="row">
                <form method="post" onSubmit={onSubmit} className="row justify-content-left mb-4 p-3">
                    <div className="col-3 mb-3">
                        <select id="SuburbList" className="form-control" placeholder="Select a suburb" value={selectedSuburb} onChange={handleSuburbChange} required>
                            <option value="" disabled>Select a suburb</option>
                            {suburbs.map((suburb, index) => (
                                <option key={index} value={suburb}>{suburb}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-3 mb-3">
                        <input type="text" name="searchText" className="form-control" placeholder="Search Offences" value={desc} onChange={handleOffenceSearch}/>
                    </div>
                    <div className="col-3 mb-3 d-flex align-items-center">
                        <label htmlFor="startDate" className="form-label date-label">From Date</label>
                        <input type="date" id="startDate" className="form-control date-input" value={startDate} onChange={handleStartDateChange} />
                    </div>
                    {/*<div className="col-2 mb-3 d-flex align-items-center">*/}
                    {/*    <div className="form-check me-2">*/}
                    {/*        <input type="checkbox" className="form-check-input" value={checkbox} onChange={handleCheckboxChange} />*/}
                    {/*        <label className="form-check-label">Camera Type</label>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    <div className="col-3 mb-3">
                        <div className="dropdown">
                            <button
                                className="btn btn-secondary dropdown-toggle"
                                type="button"
                                id="checkboxDropdown"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                Select Options
                            </button>
                            <ul className="dropdown-menu p-2" aria-labelledby="checkboxDropdown">
                                {suburbs.map((option, index) => (
                                    <li key={index}>
                                        <label className="dropdown-item">
                                            <input
                                                type="checkbox"
                                                value={option.value}
                                                // checked={selectedOptions.includes(option.value)}
                                                // onChange={() => handleOptionChange(option.value)}
                                                className="me-2"
                                            />
                                            {option.label}
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="col-auto">
                        <button type="submit" className="btn btn-primary">Search</button>
                    </div>
                </form>
            </div>
            <Link to="/Report" className="btn btn-success">Show Report</Link>
        </div>
    )
}

export default Dashboard;