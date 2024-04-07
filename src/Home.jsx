// WelcomeMessage.js
import React from 'react';

function Home(props) {
  return (
    <div className="welcome-message">
      <h2>Welcome, {props.userName}!</h2>
    </div>
  );
}

export default Home;
