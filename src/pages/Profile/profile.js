import Header from '../../components/Heading';
import InputBox from '../../components/InputBox/InputBox';
import Toggle from '../../components/Toggle/Toggle';
import "./profile.css";

import { supabase } from '../../api/supabase';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Profile() {
    const [profileInfo, setProfileInfo] = useState({
        firstName: '',
        lastName: '', 
        email: '',
        gender: '',
        age: null
    });
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");
    const [age, setAge] = useState(0);

    useEffect(() => {
        async function grabUserData () {
            try {
                const { data: { user } } = await supabase.auth.getUser();
                setUser(user);

                if (!user) return; // User not logged in
                const { data, error } = await supabase
                    .from('user-demographics')
                    .select()
                    .eq('id', user.id);

                if (error) {
                    console.error('Error fetching user demographics:', error);
                } else {
                    const userData = data[0];
                    console.log(userData.first_name);
                    setProfileInfo({
                        firstName: userData.first_name,
                        lastName: userData.last_name,
                        email: userData.email,
                        gender: userData.gender,
                        age: userData.age
                    });
                    console.log("profile info is set");
                    console.log(profileInfo.firstName);
                    console.log(profileInfo.lastName);
                }
            } catch (error) {
                console.error('Error while grabbing user data:', error);
            }
        };
        grabUserData();
    }, []);

    useEffect(() => {
        if (user) {
            setFirstName(profileInfo.firstName);
            setLastName(profileInfo.lastName);
            setEmail(profileInfo.email);
            setGender(profileInfo.gender);
            setAge(profileInfo.age);
            console.log('inside use effect');
        }
    }, [profileInfo, user])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfileInfo({
            ...profileInfo,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Save profile info to database
            // Example: await supabase.from('user-demographics').update(profileInfo).eq('id', user.id);
            console.log('Profile info saved:', profileInfo);
        } catch (error) {
            console.error('Error saving profile info:', error);
        }
    };

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
                                <InputBox type="text" name="firstName" value={firstName} onChange={handleInputChange} required/>
                            </div>
                            <div className="lastName">
                                <label>Last Name</label>
                                <br/>
                                <InputBox type="text" name="lastName" value={lastName} onChange={handleInputChange} required/>
                            </div>
                        </div>
                        <div>
                            <label>Email</label>
                            <br/>
                            <InputBox type="text" name="email" value={email} onChange={handleInputChange} required width="49%"/>
                        </div>
                        <div className="gender-age">
                            <div>
                                <label>Gender</label>
                                <br/>
                                <InputBox type="text" name="gender" value={gender} onChange={handleInputChange}/>
                            </div>
                            <div className="age">
                                <label>Age</label>
                                <br/>
                                <InputBox type="text" name="age" value={age} onChange={handleInputChange} required/>
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