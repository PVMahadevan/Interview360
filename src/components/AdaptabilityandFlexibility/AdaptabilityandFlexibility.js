import React, { useState } from 'react';
import axios from 'axios';

const AdaptabilityandFlexibility = ({ keywords }) => {
  const [adaptabilityFlexibilityQuestions, setAdaptabilityFlexibilityQuestions] = useState([]);

  const generateAdaptabilityFlexibilityQuestions = () => {
    // Make the API request to generate questions
    const apiUrl = '/v1/chat/completions';
    const payload = {
      model: 'v0.2',
      messages: [
        {
          role: 'user',
          content: `Instruction: Generate 3 interview questions for Adaptability and Flexibility based on the following keywords: ${keywords}`,
        },
      ],
    };

    axios
      .post(apiUrl, payload)
      .then((response) => {
        // Process the response and extract the questions
        const generatedAdaptabilityFlexibilityQuestions = response.data.choices[0].message.content;
        setAdaptabilityFlexibilityQuestions(generatedAdaptabilityFlexibilityQuestions);
      })
      .catch((error) => {
        console.error('Error generating adaptability and flexibility questions:', error);
      });
  };

  return (
    <div className="response">
      <h3>Adaptability and Flexibility</h3>
      <button onClick={generateAdaptabilityFlexibilityQuestions}>Generate Adaptability and FlexibilityQuestions</button>
      <ul>
        {/* Render the questions using the adaptabilityFlexibilityQuestions state */}
        {adaptabilityFlexibilityQuestions}
      </ul>
    </div>
  );
};

export default AdaptabilityandFlexibility;
