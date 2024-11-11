import "./Dashboard.css";
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

function Dashboard() {
    const [suburbs, setSuburb] = useState([]);
    const [selectedSuburb, setSelectedSuburb] = useState("");
    const [desc, setDesc] = useState("");
    const [selectedOffences, setSelectedOffences] = useState([]);
    const [startDate, setStartDate] = useState("");
    const [cameraTypes, setCameraTypes] = useState([]);
    const [selectedCameras, setSelectedCameras] = useState([]);
    const [locationIds, setLocationIds] = useState(null);
    const [expiations, setExpiations] = useState([]);
    const [selectedExpiations, setSelectedExpiations] = useState([]);
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
        }
    }, [navigate]);

    useEffect(() => {
        if (selectedSuburb) {
            console.log("Fetching camera types for suburb:", selectedSuburb);
            fetch(`http://localhost:5147/api/Get_ListCamerasInSuburb?suburb=${selectedSuburb}`)
                .then(response => response.json())
                .then(data => {
                    if (Array.isArray(data)) {
                        console.log(data);
                        const uniqueCameraTypes = Array.from(
                            new Map(data.map(item => [item.cameraType1, item])).values()
                        ).map(camera => ({
                            value: camera.cameraTypeCode,
                            label: camera.cameraType1
                        }));
                        setCameraTypes(uniqueCameraTypes);
                    } else {
                        console.error("Unexpected data format:", data);
                        setCameraTypes([]);
                    }
                })
                .catch(err => console.error("Error fetching camera types:", err));
            console.log(`http://localhost:5147/api/Get_ListCamerasInSuburb=${selectedSuburb}`);
        }
    }, [selectedSuburb]);

    useEffect(() => {
        if (desc) {
            fetch(`http://localhost:5147/api/Get_SearchOffencesByDescription?searchTerm=${desc}`)
                .then(response => response.json())
                .then(data => {
                    console.log(data);

                    setSelectedOffences(data.map(o => o.offenceCode));
                })
                .catch(err => console.log(err));
        };
    }, [desc]);
    // Check if the  selected offenc list is updated
    useEffect(() => {
        console.log("Updated selected offences:", selectedOffences);
    }, [selectedOffences]);

    useEffect(() => {
        if (selectedSuburb) {
            // Map selectedCameras to repeated query parameters
            const cameraTypeParams = selectedCameras.map(code => `cameraTypeCodes=${encodeURIComponent(code)}`).join("&");
            const url = `http://localhost:5147/api/Get_ListLocationIds?suburb=${selectedSuburb}` +
                (cameraTypeParams ? `&${cameraTypeParams}` : "");

            console.log("Fetch URL:", url); // For debugging

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    console.log("Fetched locationIds:", data);
                    setLocationIds(data);
                })
                .catch(err => console.error("Error fetching location IDs:", err));
        }
    }, [selectedSuburb, selectedCameras]);

    function onSubmit(e) {
        e.preventDefault();

        const unixTime = startDate ? Math.floor(new Date(startDate).getTime() / 1000) : null;
        const offences = selectedOffences && selectedOffences.length > 0
            ? selectedOffences.map(o => `offenceCodes=${encodeURIComponent(o)}`).join("&") : null;

        if (locationIds && locationIds.length > 0) {
            locationIds.forEach(locationId => {
                // If no cameraTypes are selected, use the list of camera types fetched for the suburb
                const cameraTypesToUse = selectedCameras.length > 0 ? selectedCameras : cameraTypes.map(camera => camera.value);

                cameraTypesToUse.forEach(camera => {
                    let url = `http://localhost:5147/api/Get_ExpiationsForLocationId?locationId=${locationId}`;
                    if (camera) {
                        url += `&cameraTypeCode=${camera}`;
                    }
                    if (unixTime) {
                        url += `&startTime=${unixTime}`;
                    }
                    if (offences) {
                        url += `&${offences}`;
                    }

                    fetch(url)
                        .then(response => {
                            if (!response.ok) {
                                throw new Error(`HTTP error! status: ${response.status}`);
                            }
                            return response.json();
                        })
                        .then(data => {
                            let totalFeeAmt = 0;
                            let expiationCount = 0;

                            data.forEach(exp => {
                                if (exp.totalFeeAmt) {
                                    totalFeeAmt += exp.totalFeeAmt;
                                    expiationCount++;
                                }
                            });
                            const cameraTypeName = cameraTypes.find(c => c.value === camera)?.label || camera;

                            const modifiedData = {
                                locationId: locationId,
                                cameraType: cameraTypeName,
                                expiationCount: expiationCount,
                                totalFeeAmt: totalFeeAmt
                            };
                            setExpiations(prevData => [...prevData, modifiedData]);

                            // Log the modified data to verify
                            console.log("Modified data added to state:", modifiedData);
                        })
                        .catch(err => { console.error("Error fetching expiations:", err); });
                });
            });
        }
    }


    useEffect(() => {
        console.log("Expiations: ", expiations)
    }, [expiations])

    function handleSuburbChange(e) {
        setSelectedSuburb(e.target.value);
    }

    function handleSelectedCameras(e) {
        const { value } = e.target;

        setSelectedCameras(prevSelected =>
            prevSelected.includes(value)
                ? prevSelected.filter(item => item !== value)
                : [...prevSelected, value]
        );
    }
    // Check if the  selected camera list is updated
    useEffect(() => {
        console.log("Updated selected camera types:", selectedCameras);
    }, [selectedCameras]);

    function handleStartDateChange(e) {
        setStartDate(e.target.value);
    }

    function handleOffenceSearch(e) {
        setDesc(e.target.value);
    }

    function handleCheckboxChange(locationId) {
        setSelectedExpiations(prevSelected => {
            if (prevSelected.includes(locationId)) {
                return prevSelected.filter(id => id !== locationId);
            }
            if (prevSelected.length >= 2) {
                alert("You can only select 2 locations.");
                return prevSelected;
            }
            return [...prevSelected, locationId];
        });
    }

    function handleLogout() {
        localStorage.setItem("isAuthenticated", "false");
    }

    return (
        <div className="container">
            <div className="d-flex justify-content-between align-items-center text-light bg-gradient p-2 my-2 border rounded">
                <h2>Welcome to MPDC Dashboard!</h2>
                <p className="mb-0">
                    <Link to="/Login" onClick={handleLogout} className="text-light">Log out</Link>
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
                        <div className="dropdown">
                            <button className="btn btn-secondary dropdown-toggle" type="button" id="checkboxDropdown"
                                onClick={() => document.getElementById("cameraTypeDropdown").classList.toggle("show")}>
                                Camera Types
                            </button>
                            <ul id="cameraTypeDropdown" className="dropdown-menu p-2" aria-labelledby="checkboxDropdown">
                                {cameraTypes.map((camera, index) => (
                                    <li key={index}>
                                        <label className="dropdown-item">
                                            <input type="checkbox" value={camera.value} className="me-2" onChange={handleSelectedCameras} />{camera.label}
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="col-3 mb-3">
                        <input type="text" name="searchText" className="form-control" placeholder="Search Offences" value={desc} onChange={handleOffenceSearch} />
                    </div>
                    <div className="col-3 mb-3 d-flex align-items-center">
                        <label htmlFor="startDate" className="form-label date-label">From Date</label>
                        <input type="date" id="startDate" className="form-control date-input" value={startDate} onChange={handleStartDateChange} />
                    </div>
                    <div className="col-auto">
                        <button type="submit" className="btn btn-primary">Search</button>
                    </div>
                </form>
            </div>

            {/* Table to display expiations */}
            <div className="row">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Select</th>
                            <th>Location ID</th>
                            <th>Camera Type</th>
                            <th>Expiation Count</th>
                            <th>Total Fee</th>
                        </tr>
                    </thead>
                    <tbody>
                        {expiations.map((exp, index) => (
                            <tr key={index}>
                                <td>
                                    <input type="checkbox" checked={selectedExpiations.includes(exp.locationId)} onChange={() => handleCheckboxChange(exp.locationId)} />
                                </td>
                                <td>{exp.locationId}</td>
                                <td>{exp.cameraType}</td>
                                <td>{exp.expiationCount}</td>
                                <td>${exp.totalFeeAmt}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Display selected location IDs */}
            <div>
                <h3>Selected Location IDs</h3>
                <p>{selectedExpiations.join(", ")}</p>
            </div>

            <Link to="/Report" className="btn btn-success">Show Report</Link>
        </div>
    )
}

export default Dashboard;