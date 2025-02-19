import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar'; // Import the Navbar component
import './settings.css'; // Import styles for Settings
import OneSignal from "react-onesignal"; // Import OneSignal
import axios from "axios";


const Settings = () => {
    const [activeTab, setActiveTab] = useState('personal');
  
  
    const handleTabClick = (tab) => {
      setActiveTab(tab);
    };
  
    return (
      <div>
          <Navbar />
          <div className='bodySetting'>
            <div className="Settings-page">
              {/* Tab Navigation */}
              <div className="tabs">
                <button
                  className={`tab-button ${activeTab === 'personal' ? 'active' : ''}`}
                  onClick={() => handleTabClick('personal')}
                >
                  Personal Information
                </button>
                <button
                  className={`tab-button ${activeTab === 'notifications' ? 'active' : ''}`}
                  onClick={() => handleTabClick('notifications')}
                >
                  Notification Preferences
                </button>
                <button
                  className={`tab-button ${activeTab === 'password' ? 'active' : ''}`}
                  onClick={() => handleTabClick('password')}
                >
                  Change Password
                </button>
              </div>
      
              {/* Tab Content */}
              <div className="tab-content">
                {/* Personal Information Tab */}
                {activeTab === 'personal' && (
                  <div className="tab-panel">
                    <h3>Personal Information</h3>
                    <form>
                      <div className="Settings-input">
                        <input type="text" id="name" className="input-field" placeholder="Full Name" />
                      </div>
                      <div className="Settings-input">
                        <input type="text" id="school" className="input-field" placeholder="Your school" />
                      </div>
                      <div className="Settings-input">
                        <input type="text" id="major" className="input-field" placeholder="Your major" />
                      </div>
                      <div className="Settings-input">
                        <input type="number" id="graduation-year" className="input-field" placeholder="Graduation Year" />
                      </div>
                      <button type="submit" className="buttonSettings">Save Personal Information</button>
                    </form>
                  </div>
                )}
      
                {/* Notification Preferences Tab */}
                {activeTab === 'notifications' && (
                  <div className="tab-panel">
                    <h3>Notification Preferences</h3>
                    <form>
                      <div className="Settings-input">
                        <label className="Settings-label">Receive Email Notifications</label>
                        <input type="checkbox" id="email-notifications" />
                      </div>
                      <div className="Settings-input">
                        <label className="Settings-label">Receive SMS Notifications</label>
                        <input type="checkbox" id="sms-notifications" />
                      </div>
                      <button type="submit" className="buttonSettings">Save Preferences</button>
                    </form>
                   
                  </div>
                )}
      
                {/* Change Password Tab */}
                {activeTab === 'password' && (
                  <div className="tab-panel">
                    <h3>Change Password</h3>
                    <form>
                      <div className="Settings-input">
                        <label htmlFor="current-password" className="Settings-label">Current Password</label>
                        <input type="password" id="current-password" className="input-field" placeholder="Enter current password" />
                      </div>
                      <div className="Settings-input">
                        <label htmlFor="new-password" className="Settings-label">New Password</label>
                        <input type="password" id="new-password" className="input-field" placeholder="Enter new password" />
                      </div>
                      <div className="Settings-input">
                        <label htmlFor="confirm-password" className="Settings-label">Confirm New Password</label>
                        <input type="password" id="confirm-password" className="input-field" placeholder="Confirm new password" />
                      </div>
                      <button type="submit" className="buttonSettings">Change Password</button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
      </div>
    );
};

export default Settings;

