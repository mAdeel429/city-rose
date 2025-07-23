import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { AiFillHeart } from 'react-icons/ai';
import { FaSearch } from 'react-icons/fa';
import BottomSheet from '../components/BottomSheeet';
import { filterOptions } from '../data/filterConfig';
import './CategoryDetails.css';
import { FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const CategoryDetails = () => {
    const { category } = useParams();
    const navigate = useNavigate();

    const categoryData = {
        'Food & Drink': [
            {
                title: 'Da Giacomo il Salviatino',
                distance: '17.7',
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxSVb9Sr6su2MB40pZ8NHxYiCoy6ieMG__VQ&s',
                category: 'Restaurant',
                type: 'Casual Dining',
                cuisine: 'Italian',
                price: '$$$',
                tags: ['Popular', 'Romantic']
            },
            {
                title: 'Donamalina - Le cure',
                distance: '5.8',
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQK3kkVkiCmKzcKnd7RND0zo2f0JmPPbYRzag&s',
                category: 'Cafe',
                type: 'Ice Cream Shop',
                cuisine: 'Asian',
                price: '$$',
                tags: ['New', 'Family Friendly']
            },
            {
                title: 'Street Bites',
                distance: '2.1',
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFIUYuEId_6b8TD1M7id7OIQnDrmX14dJHqA&s',
                category: 'Street Food',
                type: 'Sandwich',
                cuisine: 'American',
                price: '$',
                tags: ['Popular', 'Family Friendly']
            },
            {
                title: 'Tokyo Pub',
                distance: '3.5',
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJPP4Alli4b-3Qx-aRMHFzd8uCGau4gRQhmw&s',
                category: 'Lounge Bar',
                type: 'Pub',
                cuisine: 'Asian',
                price: '$$',
                tags: ['Romantic', 'Popular']
            },
            {
                title: 'Pizza & Love',
                distance: '6.2',
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThdQ2p1DAkGfnwhPQtu3gulMdOfOb1Dz6D-g&s',
                category: 'Restaurant',
                type: 'Pizzeria',
                cuisine: 'Italian',
                price: '$',
                tags: ['New']
            }
        ],

        'Culture & Sights': [
            {
                title: "Gallerie dell'Accademia",
                distance: '10.2',
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4NZZG2wHMEPtoEwGrX_dBQKi4OmG4Bfik8g&s',
                category: 'Galleria',
                tags: ['Architecture', 'Historical']
            },
            {
                title: "St. Mark's Basilica",
                distance: '12.5',
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9U4WE2rVyOv9GCpWPi-pGiuLC04oN0LhKIw&s',
                category: 'Chiesa',
                tags: ['Historical', 'UNESCO']
            },
            {
                title: "Palazzo Vecchio",
                distance: '7.4',
                image: 'https://cdn-imgix.headout.com/mircobrands-content/image/bbc6c56867cb5f0db2f9b5bd4e3d2f9b-Palazzo%20Vecchio.jpg',
                category: 'Museo',
                tags: ['Historical']
            },
            {
                title: 'Teatro Comunale',
                distance: '8.9',
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0aomgEYyhB1OvGOnZCST-yYA7xkNG9m4GTA&s',
                category: 'Teatro',
                tags: ['Architecture']
            },
            {
                title: 'Biblioteca Nazionale',
                distance: '4.1',
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTExdjDhNr-7yNvO2i4CblSHuW80Lod-n42zA&s',
                category: 'Biblioteca',
                tags: ['Historical']
            },
            {
                title: 'Cinema Firenze',
                distance: '3.7',
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFxaVNWLeHQex54PfEl9VTbseA3LNPsS2qkg&s',
                category: 'Cinema',
                tags: ['Architecture']
            },
            {
                title: 'Santa Croce Church',
                distance: '2.9',
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk3eVQQUm5vRql0Dzci41kI_okkcxfAQH6gA&s',
                category: 'Chiesa',
                tags: ['UNESCO', 'Historical']
            }
        ],
        'Activity & Wellness': [
            {
                title: 'Urban Yoga Studio',
                distance: '4.2',
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhx5bTDc22Rlrlu7vFV57-iLv7SfSNJDxYwQ&s',
                category: 'Yoga',
                type: 'Group Classes',
                tags: ['Relaxing', 'Mindfulness'],
                genre: 'Wellness',
                price: '$$'
            },
            {
                title: 'Nature Spa Retreat',
                distance: '9.6',
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6VjdP3WjImsv9bw1aGdqUkqx39oxOOWf4PA&s',
                category: 'Spa',
                type: 'Indoor',
                tags: ['Relaxing'],
                genre: 'Wellness',
                price: '$$$'
            },
            {
                title: 'Mountain Hike Trail',
                distance: '15.0',
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0loYBO3c-g3XJQmlONJokfIoN4ANzmhVIsA&s',
                category: 'Hiking',
                type: 'Outdoor',
                tags: ['Adventure', 'Nature'],
                genre: 'Sports',
                price: '$'
            },
            {
                title: 'City Gym Pro',
                distance: '5.0',
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrjgsXxB0UbSnHWi3XHL8c-l4WzrYBCZauhw&s',
                category: 'Gym',
                type: 'Personal Training',
                tags: ['Fitness'],
                genre: 'Fitness',
                price: '$$'
            },
            {
                title: 'Cycling Tuscany',
                distance: '11.3',
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgw0ZFYSSQHL-0tHPMQpvJUEOIjzGM1pL-Ng&s',
                category: 'Cycling',
                type: 'Outdoor',
                tags: ['Adventure', 'Nature'],
                genre: 'Sports',
                price: '$$'
            }
        ]
    };

    const items = categoryData[category] || [];

    const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
    const [activeFilterKey, setActiveFilterKey] = useState(null);
    const [filterOptionsToShow, setFilterOptionsToShow] = useState([]);
    const [selectedFilters, setSelectedFilters] = useState({});

    const handleFilterClick = (key) => {
        const options = filterOptions[category]?.[key] || [];
        setActiveFilterKey(key);
        setFilterOptionsToShow(options);
        setBottomSheetVisible(true);
    };

    const applyFilters = (items, filters) => {
        const keyMap = {
            Category: 'category',
            Type: 'type',
            Cuisine: 'cuisine',
            Price: 'price',
            Tags: 'tags',
        };

        return items.filter((item) => {
            return Object.entries(filters).every(([filterKey, filterValue]) => {
                const itemKey = keyMap[filterKey];
                const itemValue = item[itemKey];

                if (!itemValue) return false;

                if (Array.isArray(itemValue)) {
                    return itemValue.includes(filterValue);
                }

                return itemValue === filterValue;
            });
        });
    };


    const filteredItems = applyFilters(items, selectedFilters);

    return (
        <div className="category-details-page">
            <div className="heading-container">
                <Link to="/around-you" className="back-link">
                    <FiArrowLeft style={{ color: 'black', marginRight: '8px' }} className="hc-icon" />
                </Link>
                <h2>{category}</h2>
            </div>
            <div className="around-you-search-bar">
                <FaSearch className="around-you-search-icon" />
                <input type="text" />
            </div>
            <div className="button-group">
                {Object.entries(filterOptions[category] || {}).map(([filterKey, options]) => (
                    Array.isArray(options) && options.length > 0 && (
                        <button className="filter-button" key={filterKey} onClick={() => handleFilterClick(filterKey)}>
                            {filterKey}
                        </button>
                    )
                ))}
            </div>
            <div className="vertical-card-list">
                {filteredItems.length > 0 ? (
                    filteredItems.map((item, index) => (
                        // <div key={index} className="custom-card">
                        //     <div className="custom-card-image-container">
                        //         <img src={item.image} alt={item.title} className="custom-card-image" />
                        //         <AiFillHeart className="custom-heart-icon" />
                        //         <div className="custom-card-category">{category}</div>
                        //     </div>
                        //     <div className="custom-card-details">
                        //         <h3>{item.title}</h3>
                        //         <p>{item.distance} KM</p>
                        //     </div>
                        // </div>
                        <div
                            key={index}
                            className="custom-card"
                            onClick={() => navigate('/details', { state: item })}
                            style={{ cursor: 'pointer' }}
                        >
                            <div className="custom-card-image-container">
                                <img src={item.image} alt={item.title} className="custom-card-image" />
                                <AiFillHeart className="custom-heart-icon" />
                                <div className="custom-card-category">{category}</div>
                            </div>
                            <div className="custom-card-details">
                                <h3>{item.title}</h3>
                                <p>{item.distance} KM</p>
                            </div>
                        </div>

                    ))
                ) : (
                    <p style={{ padding: '16px', textAlign: 'center' }}>No results.</p>
                )}
            </div>

            {bottomSheetVisible && (
                <BottomSheet
                    title={activeFilterKey}
                    options={filterOptionsToShow}
                    selectedOption={selectedFilters[activeFilterKey]}
                    onClose={() => setBottomSheetVisible(false)}
                    onSelect={(selected) => {
                        setSelectedFilters((prev) => {
                            if (prev[activeFilterKey] === selected) {
                                const updated = { ...prev };
                                delete updated[activeFilterKey];
                                return updated;
                            }
                            return {
                                ...prev,
                                [activeFilterKey]: selected,
                            };
                        });
                        setBottomSheetVisible(false);
                    }}

                />
            )}
        </div>
    );
};

export default CategoryDetails;
