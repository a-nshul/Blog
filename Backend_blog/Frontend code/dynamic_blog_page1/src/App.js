import React from 'react';
import './App.css';
import Login from './components/Login'; // Import the Login component
import Register from './components/Register'; // Import the Register component
import BlogList from './components/BlogList'; // Import the BlogList component
import BlogForm from './components/BlogForm'; // Import the BlogForm component

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* Render your components here */}
        <Login /> {/* Render the Login component */}
        <Register /> {/* Render the Register component */}
        <BlogList /> {/* Render the BlogList component */}
        <BlogForm /> {/* Render the BlogForm component */}
      </header>
    </div>
  );
}

export default App;
