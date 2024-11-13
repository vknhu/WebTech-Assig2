import "./Report.css";
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import * as d3 from "d3";

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

    useEffect(() => {
        if (data1 && data2) {
            drawD3Graphs();
        }
    }, [data1, data2]);

    function drawD3Graphs() {
        d3.select("#graph1").selectAll("*").remove();
        d3.select("#graph2").selectAll("*").remove();

        const days = Object.keys(data1.expiationDaysOfWeek);
        const anzacCounts = Object.values(data1.expiationDaysOfWeek);
        const southCounts = Object.values(data2.expiationDaysOfWeek);

        const svgWidth = 600;
        const svgHeight = 400;
        const margin = { top: 35, right: 30, bottom: 15, left: 40 };

        const xScale = d3.scaleBand()
            .domain(days)
            .range([margin.left, svgWidth - margin.right])
            .padding(0.1);

        const yScale = d3.scaleLinear()
            .domain([0, d3.max([...anzacCounts, ...southCounts])])
            .range([svgHeight - margin.bottom, margin.top]);

        // Create Anzac Highway Bar Chart
        const svg1 = d3.select("#graph1")
            .attr("width", svgWidth)
            .attr("height", svgHeight);

        svg1.selectAll(".anzac-bar")
            .data(anzacCounts)
            .enter()
            .append("rect")
            .attr("class", "anzac-bar")
            .attr("x", (d, i) => xScale(days[i]))
            .attr("y", d => yScale(d))
            .attr("width", xScale.bandwidth())
            .attr("height", 0)
            .style("fill", "transparent")
            .transition().duration(500)
            .delay((d, i) => i * 100)
            .attr("y", d => yScale(d))
            .attr("height", d => svgHeight - margin.bottom - yScale(d))
            .style("fill", (d, i) => `rgb(0, 0, ${i * 30 + 100})`);

        const xAxis1 = svg1.append("g")
            .attr("transform", `translate(0, ${svgHeight - margin.bottom})`)
            .call(d3.axisBottom(xScale));

        xAxis1.selectAll("text")
            .attr("transform", "rotate(-45)")
            .attr("text-anchor", "end")
            .attr("dx", "-0.5em")
            .attr("dy", "0.5em");

        svg1.append("g")
            .attr("transform", `translate(${margin.left}, 0)`)
            .call(d3.axisLeft(yScale));

        svg1.selectAll(".anzac-label")
            .data(anzacCounts)
            .enter()
            .append("text")
            .attr("class", "anzac-label")
            .attr("x", (d, i) => xScale(days[i]) + xScale.bandwidth() / 2)
            .attr("y", d => yScale(d) - 5)
            .attr("text-anchor", "middle")
            .text(d => d)
            .attr("fill", "black");

        // Create South Road Bar Chart
        const svg2 = d3.select("#graph2")
            .attr("width", svgWidth)
            .attr("height", svgHeight);

        svg2.selectAll(".south-bar")
            .data(southCounts)
            .enter()
            .append("rect")
            .attr("class", "south-bar")
            .attr("x", (d, i) => xScale(days[i]))
            .attr("y", d => yScale(d))
            .attr("width", xScale.bandwidth())
            .attr("height", 0)
            .style("fill", "transparent")
            .transition().duration(500)
            .delay((d, i) => i * 100)
            .attr("y", d => yScale(d))
            .attr("height", d => svgHeight - margin.bottom - yScale(d))
            .style("fill", (d, i) => `rgb(${i * 20 + 100}, 50, 0)`);

       const xAxis2 =  svg2.append("g")
            .attr("transform", `translate(0, ${svgHeight - margin.bottom})`)
            .call(d3.axisBottom(xScale));

        xAxis2.selectAll("text")
            .attr("transform", " rotate(-45)")
            .attr("text-anchor", "end")
            .attr("dx", "-0.5em")
            .attr("dy", "0.5em");

        svg2.append("g")
            .attr("transform", `translate(${margin.left}, 0)`)
            .call(d3.axisLeft(yScale));

        svg2.selectAll(".south-label")
            .data(southCounts)
            .enter()
            .append("text")
            .attr("class", "south-label")
            .attr("x", (d, i) => xScale(days[i]) + xScale.bandwidth() / 2)
            .attr("y", d => yScale(d) - 5)
            .attr("text-anchor", "middle")
            .text(d => d)
            .attr("fill", "black");
    }

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
            <p>This report provides an analysis of two recommended locations in South Australia for installing
                Mobile Phone Detection Cameras (MPDCs) based on expiation data from the SAPOL Expiations database.
                The chosen locations are Anzac Highway and South Road, located in the same suburb but on different roads.
                The analysis below includes key statistics such as the total number of offences, total demerits,
                total fees collected, average demerits and fees per day, and offence distribution throughout the week.</p>
                    
            <div className="location-container">
                <div className="location-item">
                    <img src="/Anzac HWY Adelaide.png" alt="Google Maps Screenshot of Anzac Highway, Adelaide" />
                    <p>Location 1: Anzac Highway, Adelaide (locationId: 65)</p>
                </div>
                <div className="location-item">
                    <img src="/South Road Adelaide.png" alt="Google Maps Screenshot of South Road, Adelaide" />
                    <p>Location 2: South Road, Adelaide (locationId: 2164)</p>
                </div>
            </div>
            <h3>Site Identification</h3>
            <ul>
                <li>Suburb: Adelaide</li>
                <li>Camera Type: Mobile Camera</li>
                <li>Start Date: 01/01/2024</li>
            </ul>
            <img src="/Filters.png" alt="Search options screenshot" className="site mb-2"/>
            
            <p>Matching locations:</p>
            <img src="/Locations.png" alt="Returned locations" className="mb-2" />
            <p>
                Explanation: The data reveals that some locations record no expiations, while others have hundreds. 
                For this report, locations 65 and 2164 were selected to illustrate the significant gap in expiation counts and total fees.
                This allows us to analyze why such differences exist between two locations with the same suburb and camera type.
            </p>

            <h3>Data visualization</h3>
            <div className="graph-container">
                <svg id="graph1"></svg>
                <svg id="graph2"></svg>
            </div>
            <h3>Analysis and Justification</h3>
            <p>
                The two selected MPDC sites, Anzac Highway and South Road, have been identified based on their high rates of offences and the potential for improved traffic safety measures.
                Anzac Highway has a total of 55 offences with an average of 0.64 demerits per day, while South Road shows a significantly higher number of 526 offences and an average of 6.07 demerits per day.
                This stark difference indicates that South Road may require more stringent monitoring and enforcement due to its higher incidence of violations.
            </p>
            <p>
                Furthermore, the data shows that specific days of the week have higher offence counts. For instance, South Road experiences a peak on Tuesdays (114 offences), while Anzac Highway has a notable spike on Sundays (20 offences).
                This information is crucial for determining the optimal times for camera placement to maximize enforcement effectiveness.
            </p>
            <p>
                Additionally, road design considerations, such as the presence of intersections, pedestrian crossings, and traffic flow patterns, should be taken into account.
                Both locations are heavily trafficked, making them prime candidates for MPDC installations to enhance road safety and reduce violations.
            </p>
            <Link to="/Dashboard" className="btn btn-success mb-5">Back to Dashboard</Link>
        </div>

    )
}

export default Report;