import "./Report.css";
import { Link } from "react-router-dom";

function Report() {
    return (
        <div class="container">
            <div class="d-flex justify-content-between align-items-center text-light bg-gradient p-2 my-2 border rounded">
                <h2>MPDC Report</h2>
                <p class="mb-0">
                    <Link to="/Login" class="text-light">Log out</Link>
                </p>
            </div>
            <Link to="/Dashboard" class="btn btn-success">Back to Dashboard</Link>
        </div>

    )
}

export default Report;