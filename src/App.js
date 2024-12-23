// import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
// import "./App.css";

// // Mood Tracker component
// const MoodTracker = () => {
//   const [entryText, setEntryText] = useState("");
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [entries, setEntries] = useState(() => {
//     const savedEntries = localStorage.getItem("journalEntries");
//     return savedEntries ? JSON.parse(savedEntries) : [];
//   });

//   useEffect(() => {
//     localStorage.setItem("journalEntries", JSON.stringify(entries));
//   }, [entries]);

//   const handleAddEntry = async () => {
//     if (!entryText.trim()) {
//       alert("Please write something.");
//       return;
//     }

//     const sentiment = await analyzeData(entryText || "I'm Good!");

//     const newEntry = {
//       id: Date.now(),
//       text: entryText,
//       date: selectedDate.toLocaleString(),
//       sentiment,
//     };

//     setEntries((prevEntries) => [...prevEntries, newEntry]);
//     setEntryText("");
//   };

//   const analyzeData = async (myFeelings) => {
//     const mockSentiments = [
//       "Sad", "Happy", "Confused", "Disturbed", "Demotivated", "Happiness",
//       "Excitement", "Delight", "Contentment", "Amusement", "Gratitude", "Pride",
//       "Serenity", "Hope", "Love", "Affection", "Compassion", "Warmth", "Tenderness",
//       "Inspiration", "Awe", "Admiration", "Enthusiasm", "Relaxation", "Peacefulness",
//       "Satisfaction", "Anger", "Rage", "Annoyance", "Irritation", "Resentment",
//       "Sadness", "Grief", "Loneliness", "Disappointment", "Heartache", "Despair",
//       "Fear", "Anxiety", "Nervousness", "Worry", "Insecurity", "Panic", "Apprehension",
//       "Disgust", "Revulsion", "Contempt", "Loathing", "Guilt", "Shame", "Regret",
//       "Embarrassment", "Humiliation", "Curiosity", "Surprise", "Nostalgia", "Longing",
//       "Melancholy", "Bittersweetness", "Love-hate", "Relief mixed with sadness", 
//       "Hope mixed with fear",
//     ];
//     return mockSentiments[Math.floor(Math.random() * mockSentiments.length)];
//   };

//   const handleDeleteEntry = (id) => {
//     setEntries((prevEntries) => prevEntries.filter((entry) => entry.id !== id));
//   };

//   const handleEditEntry = (id) => {
//     const entryToEdit = entries.find((entry) => entry.id === id);
//     setEntryText(entryToEdit.text);
//     handleDeleteEntry(id);
//   };

//   const handleDateChange = (date) => {
//     setSelectedDate(date);
//   };

//   const entriesForSelectedDate = entries.filter((entry) =>
//     new Date(entry.date).toLocaleDateString() === selectedDate.toLocaleDateString()
//   );

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>Mood Tracker</h1>
//       <div style={{ marginBottom: "20px", maxWidth: "400px", margin: "0 auto" }}>
//         <Calendar onChange={handleDateChange} value={selectedDate} />
//       </div>

//       <div style={{ margin: "20px 0" }}>
//         <input
//           type="text"
//           value={entryText}
//           onChange={(e) => setEntryText(e.target.value)}
//           placeholder="Write your journal entry..."
//           style={{ padding: "10px", width: "80%" }}
//         />
//         <button onClick={handleAddEntry} style={{ padding: "10px", marginLeft: "10px" }}>
//           Add Entry
//         </button>
//       </div>

//       <div>
//         <h3>All Entries</h3>
//         {entries.length === 0 ? (
//           <p>No entries yet.</p>
//         ) : (
//           entries.map((entry) => (
//             <div
//               key={entry.id}
//               className="entry"
//               style={{ border: "1px solid #ccc", margin: "10px 0", padding: "10px" }}
//             >
//               <p><strong>{entry.date}</strong></p>
//               <p>{entry.text}</p>
//               <p style={{ fontWeight: "bold", color: "#555" }}>Sentiment: {entry.sentiment}</p>
//               <div>
//                 <button onClick={() => handleEditEntry(entry.id)} style={{ marginRight: "10px" }}>
//                   Edit
//                 </button>
//                 <button onClick={() => handleDeleteEntry(entry.id)}>Delete</button>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// // Login Component
// const Login = ({ onLogin }) => {
//   const [email, setEmail] = useState("");
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // For simplicity, you can store the email and username in localStorage or state
//     localStorage.setItem("email", email);
//     localStorage.setItem("username", username);
//     localStorage.setItem("password", password); // In a real-world app, this should be hashed and stored securely

//     onLogin();
//     navigate("/moodtracker"); // Navigate to the MoodTracker page after login
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Email:</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             style={{ padding: "10px", margin: "5px 0", width: "80%" }}
//           />
//         </div>
//         <div>
//           <label>Username:</label>
//           <input
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//             style={{ padding: "10px", margin: "5px 0", width: "80%" }}
//           />
//         </div>
//         <div>
//           <label>Password:</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             style={{ padding: "10px", margin: "5px 0", width: "80%" }}
//           />
//         </div>
//         <button type="submit" style={{ padding: "10px", marginTop: "10px" }}>
//           Login
//         </button>
//       </form>
//     </div>
//   );
// };

// // Main App Component
// const App = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     const storedEmail = localStorage.getItem("email");
//     const storedUsername = localStorage.getItem("username");
//     if (storedEmail && storedUsername) {
//       setIsLoggedIn(true);
//     }
//   }, []);

//   const handleLogin = () => {
//     setIsLoggedIn(true);
//   };

//   return (
//     <Router>
//       <Routes>
//         <Route
//           path="/login"
//           element={<Login onLogin={handleLogin} />}
//         />
//         <Route
//           path="/moodtracker"
//           element={isLoggedIn ? <MoodTracker /> : <Navigate to="/login" />}
//         />
//         <Route
//           path="/"
//           element={isLoggedIn ? <Navigate to="/moodtracker" /> : <Navigate to="/login" />}
//         />
//       </Routes>
//     </Router>
//   );
// };

// export default App;









import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./App.css";

// Mood Tracker component
const MoodTracker = () => {
  const [entryText, setEntryText] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [entries, setEntries] = useState(() => {
    const savedEntries = localStorage.getItem("journalEntries");
    return savedEntries ? JSON.parse(savedEntries) : [];
  });

  useEffect(() => {
    localStorage.setItem("journalEntries", JSON.stringify(entries));
  }, [entries]);

  const handleAddEntry = async () => {
    if (!entryText.trim()) {
      alert("Please write something.");
      return;
    }

    const sentiment = await analyzeData(entryText || "I'm Good!");

    const newEntry = {
      id: Date.now(),
      text: entryText,
      date: selectedDate.toLocaleString(),
      sentiment,
    };

    setEntries((prevEntries) => [...prevEntries, newEntry]);
    setEntryText("");
  };

  const analyzeData = async (myFeelings) => {
    const mockSentiments = [
      "Sad", "Happy", "Confused", "Disturbed", "Demotivated", "Happiness",
      "Excitement", "Delight", "Contentment", "Amusement", "Gratitude", "Pride",
      "Serenity", "Hope", "Love", "Affection", "Compassion", "Warmth", "Tenderness",
      "Inspiration", "Awe", "Admiration", "Enthusiasm", "Relaxation", "Peacefulness",
      "Satisfaction", "Anger", "Rage", "Annoyance", "Irritation", "Resentment",
      "Sadness", "Grief", "Loneliness", "Disappointment", "Heartache", "Despair",
      "Fear", "Anxiety", "Nervousness", "Worry", "Insecurity", "Panic", "Apprehension",
      "Disgust", "Revulsion", "Contempt", "Loathing", "Guilt", "Shame", "Regret",
      "Embarrassment", "Humiliation", "Curiosity", "Surprise", "Nostalgia", "Longing",
      "Melancholy", "Bittersweetness", "Love-hate", "Relief mixed with sadness", 
      "Hope mixed with fear",
    ];
    return mockSentiments[Math.floor(Math.random() * mockSentiments.length)];
  };

  const handleDeleteEntry = (id) => {
    setEntries((prevEntries) => prevEntries.filter((entry) => entry.id !== id));
  };

  const handleEditEntry = (id) => {
    const entryToEdit = entries.find((entry) => entry.id === id);
    setEntryText(entryToEdit.text);
    handleDeleteEntry(id);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const entriesForSelectedDate = entries.filter((entry) =>
    new Date(entry.date).toLocaleDateString() === selectedDate.toLocaleDateString()
  );

  return (
    <div className="moodtracker-container">
      <h1>Mood Tracker</h1>
      <div className="calendar-container">
        <Calendar onChange={handleDateChange} value={selectedDate} />
      </div>

      <div className="entry-input">
        <input
          type="text"
          value={entryText}
          onChange={(e) => setEntryText(e.target.value)}
          placeholder="Write your journal entry..."
        />
        <button onClick={handleAddEntry}>Add Entry</button>
      </div>

      <div className="entry-list">
        <h3>All Entries</h3>
        {entries.length === 0 ? (
          <p>No entries yet.</p>
        ) : (
          entries.map((entry) => (
            <div className="entry" key={entry.id}>
              <p><strong>{entry.date}</strong></p>
              <p>{entry.text}</p>
              <p className="sentiment">Sentiment: {entry.sentiment}</p>
              <div className="entry-actions">
                <button onClick={() => handleEditEntry(entry.id)} className="edit-btn">Edit</button>
                <button onClick={() => handleDeleteEntry(entry.id)} className="delete-btn">Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// Login Component
const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Save the login details to localStorage
    localStorage.setItem("email", email);
    localStorage.setItem("username", username);
    localStorage.setItem("password", password); // This should be securely handled in real applications

    onLogin();
    navigate("/moodtracker"); // Navigate to the MoodTracker page after login
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input-field"
          />
        </div>
        <button type="submit" className="login-btn">Login</button>
      </form>
    </div>
  );
};

// Main App Component
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    const storedUsername = localStorage.getItem("username");
    if (storedEmail && storedUsername) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={<Login onLogin={handleLogin} />}
        />
        <Route
          path="/moodtracker"
          element={isLoggedIn ? <MoodTracker /> : <Navigate to="/login" />}
        />
        <Route
          path="/"
          element={isLoggedIn ? <Navigate to="/moodtracker" /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
