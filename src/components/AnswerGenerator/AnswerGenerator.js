import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AnswerGenerator = ({ questions }) => {
  const [answers, setAnswers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAnswers = async () => {
      setIsLoading(true);
      try {
        // Make the API call to fetch answers for the questions
        const response = await axios.post('/api/answers', { questions });
        setAnswers(response.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError('Failed to fetch answers. Please try again.');
      }
    };

    fetchAnswers();
  }, [questions]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Generated Answers</h2>
      {answers.map((answer, index) => (
        <div key={index} className="answer">
          <h3>Question {index + 1}</h3>
          <p>{answer}</p>
        </div>
      ))}
    </div>
  );
};

export default AnswerGenerator;
