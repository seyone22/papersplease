// AnswersPage.js
//Doesn't work

/*component fetches the question and answers data from the server based on
 the questionId prop, displays the question along with a
 "Sort by Votes" button, and then lists the answers sorted by votes*/
import React, { useEffect, useState } from 'react';

const AnswersPage = ({ questionId }) => {
  // State to hold the question data
  const [question, setQuestion] = useState(null);

  // State to hold the answers data
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    // Fetch question and answers data from the API route
    fetch(`/*router code*/`)
      .then((response) => response.json())
      .then((data) => {
        setQuestion(data.question);
        setAnswers(data.answers);
      })
      .catch((error) => console.error('Error fetching question and answers:', error));
  }, [questionId]);

  // Function to sort answers by votes in descending order
  /*conditional rendering to display the answers when available, it maps through the answers 
  and displays each answer's text and votes*/
  const sortAnswersByVotes = () => {
    const sortedAnswers = [...answers].sort((a, b) => b.votes - a.votes);
    setAnswers(sortedAnswers);
  };

  return (
    <div>
      {/* Header */}
      <header>
        <h1>Answers Page</h1>
      </header>

      {/* Conditional rendering based on data */}
      {question ? (
        // Displaying the question if available
        <div>
          <h2>{question.title}</h2>
          <p>{question.body}</p>
        </div>
      ) : (
        // Displaying a loading message if question data is being fetched
        <div>Loading...</div>
      )}

      {/* Button to sort answers */}
      <button onClick={sortAnswersByVotes}>Sort by Votes</button>

      {/* Conditional rendering based on data */}
      {answers.length > 0 ? (
        // Displaying answers if available
        <div>
          <h3>Answers:</h3>
          <ul>
            {answers.map((answer) => (
              // Mapping through the answers and displaying each answer
              <li key={answer.id}>
                <p>{answer.text}</p>
                <p>Votes: {answer.votes}</p>
                {/* Displaying 'Superuser Upvoted' if the answer was upvoted by a superuser */}
                {answer.superuserUpvoted && <p>Superuser Upvoted</p>}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        // Displaying a message if no answers are available
        <div>No answers found.</div>
      )}
    </div>
  );
};

export default AnswersPage;
