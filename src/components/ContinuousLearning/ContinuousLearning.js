import React, { useState } from 'react';
import axios from 'axios';

const ContinuousLearning = ({ keywords }, {designation}) => {
  const [continuousLearningQuestions, setContinuousLearningQuestions] = useState([]);

  const generateContinuousLearningQuestions = () => {
    // Make the API request to generate questions
    const apiUrl = '/v1/chat/completions';
    const payload = {
      model: 'v0.2',
      messages: [
        {
          role: 'user',
          content: `Instruction: Generate 3 interview questions for Continuous Learning Mindset based on the following keywords: ${keywords}`,
        },
      ],
    };

    axios
      .post(apiUrl, payload)
      .then((response) => {
        // Process the response and extract the questions
        const generatedContinuousLearningQuestions = response.data.choices[0].message.content;
        setContinuousLearningQuestions(generatedContinuousLearningQuestions);
      })
      .catch((error) => {
        console.error('Error generating continuous learning questions:', error);
      });
  };

  return (
    <div className="response">
      <h3>Continuous Learning Mindset</h3>
      <button onClick={generateContinuousLearningQuestions}>Generate ContinuousLearning Questions</button>
      <ul>
        {/* Render the questions using the continuousLearningQuestions state */}
        {continuousLearningQuestions}
      </ul>
    </div>
  );
};

export default ContinuousLearning;
