import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './App.css';

const App = () => {
  const [entryText, setEntryText] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [entries, setEntries] = useState(() => {
    const savedEntries = localStorage.getItem('journalEntries');
    return savedEntries ? JSON.parse(savedEntries) : [];
  });

  useEffect(() => {
    localStorage.setItem('journalEntries', JSON.stringify(entries));
  }, [entries]);

  const handleAddEntry = async () => {
    if (!entryText.trim()) {
      alert('Please write something.');
      return;
    }

    const { sentiment, suggestion } = await analyzeData(entryText || "I'm Good!");

    const newEntry = {
      id: Date.now(),
      text: entryText,
      date: selectedDate.toLocaleString(),
      sentiment,
      suggestion,
    };

    setEntries((prevEntries) => [...prevEntries, newEntry]);
    setEntryText('');
  };

  const analyzeData = async (myFeelings) => {
    const sentimentSuggestions = {
      'Sad': 'Consider talking to a friend or taking a walk outside.',
      'Happy': 'Enjoy the moment and spread positivity!',
      'Confused': 'Take a deep breath and try to think things through.',
      'Demotivated': 'Start with small tasks and give yourself a break.',
      'Gratitude': 'Take a moment to reflect on what you’re thankful for.',
      'Fear': 'It’s okay to be afraid, try to focus on what you can control.',
      'Anger': 'Take a few deep breaths and reflect on the cause of your anger.',
    };

    const mockSentiments = [
      'Sad', 'Happy', 'Confused', 'Demotivated', 'Gratitude', 'Fear', 'Anger',
      'Excitement', 'Contentment', 'Amusement', 'Surprise', 'Hope', 'Love',
      'Compassion', 'Inspiration', 'Relief', 'Satisfaction'
    ];

    const sentiment = mockSentiments[Math.floor(Math.random() * mockSentiments.length)];

    const suggestion = sentimentSuggestions[sentiment] || 'Take care of yourself!';

    return { sentiment, suggestion };
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
    <div style={{ padding: '20px' }}>
      <h1>Mood Tracker</h1>
      
      <div style={{ marginBottom: '20px', maxWidth: '400px', margin: '0 auto' }}>
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
        />
      </div>

      <div style={{ margin: '20px 0' }}>
        <input
          type="text"
          value={entryText}
          onChange={(e) => setEntryText(e.target.value)}
          placeholder="Write your journal entry..."
          style={{ padding: '10px', width: '80%' }}
        />
        <button onClick={handleAddEntry} style={{ padding: '10px', marginLeft: '10px' }}>
          Add Entry
        </button>
      </div>

      <div>
        <h3>All Entries</h3>
        {entries.length === 0 ? (
          <p>No entries yet.</p>
        ) : (
          entries.map((entry) => (
            <div key={entry.id} className="entry" style={{ border: '1px solid #ccc', margin: '10px 0', padding: '10px' }}>
              <p><strong>{entry.date}</strong></p>
              <p>{entry.text}</p>
              <p style={{ fontWeight: 'bold', color: '#555' }}>Sentiment: {entry.sentiment}</p>
              <p><em>Suggestion: {entry.suggestion}</em></p>
              <div>
                <button onClick={() => handleEditEntry(entry.id)} style={{ marginRight: '10px' }}>
                  Edit
                </button>
                <button onClick={() => handleDeleteEntry(entry.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default App;
