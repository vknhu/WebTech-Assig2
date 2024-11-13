import "./Report.css";
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

function Report() {
    const navigate = useNavigate();
    //const offenceCodes = ["A001", "A002", "A003", "A004", "C801", "C802", "C803", "C804"]
    //const offences = offenceCodes.map(o => `${encodeURIComponent(o)}`).join("&");
    const startDate = Math.floor(new Date('2024-01-01T00:00:00Z').getTime() / 1000);
    console.log(startDate);

    const [data1, setData1] = useState();
    const [data2, setData2] = useState();
    const locations = [{ id: 65, setData: setData1 }, { id: 2164, setData: setData2 }]

    useEffect(() => {
        // Check if the user is authenticated
        const isAuthenticated = localStorage.getItem("isAuthenticated");
        if (isAuthenticated != "true") {
            // If not authenticated, redirect to the login page
            navigate("/Login");
        }
    }, [navigate]);

    useEffect(() => {
        locations.forEach(({ id, setData }) => {
            fetch(`http://localhost:5147/api/Get_ExpiationStatsForLocationId?locationId=${id}&cameraTypeCode=M&startTime=${startDate}`)
                .then(response => response.json())
                .then(data => {
                    console.log(`Data for location ID ${id}:`, data);
                    setData(data);
                })
                .catch(err => console.log(err));
        });
    }, [startDate]);

    // Test fetched data
    useEffect(() => {
        console.log("Anzac: ", data1, "\nSouth: ", data2)
    })

    function handleLogout() {
        localStorage.setItem("isAuthenticated", "false");
    }

    return (
        <div class="container">
            <div class="d-flex justify-content-between align-items-center text-light bg-gradient p-2 my-2 border rounded">
                <h2>MPDC Report</h2>
                <p class="mb-0">
                    <Link to="/Login" onClick={handleLogout} class="text-light">Log out</Link>
                </p>
            </div>
            <h3>Introduction</h3>
            <p>This report outlines two priority locations for the installation of Mobile Phone Detection Cameras (MPDCs) based on an analysis
                of expiation data obtained from the SAPOL database. The locations were selected using the MPDC Dashboard in the web application,
                which features a variety of search and filtering mechanisms for optimal site identification. Below, I explain the process used
                to determine these locations, along with relevant data visualizations to support the recommendations.</p>
            <h3>Selected Location</h3>
            <ul>
                <ol>Location1: Anzac Highway, Adelaide (locationId: 65)</ol>
                <ol>LocationId:</ol>
            </ul>
            <p>filters and search options used in the dashboard to identify these sites</p>
            <h3>Visual Evidence and Data Representation</h3>
            <div className="row">
                <img src="" placeholder="Google Maps Screenshot of location 1" />
                <img src="" placeholder="Google Maps Screenshot of location 2" />
            </div>
            <h3>Data visualization</h3>
            <div className="row">
                <p>Graph 1</p>
                <p>Graph 2</p>
            </div>
            <h3>Explanation for location selection</h3>
            <Link to="/Dashboard" class="btn btn-success">Back to Dashboard</Link>
        </div>

    )
}

export default Report;