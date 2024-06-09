import Header from '../../components/Heading';
import InputBox from '../../components/InputBox/InputBox';
import Toggle from '../../components/Toggle/Toggle';
import "./profile.css";

import { supabase } from '../../api/supabase';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Profile() {
    const [profileInfo, setProfileInfo] = useState(null);
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
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
                    setProfileInfo(userData);
                    console.log(profileInfo);
                    setFirstName(userData.first_name);
                    setLastName(userData.last_name);
                    setEmail(userData.email);
                    setGender(userData.gender);
                    setAge(userData.age);
                    console.log(age);
                }
            } catch (error) {
                console.error('Error while grabbing user data:', error);
            }
        };
        grabUserData();
    }, []);

    async function updateProfileInfo(id, newInfo) {
        try {
            console.log("below is newInfo");
            console.log(newInfo);
            const { data , error } = await supabase
            .from('user-demographics')
            .update(newInfo)
            .eq('id', id);

            if (error) {
                throw error;
            }
            console.log("updated sucessfully: ", data);
        } catch (error) {
            console.log("Error while updating user data: ", error);
        }

    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfileInfo({
            ...profileInfo,
            [name]: value
        });
        console.log(profileInfo);
        if (name === 'firstName') {
            setFirstName(value);
        } else if (name === 'lastName') {
            setLastName(value);
        } else if (name === 'email') {
            setEmail(value);
        } else if (name === 'gender') {
            setGender(value);
        } else if (name === 'age') {
            setAge(value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let newProfileInfo = {
                first_name: first_name,
                last_name: last_name,
                email: email,
                gender: gender,
                age: age
            };
            updateProfileInfo(user.id, newProfileInfo);
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
                                <InputBox id="fn" type="text" name="firstName" val={first_name} onChange={handleInputChange} required/>
                            </div>
                            <div className="lastName">
                                <label>Last Name</label>
                                <br/>
                                <InputBox type="text" name="lastName" val={last_name} onChange={handleInputChange} required/>
                            </div>
                        </div>
                        <div>
                            <label>Email</label>
                            <br/>
                            <InputBox type="text" name="email" val={email} onChange={handleInputChange} required width="49%"/>
                        </div>
                        <div className="gender-age">
                            <div>
                                <label>Gender</label>
                                <br/>
                                <InputBox type="text" name="gender" val={gender} onChange={handleInputChange}/>
                            </div>
                            <div className="age">
                                <label>Age</label>
                                <br/>
                                <InputBox type="text" name="age" val={age} onChange={handleInputChange} required/>
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