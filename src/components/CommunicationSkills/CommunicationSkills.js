import React, { useState } from 'react';
import axios from 'axios';

const CommunicationSkills = ({ keywords }, {designation}) => {
  const [communicationSkillsQuestions, setCommunicationSkillsQuestions] = useState([]);

  const generateCommunicationSkillsQuestions = () => {
    // Make the API request to generate questions
    const apiUrl = '/v1/chat/completions';
    const payload = {
      model: 'v0.2',
      messages: [
        {
          role: 'user',
          content: `Instruction: Generate 3 interview questions for Communication Skills based on the following keywords: ${keywords}`,
        },
      ],
    };

    axios
      .post(apiUrl, payload)
      .then((response) => {
        // Process the response and extract the questions
        const generatedCommunicationSkillsQuestions = response.data.choices[0].message.content;
        setCommunicationSkillsQuestions(generatedCommunicationSkillsQuestions);
      })
      .catch((error) => {
        console.error('Error generating communication skills questions:', error);
      });
  };

  return (
    <div className="response">
      <h3>Communication Skills</h3>
      <button onClick={generateCommunicationSkillsQuestions}>Generate Questions</button>
      <ul>
        {/* Render the questions using the communicationSkillsQuestions state */}
        {communicationSkillsQuestions}
      </ul>
    </div>
  );
};

export default CommunicationSkills;
