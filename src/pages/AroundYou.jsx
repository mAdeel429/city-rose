import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AroundYou.css';
import { FaSearch } from "react-icons/fa";

export default function AroundYou() {
    const navigate = useNavigate();

    const categories = [
        {
            title: 'Food & Drink',
            image: 'https://static.vecteezy.com/system/resources/thumbnails/025/190/430/small_2x/juicy-apple-drop-reflects-freshness-of-organic-nature-gourmet-snack-generated-by-ai-free-photo.jpg',
        },
        {
            title: 'Culture & Sights',
            image: 'https://bonjourvenise.fr/wp-content/uploads/2023/05/gallerie-dellacademia-venise.jpg',
        },
        {
            title: 'Tours & Experience',
            image: 'https://t4.ftcdn.net/jpg/02/27/51/23/360_F_227512366_p6VBEleUWXgN3wDhS7DxzafysQwW9JXp.jpg',
        },
        {
            title: 'Shopping',
            image: 'https://img.freepik.com/free-photo/black-friday-assortment-with-shopping-carts_23-2148666976.jpg?semt=ais_hybrid&w=740',
        },
        {
            title: 'Activity & Wellness',
            image: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRkt6oaXzIzBJjDddaM60iOXc3dX0-SRBSU2dikyGipatsGISi2',
        },
    ];

    return (
        <div className="around-you-page">
            <h2>Around You</h2>
            <div className="around-you-search-bar">
                <FaSearch className="around-you-search-icon" />
                <input type="text" />
            </div>
            <div className="category-list">
                {categories.map((cat, index) => (
                    <div
                        key={index}
                        className="category-card"
                        onClick={() => navigate(`/category/${encodeURIComponent(cat.title)}`)}
                    >
                        <img src={cat.image} alt={cat.title} />
                        <div className="category-title">{cat.title}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}


