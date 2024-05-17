import Header from '../../components/Heading';
import InputBox from '../../components/InputBox/InputBox';
import { Link } from "react-router-dom";
import "./profile.css";


function Profile() {
    return (
        <div className="profilePage">
            <Header />
            <div className="columns">
                <div className="leftColumn">
                    <h2>Settings</h2>
                </div>
                <div className="columnSeparator"></div>
                <div className="rightColumn">
                    <h2>Account Details</h2>
                    <form>
                        <div className="name">
                            <div className="firstName">
                                <label>First Name</label>
                                <br/>
                                <InputBox type="text" name="firstName" required/>
                            </div>
                            <div className="lastName">
                                <label>Last Name</label>
                                <br/>
                                <InputBox type="text" name="lastName" required/>
                            </div>
                        </div>
                        <div>
                            <label>Email</label>
                            <br/>
                            <InputBox type="text" name="email" required/>
                        </div>
                        <div>
                            <label>Password</label>
                            <br/>
                            <InputBox type="text" name="password" required/>
                        </div>
                        <div>
                            <label>Gender</label>
                            <br/>
                            <InputBox type="text" name="gender"/>
                        </div>
                        <div>
                            <label>Age</label>
                            <br/>
                            <InputBox type="text" name="age" required/>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    );
}
export default Profile;