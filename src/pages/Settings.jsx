// import React, { useState, useEffect } from 'react';
// import './Settings.css';
// import {
//     FaUserEdit, FaLock, FaLanguage, FaShareAlt,
//     FaInfoCircle, FaExclamationCircle, FaFileContract,
//     FaUserSecret, FaTrashAlt, FaBroom, FaChevronRight
// } from 'react-icons/fa';
// import { FiArrowLeft } from 'react-icons/fi';
// import { Link } from 'react-router-dom';

// async function calculateCacheSize() {
//     if (!('caches' in window)) {
//         return 'Not supported';
//     }
//     let totalSize = 0;

//     const cacheNames = await caches.keys();
//     for (const name of cacheNames) {
//         const cache = await caches.open(name);
//         const requests = await cache.keys();
//         for (const request of requests) {
//             const response = await cache.match(request);
//             if (response) {
//                 const clonedResponse = response.clone();
//                 const buffer = await clonedResponse.arrayBuffer();
//                 totalSize += buffer.byteLength;
//             }
//         }
//     }
//     const sizeInMB = (totalSize / (1024 * 1024)).toFixed(2);
//     return `${sizeInMB} MB`;
// }

// async function clearAllCaches() {
//     if (!('caches' in window)) return;
//     const cacheNames = await caches.keys();
//     for (const name of cacheNames) {
//         await caches.delete(name);
//     }
// }

// export default function Settings() {
//     const [cacheSize, setCacheSize] = useState('Calculating...');

//     useEffect(() => {
//         calculateCacheSize().then(size => setCacheSize(size));
//     }, []);

//     const handleClearCache = async () => {
//         await clearAllCaches();
//         setCacheSize('0.00 MB');
//         alert('App caches cleared!');
//     };

//     const settingsData = [
//         {
//             title: 'Account',
//             items: [
//                 { icon: <FaUserEdit />, label: 'Edit Profile' },
//                 { icon: <FaLock />, label: 'Change password' },
//             ],
//         },
//         {
//             title: 'Activity',
//             items: [
//                 { icon: <FaLanguage />, label: 'App language' },
//                 { icon: <FaShareAlt />, label: 'Share app' },
//             ],
//         },
//         {
//             title: 'Support',
//             items: [
//                 { icon: <FaInfoCircle />, label: 'Information' },
//                 { icon: <FaExclamationCircle />, label: 'Report a problem' },
//             ],
//         },
//         {
//             title: 'About',
//             items: [
//                 { icon: <FaFileContract />, label: 'Terms of use' },
//                 { icon: <FaUserSecret />, label: 'Privacy policy' },
//                 { icon: <FaTrashAlt />, label: 'Elimina account', danger: true },
//                 { icon: <FaBroom />, label: `Clear cache (${cacheSize})`, action: handleClearCache },
//             ],
//         },
//     ];

//     return (
//         <div className="settings-wrapper">
//             <div className="settings-container">
//                 <div className="settings-header">
//                     <Link to="/" className="back-link">
//                         <FiArrowLeft className="back-icon" />
//                     </Link>
//                     <span className="header-title">Settings</span>
//                 </div>

//                 {settingsData.map((section, index) => (
//                     <div className="settings-section" key={index}>
//                         <div className="section-title">{section.title}</div>
//                         {section.items.map((item, idx) => {
//                             const isLastItem = idx === section.items.length - 1;
//                             return (
//                                 <div
//                                     className={`settings-item ${item.danger ? 'danger' : ''} ${isLastItem ? 'with-bottom-border' : ''}`}
//                                     key={idx}
//                                     onClick={item.action ? item.action : undefined}
//                                     style={{ cursor: item.action ? 'pointer' : 'default' }}
//                                 >
//                                     <div className="left">
//                                         <span className="icon">{item.icon}</span>
//                                         <span className="label">{item.label}</span>
//                                     </div>
//                                     <FaChevronRight className="arrow" />
//                                 </div>
//                             );
//                         })}
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }




import React, { useState, useEffect } from 'react';
import './Settings.css';
import {
    FaUserEdit, FaLock, FaLanguage, FaShareAlt,
    FaInfoCircle, FaExclamationCircle, FaFileContract,
    FaUserSecret, FaTrashAlt, FaBroom, FaChevronRight,
    FaWhatsapp, FaFacebook, FaTwitter
} from 'react-icons/fa';
import { FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';

async function calculateCacheSize() {
    if (!('caches' in window)) {
        return 'Not supported';
    }
    let totalSize = 0;

    const cacheNames = await caches.keys();
    for (const name of cacheNames) {
        const cache = await caches.open(name);
        const requests = await cache.keys();
        for (const request of requests) {
            const response = await cache.match(request);
            if (response) {
                const clonedResponse = response.clone();
                const buffer = await clonedResponse.arrayBuffer();
                totalSize += buffer.byteLength;
            }
        }
    }
    const sizeInMB = (totalSize / (1024 * 1024)).toFixed(2);
    return `${sizeInMB} MB`;
}

async function clearAllCaches() {
    if (!('caches' in window)) return;
    const cacheNames = await caches.keys();
    for (const name of cacheNames) {
        await caches.delete(name);
    }
}

export default function Settings() {
    const [cacheSize, setCacheSize] = useState('Calculating...');
    const [showShareOptions, setShowShareOptions] = useState(false);

    useEffect(() => {
        calculateCacheSize().then(size => setCacheSize(size));
    }, []);

    const handleClearCache = async () => {
        await clearAllCaches();
        setCacheSize('0.00 MB');
        alert('App caches cleared!');
    };

    const handleShareApp = () => {
        const shareData = {
            title: 'Meri App',
            text: 'Is app ko dekho, bohot amazing hai!',
            url: window.location.origin
        };

        if (navigator.share) {
            navigator.share(shareData).catch(err => console.log('Share failed', err));
        } else {
            setShowShareOptions(true);
        }
    };

    const shareViaWhatsApp = () => {
        window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent('Is app ko dekho: ' + window.location.origin)}`);
    };

    const shareViaFacebook = () => {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.origin)}`);
    };

    const shareViaTwitter = () => {
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.origin)}&text=${encodeURIComponent('Is app ko dekho!')}`);
    };

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
                { icon: <FaShareAlt />, label: 'Share app', action: handleShareApp },
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
                { icon: <FaBroom />, label: `Clear cache (${cacheSize})`, action: handleClearCache },
            ],
        },
    ];

    return (
        <div className="settings-wrapper">
            <div className="settings-container">
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
                                    className={`settings-item ${item.danger ? 'danger' : ''} ${isLastItem ? 'with-bottom-border' : ''}`}
                                    key={idx}
                                    onClick={item.action ? item.action : undefined}
                                    style={{ cursor: item.action ? 'pointer' : 'default' }}
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

                {showShareOptions && (
                    <div className="share-modal">
                        <h4>Share via</h4>
                        <button onClick={shareViaWhatsApp}><FaWhatsapp /> WhatsApp</button>
                        <button onClick={shareViaFacebook}><FaFacebook /> Facebook</button>
                        <button onClick={shareViaTwitter}><FaTwitter /> Twitter</button>
                        <button onClick={() => setShowShareOptions(false)}>Close</button>
                    </div>
                )}
            </div>
        </div>
    );
}
