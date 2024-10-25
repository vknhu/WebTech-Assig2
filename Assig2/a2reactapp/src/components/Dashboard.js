import "./Dashboard.css";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';

function Dashboard() {
    const [suburbs, setSuburb] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5147/api/Get_ListCameraSuburbs`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', }
        }).then(response => response.json())
            .then(data => setSuburb(data)
                .catch(err => {
                    console.log(err);
                })
            )
    }, []);

    function onSubmit(e) {
        e.preventDefault();
    }

    return (
        <div class="container">
            <div class="text-dark bg-gradient p-2 my-2 border rounded">
                <h2>MPDC Dashboard</h2>
            </div>
            <div class="row">
                <form method="post" onSubmit={onSubmit} className="row justify-content-start mb-3">
                    <div className="row justify-content-center-start mb-3">
                        <div className="col-3">
                            <input type="text" name="searchText" className="form-control" placeholder="Type your query" />
                        </div>
                        <div class="col-3">
                            <select id="SuburbList" placeholder="Suburbs">
                                {suburbs.map((suburb, index) => (
                                    <option key={index} value={suburb}>{suburb}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col text-left">
                            <button type="button" className="btn btn-primary" /*onClick={searchQuery}*/>Search</button>
                        </div>
                    </div>
                </form>
                <Link to="/Report" className="btn btn-success">Show Report</Link>
            </div>
        </div>
    )
}

export default Dashboard;