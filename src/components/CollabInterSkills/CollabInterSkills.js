import React, { useState } from 'react';
import axios from 'axios';

const CollabInterSkills = ({ keywords }) => {
  const [collabInterSkillsQuestions, setCollabInterSkillsQuestions] = useState([]);

  const generateCollabInterSkillsQuestions = () => {
    // Make the API request to generate questions
    const apiUrl = '/v1/chat/completions';
    const payload = {
      model: 'bud-v0.2',
      messages: [
        {
          role: 'user',
          content: `Instruction: Generate questions based on the following keywords: ${keywords} for analyzing the Collaboration & Interpersonal skills. Instruction: The questions should be formulated to identify the personality of the particular person.`,
        },
      ],
    };

    axios
      .post(apiUrl, payload)
      .then((response) => {
        // Process the response and extract the questions
        const generatedCollabInterSkillsQuestions = response.data.choices[0].message.content.split('\n');
        setCollabInterSkillsQuestions(generatedCollabInterSkillsQuestions);
      })
      .catch((error) => {
        console.error('Error generating keyword questions:', error);
      });
  };

  return (
    <div className="response">
      <h3>Collaboration & Interpersonal Skills</h3>
      <button onClick={generateCollabInterSkillsQuestions}>Generate C&I Questions</button>
      <ul>
        {collabInterSkillsQuestions.map((question, index) => (
          <li key={index}>{question}</li>
        ))}
      </ul>
    </div>
  );
};

export default CollabInterSkills;
