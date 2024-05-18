import Header from '../../components/Heading'
import './history.css'
import { Link } from "react-router-dom";

const attendanceRecords = [
    {
        date: '2024-04-02 13:03:21',
        status: 'Location Verified'
    },
    {
        date: '2024-04-02 13:03:21',
        status: 'Location Verified'
    },
    {
        date: '2024-04-02 13:03:21',
        status: 'Location Verified'
    }
];

const HistoryCard = ({ record }) => {
    return (
        <div className="history-card">
            <p>{record.date}</p>
            <p>{record.status}</p>
            <button class='share-button'>Share</button>
        </div>
    );
};


function History() {
    return (
        <div>
            <Header />
            <div id="heading-section">
                <h1>Past Events</h1>
            </div>
            <div className="history-container">
                {attendanceRecords.map((record, index) => (
                    <HistoryCard key={index} record={record} />
                ))}
            </div>


        </div>

    );
}
export default History;