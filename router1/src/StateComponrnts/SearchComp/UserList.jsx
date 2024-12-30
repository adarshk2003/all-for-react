import React, { useState } from 'react';
import './Style.css';  // Import the CSS file

const users = [
    { "id": 1, "name": "Leanne Graham", "role": "Admin" },
    { "id": 2, "name": "Ervin Howell", "role": "user" },
    { "id": 3, "name": "Clementine Bauch", "role": "user" },
    { "id": 4, "name": "Patricia Lebsack", "role": "Admin" },
    { "id": 5, "name": "Chelsey Dietrich", "role": "user" },
    { "id": 6, "name": "Mrs. Dennis Schulist", "role": "Admin" },
    { "id": 7, "name": "Kurtis Weissnat", "role": "user" },
    { "id": 8, "name": "Nicholas Runolfsdottir V", "role": "user" },
    { "id": 9, "name": "Glenna Reichert", "role": "user" },
    { "id": 10, "name": "Clementina DuBuque", "role": "user" }
];

function UserList() {
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('All');

    const filteredUsers = users.filter((user) => {
        let matchSearchTerm = user.name.toLowerCase().includes(searchTerm.toLowerCase());
        let matchRole = roleFilter === 'All' || user.role.toLowerCase() === roleFilter.toLowerCase();
        return matchSearchTerm && matchRole;
    });

    return (
        <div className="container">
            <h1>User List</h1>
            <input
                type="text"
                placeholder="Search by name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
                <option value="All">All</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
            </select>
            <ul>
                {filteredUsers.map((user) => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default UserList;
