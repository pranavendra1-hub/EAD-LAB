import React, { useState, useEffect } from 'react';

const API_URL = 'http://localhost:4000';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [role, setRole] = useState(localStorage.getItem('role') || '');
  const [username, setUsername] = useState(localStorage.getItem('username') || '');
  const [books, setBooks] = useState([]);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [newBookTitle, setNewBookTitle] = useState('');
  const [message, setMessage] = useState('');

  // Fetch books when token changes (i.e., after login)
  useEffect(() => {
    if (token) {
      fetchBooks();
    } else {
      setBooks([]);
    }
  }, [token]);

  async function fetchBooks() {
    try {
      const res = await fetch(`${API_URL}/books`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setBooks(data);
      } else {
        setMessage('Failed to fetch books.');
      }
    } catch (err) {
      setMessage('Error fetching books.');
    }
  }

  async function handleLogin(e) {
    e.preventDefault();
    setMessage('');
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData)
      });
      if (res.ok) {
        const data = await res.json();
        setToken(data.token);
        setRole(data.role);
        setUsername(data.username);

        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.role);
        localStorage.setItem('username', data.username);

        setLoginData({ username: '', password: '' });
        setMessage('Logged in successfully.');
      } else {
        setMessage('Invalid username or password.');
      }
    } catch {
      setMessage('Login error.');
    }
  }

  async function handleAddBook(e) {
    e.preventDefault();
    if (!newBookTitle.trim()) {
      setMessage('Enter a book title.');
      return;
    }
    setMessage('');
    try {
      const res = await fetch(`${API_URL}/books`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ title: newBookTitle })
      });
      if (res.ok) {
        const book = await res.json();
        setBooks(prev => [...prev, book]);
        setNewBookTitle('');
        setMessage(`Added book "${book.title}".`);
      } else {
        const error = await res.json();
        setMessage(error.message || 'Failed to add book.');
      }
    } catch {
      setMessage('Error adding book.');
    }
  }

  async function handleDeleteBook(id) {
    setMessage('');
    try {
      const res = await fetch(`${API_URL}/books/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (res.ok) {
        setBooks(prev => prev.filter(book => book.id !== id));
        setMessage(`Deleted book with ID ${id}.`);
      } else {
        const error = await res.json();
        setMessage(error.message || 'Failed to delete book.');
      }
    } catch {
      setMessage('Error deleting book.');
    }
  }

  function handleLogout() {
    setToken('');
    setRole('');
    setUsername('');
    setBooks([]);
    localStorage.clear();
    setMessage('Logged out.');
  }

  if (!token) {
    // Login form
    return (
      <div style={{ padding: 20 }}>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            placeholder="Username"
            value={loginData.username}
            onChange={e => setLoginData({ ...loginData, username: e.target.value })}
            required
          />
          <br />
          <input
            placeholder="Password"
            type="password"
            value={loginData.password}
            onChange={e => setLoginData({ ...loginData, password: e.target.value })}
            required
          />
          <br />
          <button type="submit">Login</button>
        </form>
        {message && <p style={{ color: 'red' }}>{message}</p>}
        <p>Try login as <b>admin/admin123</b> or <b>user/user123</b></p>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Welcome, {username} ({role})</h2>
      <button onClick={handleLogout}>Logout</button>
      <h3>Books List</h3>
      {books.length === 0 ? <p>No books found.</p> : (
        <ul>
          {books.map(book => (
            <li key={book.id}>
              {book.title}
              {role === 'admin' && (
                <button
                  onClick={() => handleDeleteBook(book.id)}
                  style={{ marginLeft: 10, color: 'red' }}
                >
                  Delete
                </button>
              )}
            </li>
          ))}
        </ul>
      )}

      {role === 'admin' && (
        <form onSubmit={handleAddBook}>
          <input
            placeholder="New book title"
            value={newBookTitle}
            onChange={e => setNewBookTitle(e.target.value)}
          />
          <button type="submit">Add Book</button>
        </form>
      )}

      {message && <p>{message}</p>}
    </div>
  );
}

export default App;
