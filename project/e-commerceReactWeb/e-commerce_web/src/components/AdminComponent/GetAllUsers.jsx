import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import  './fecheduser.css'

const FetchAllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(10); 
  const [filters, setFilters] = useState({
    type: '',
    activity: '',
    sort: 'name',
    order: 'asc',
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { type, activity, sort, order } = filters;
        const response = await axios.get(`http://localhost:7000/users`, {
          params: { page, limit, type, activity, sort, order }
        });
        setUsers(response.data.data.users);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Failed to fetch users');
        setLoading(false);
      }
    };

    fetchUsers();
  }, [page, limit, filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  return (
    <div className="container my-4">
      <h1 className="text-center">  Users</h1>

      {/* Filter Options */}
      <div className="filters mb-4 row">
        <div className="form-group col-md-3">
          <label>User Type</label>
          <select name="type" onChange={handleFilterChange} className="form-control">
            <option value="">All</option>
            <option value="buyer">Buyers</option>
            <option value="seller">Sellers</option>
          </select>
        </div>
        <div className="form-group col-md-3">
          <label>Sort By</label>
          <select name="sort" onChange={handleFilterChange} className="form-control">
            <option value="name">Name</option>
            <option value="createdAt">Date Created</option>
          </select>
        </div>
        <div className="form-group col-md-3">
          <label>Order</label>
          <select name="order" onChange={handleFilterChange} className="form-control">
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>

      {loading && <div className="text-center"><div className="spinner-border" role="status"><span className="sr-only">Loading...</span></div></div>}
      {error && <p className="text-danger text-center">{error}</p>}
      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-hover">
            <thead className="thead-dark">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>User Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.user_type}</td>
                  <td>
                    <Link to={`/user/${user._id}`} className="btn btn-info btn-sm">
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <nav aria-label="Page navigation">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => setPage(page > 1 ? page - 1 : 1)}>Previous</button>
          </li>
          <li className="page-item"><span className="page-link">Page {page}</span></li>
          <li className="page-item">
            <button className="page-link" onClick={() => setPage(page + 1)}>Next</button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default FetchAllUsers;
