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

            <h3>1. Introduction</h3>
            <p>This report provides an analysis of two recommended locations in South Australia for installing
                Mobile Phone Detection Cameras (MPDCs) based on expiation data from the SAPOL Expiations database.
                The chosen locations are Anzac Highway and South Road, located in the same suburb but on different roads.
                The analysis below includes key statistics such as the total number of offences, total demerits,
                total fees collected, average demerits and fees per day, and offence distribution throughout the week.</p>

            <h3>2. Site Identification</h3>
            <div className="location-container">
                <div className="location-item">
                    <p>Location 1: Anzac Highway, Adelaide (locationId: 65)</p>
                    <img src="/Anzac HWY Adelaide.png" alt="Google Maps Screenshot of Anzac Highway, Adelaide" />
                </div>
                <div className="location-item">
                    <p>Location 2: South Road, Adelaide (locationId: 2164)</p>
                    <img src="/South Road Adelaide.png" alt="Google Maps Screenshot of South Road, Adelaide" />
                </div>
            </div>
            <ul>
                <li>Suburb: Adelaide</li>
                <li>Camera Type: Mobile Camera</li>
                <li>Start Date: 01/01/2024</li>
            </ul>

            <div className="image-container">
                <img src="/Filters.png" alt="Search options screenshot" className="site mb-2" />
                <img src="/Locations.png" alt="Returned locations" className="mb-2" style={{ height: '600px', objectFit: 'cover' }} />
            </div>

            <p>
                Explanation: The data reveals a significant disparity in expiation records, with some locations having no expiations,
                while others report hundreds. For this report, locations 65 and 2164 were selected to highlight the difference in
                expiation counts and total fees. Despite being in the same suburb and having the same camera type, these locations
                show notable variations, providing an opportunity to analyze the factors contributing to such discrepancies and gain
                insights into improving enforcement and traffic safety.
            </p>

            <h3>3. Analysis and Justification</h3>
            <p>Overall:</p>
            <div className="row">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Property</th>
                            <th>Anzac Highway</th>
                            <th>South Road</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Total Offences</td>
                            <td>{data1 ? data1.totalOffencesCount : 'N/A'}</td>
                            <td>{data2 ? data2.totalOffencesCount : 'N/A'}</td>
                        </tr>
                        <tr>
                            <td>Total Demerits</td>
                            <td>{data1 ? data1.totalDemerits : 'N/A'}</td>
                            <td>{data2 ? data2.totalDemerits : 'N/A'}</td>
                        </tr>
                        <tr>
                            <td>Total Fees</td>
                            <td>{data1 ? `$${data1.totalFeeSum}` : 'N/A'}</td>
                            <td>{data2 ? `$${data2.totalFeeSum}` : 'N/A'}</td>
                        </tr>
                        <tr>
                            <td>Average Demerits per Day</td>
                            <td>{data1 ? data1.avgDemeritsPerDay.toFixed(2) : 'N/A'}</td>
                            <td>{data2 ? data2.avgDemeritsPerDay.toFixed(2) : 'N/A'}</td>
                        </tr>
                        <tr>
                            <td>Average Fee per Day</td>
                            <td>{data1 ? `$${data1.avgFeePerDay.toFixed(2)}` : 'N/A'}</td>
                            <td>{data2 ? `$${data2.avgFeePerDay.toFixed(2)}` : 'N/A'}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="graph-container">
                <svg id="graph1"></svg>
                <svg id="graph2"></svg>
            </div>
            <p>
                The two selected MPDC sites, Anzac Highway and South Road, have been carefully identified based on their notably
                high rates of traffic offences and the potential for implementing more effective traffic safety measures. Anzac
                Highway has recorded a total of 55 offences, averaging 0.64 demerits per day. In contrast, South Road presents a
                significantly higher offence count, totaling 526 offences with an average of 6.07 demerits per day. This stark
                difference between the two sites highlights a critical need for more robust monitoring and enforcement measures
                on South Road, where the frequency of violations is substantially higher.
            </p>
            <p>
                Analyzing offence patterns further reveals that certain days of the week are particularly problematic. South Road,
                for example, experiences its peak in offences on Tuesdays, with an alarming 114 reported violations, suggesting that
                Tuesdays may see heavier traffic or riskier driving behavior. Meanwhile, Anzac Highway experiences a notable spike
                on Sundays, with 20 offences recorded, potentially due to different traffic dynamics, such as weekend recreational
                travel. These insights are vital for optimizing the timing and placement of enforcement cameras, ensuring maximum
                effectiveness in capturing violations and enhancing traffic compliance.
            </p>
            <p>
                Moreover, several road design elements must be considered when planning the installation of MPDC units at these
                locations. Both Anzac Highway and South Road feature critical infrastructure, including intersections, pedestrian
                crossings, and unique traffic flow patterns, which contribute to their high traffic volume and associated risks.
                These factors underscore the importance of strategic camera positioning to monitor key risk areas and improve
                safety outcomes. Given the heavy traffic and complex road layouts, both locations are ideal candidates for MPDC
                installations, which can play a pivotal role in reducing traffic violations and promoting safer driving behavior.
            </p>

            <h3>4. Summary</h3>
            <p>
                In conclusion, the selection of SAPOL data and sites for analysis has been a critical step in enhancing our
                understanding of crime patterns and resource allocation within the community. Through careful consideration of
                various factors, we have established a robust framework for data selection that prioritizes relevance, accuracy,
                and accessibility.
            </p>
            <Link to="/Dashboard" className="btn btn-success mb-5">Back to Dashboard</Link>
        </div>

    )
}

export default Report;