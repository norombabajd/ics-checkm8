import Header from '../../components/Heading'
import React, { useState } from 'react';
import '../../index.js'


function Profile() {

    const handleSubmit = (e) => {        
        // Handle form submission logic here
    };
    return (
        <div>
            <Header />
            <div className='flex flex-col max-w px-36 py-36 items-center'>
            <div className='card rounded-xl flex flex-col gap-2 p-10 shadow-lg'>
            <h1>Profile</h1>
            
            <p className="w-full">
                    Name
                    <input  name="eventName" value='Peter the Anteater' className="input-field" />
            </p>

            <p className="w-full py-1">
                    Date of Birth
                    <input type="date" name="eventTime" value='1965-10-04' className="input-field" />
                </p>

                <p className="w-full">
                    Email
                    <input type="email" name="eventName" value='panteatr@uci.edu' className="input-field" />
                </p>

                <div>
                        <input type="checkbox" id="" name="" value=""></input>
                        <label> Allow notifications to be sent.</label>
                    </div>

                <p className="w-full">
                    Change Password
                    <input type="password" name="eventName" value='' className="input-field" />
                </p>


            <form className="form-container">
    
                
                
                
                
                

                <button type="submit" className="submit-button">
                    Save Changes
                </button>
            </form>
            </div>
            </div> 


        </div>

    );
}
export default Profile;