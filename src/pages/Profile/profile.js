import React, { useState } from 'react';
import Header from '../../components/Heading';
import InputBox from '../../components/InputBox/InputBox';
import Toggle from '../../components/Toggle/Toggle';
import "./profile.css";


const Profile = () => {
    const [profileInfo, setProfileInfo] = useState({
        firstName: '',
        lastName: '', 
        email: '',
        password: '',
        gender: '',
        age: ''
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfileInfo({
          ...profileInfo,
          [name]: value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted!', profileInfo);
        setProfileInfo({
            firstName: '',
            lastName: '', 
            email: '',
            password: '',
            gender: '',
            age: ''
        });
    }

    return (
        <div className="profilePage">
            <Header />
            <div className="columns">
                <div className="leftColumn">
                    <h2>Settings</h2>
                    <div className="settingItems">
                        <div className="settingItem">
                            <p>App notifications</p>
                            <Toggle/>
                        </div>
                        <div className="settingItem">
                            <p>Push notifications</p>
                            <Toggle/>
                        </div>
                        <div className="settingItem">
                            <p>Email notifications</p>
                            <Toggle/>
                        </div>
                        <div className="settingItem">
                            <p>Location</p>
                            <Toggle/>
                        </div>
                    </div>
                </div>
                <div className="columnSeparator"></div>
                <div className="rightColumn">
                    <h2>Account Details</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="name">
                            <div className="firstName">
                                <label>First Name</label>
                                <br/>
                                <InputBox type="text" name="firstName" value={profileInfo.firstName} onChange={handleInputChange} required/>
                            </div>
                            <div className="lastName">
                                <label>Last Name</label>
                                <br/>
                                <InputBox type="text" name="lastName" value={profileInfo.lastName} onChange={handleInputChange} required/>
                            </div>
                        </div>
                        <div>
                            <label>Email</label>
                            <br/>
                            <InputBox type="text" name="email" value={profileInfo.email} onChange={handleInputChange} required width="49%"/>
                        </div>
                        <div>
                            <label>Password</label>
                            <br/>
                            <InputBox type="text" name="password" value={profileInfo.password} onChange={handleInputChange} required width="49%"/>
                        </div>
                        <div className="gender-age">
                            <div>
                                <label>Gender</label>
                                <br/>
                                <InputBox type="text" name="gender" value={profileInfo.gender} onChange={handleInputChange}/>
                            </div>
                            <div className="age">
                                <label>Age</label>
                                <br/>
                                <InputBox type="text" name="age" value={profileInfo.age} onChange={handleInputChange} required/>
                            </div>
                        </div>
                        <button type="submit" className="submitButton">Save Changes</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Profile;