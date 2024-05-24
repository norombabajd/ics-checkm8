import Header from '../../components/Heading';
import InputBox from '../../components/InputBox/InputBox';
import Toggle from '../../components/Toggle/Toggle';
import "./profile.css";

import { supabase } from '../../api/supabase';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';


async function ObtainProfileDemographics(id) {
    const { data, error } = await supabase
      .from('user-demographics')
      .select()
      .eq('id', id) // assuming 'id' is the column name for user ID
  
    if (error) {
      console.error('Error fetching user data:', error)
      return null
    }
    return data
  }

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

    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [age, setAge] = useState('null');
    const [gender, setGender] = useState('null');

    useEffect(() => {
        async function GrabUserData() {
            const { data: { user } } = await supabase.auth.getUser()
            setUser(user)
            
            const { data, error } = await supabase
            .from('user-demographics')
            .select()
            .eq('id', user.id) // assuming 'id' is the column name for user ID
            
            setAge(data[0].age);
            setGender(data[0].gender);
            
            console.log(age);
            console.log(gender);
        
        }
        GrabUserData();

        if (user){
            const demographics = ObtainProfileDemographics(user.id);
            
        }

    }, []);

    // console.log(user);    
    


    
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