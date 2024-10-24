import "./About.css";
import { Link } from "react-router-dom";

function About() {
    return (
        <div class="container">
        <div class="text-dark bg-gradient p-2 my-2 border rounded">
            <h2>Expiation Data About</h2>
        </div>
            <div class="row justify-content-left">
                <div class="row">
                    <p>
                        Welcome to the world of road rules and Expiations! Your every move is being watched - at every red light,
                        as you pass the speed limit, and don't forget to give-way at that intersection!. But what happens when drivers
                        push their luck? They end up in the SA Gov Expiations DB, a treasure trove of every traffic slip-up and criminal
                        act that happens on SA roads.</p>
                    <p>
                        From tracking speeding trends to uncovering the busiest intersections for red light runners, your job is
                        to transform this raw data into insights and demonstrate your understanding of modern web development along
                        the way. So buckle up—this is one road trip you won’t want to miss!
                    </p>
                    <p>
                        The original data sets and their explanations can be found on Data SA's Website':
                    </p>
                    <ul>
                        <li>
                            <a href="https://data.sa.gov.au/" target="_blank">Data SA</a>
                        </li>
                        <li>
                            <a href="https://data.sa.gov.au/data/dataset/expiation-notice-system-data" target="_blank">Expiation Notice System Data</a>
                        </li>
                    </ul>
                    <h3>Assignment:</h3>
                    <p>
                        This assignment focuses on utilizing React, API's, Models, and Graphs to present expiation data collected by the SA Government.
                        With this project, you will gain experience in designing and displaying React elements to present data sets using Javascript & API calls.
                    </p>
                    <ul>
                        <li>The API endpoints are in Assig2/api/EndpointController.cs</li>
                        <li>Test them out them via the Swagger link.</li>
                        <li>You can also test them via Get at localhost:[port]/api/[Endpoint]?querystring</li>
                        <li>So, to access the Login endpoint, go to localhost:[port]/api/Login?userName=foo&passwordhash=bar</li>
                        <li>API responses are in JSON</li>
                        <li>React has been installed via npx create-react-app in Assig2/a2reactapp/</li>
                        <li>But I deleted the `node_modules` to save space, so you'll have to navigate back to Assig2/a2reactapp/ and `npm install`</li>
                        <li>Make sure you adjust your database connection in Assig2/appsettings.json</li>

                    </ul>
                </div>
            </div>
        </div>
    )
}

export default About;