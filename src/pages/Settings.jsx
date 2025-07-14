import React from 'react';
import './Settings.css';
import {
    FaUserEdit,
    FaLock,
    FaLanguage,
    FaShareAlt,
    FaInfoCircle,
    FaExclamationCircle,
    FaFileContract,
    FaUserSecret,
    FaTrashAlt,
    FaBroom,
    FaChevronRight,
} from 'react-icons/fa';
import { FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom'

const settingsData = [
    {
        title: 'Account',
        items: [
            { icon: <FaUserEdit />, label: 'Edit Profile' },
            { icon: <FaLock />, label: 'Change password' },
        ],
    },
    {
        title: 'Activity',
        items: [
            { icon: <FaLanguage />, label: 'App language' },
            { icon: <FaShareAlt />, label: 'Share app' },
        ],
    },
    {
        title: 'Support',
        items: [
            { icon: <FaInfoCircle />, label: 'Information' },
            { icon: <FaExclamationCircle />, label: 'Report a problem' },
        ],
    },
    {
        title: 'About',
        items: [
            { icon: <FaFileContract />, label: 'Terms of use' },
            { icon: <FaUserSecret />, label: 'Privacy policy' },
            { icon: <FaTrashAlt />, label: 'Elimina account', danger: true },
            { icon: <FaBroom />, label: 'Clear cache (1040.0 MB)' },
        ],
    },
];

export default function Settings() {
    return (
        <div className="settings-wrapper">
        <div className="settings-container">

            {/* <div className="settings-header">Settings</div> */}
            <div className="settings-header">
                <Link to="/" className="back-link">
                    <FiArrowLeft className="back-icon" />
                </Link>
                <span className="header-title">Settings</span>
            </div>


            {settingsData.map((section, index) => (
                <div className="settings-section" key={index}>
                    <div className="section-title">{section.title}</div>
                    {section.items.map((item, idx) => {
                        const isLastItem = idx === section.items.length - 1;
                        return (
                            <div
                                className={`settings-item ${item.danger ? 'danger' : ''} ${isLastItem ? 'with-bottom-border' : ''
                                    }`}
                                key={idx}
                            >
                                <div className="left">
                                    <span className="icon">{item.icon}</span>
                                    <span className="label">{item.label}</span>
                                </div>
                                <FaChevronRight className="arrow" />
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
        </div>
    );
}
