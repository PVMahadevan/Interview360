import React, { useState } from 'react';
import axios from 'axios';

const LeadershipSkills = ({ keywords }) => {
  const [leadershipSkillsQuestions, setLeadershipSkillsQuestions] = useState([]);

  const generateLeadershipSkillsQuestions = () => {
    // Make the API request to generate questions
    const apiUrl = '/v1/chat/completions';
    const payload = {
      model: 'bud-v0.2',
      messages: [
        {
          role: 'user',
          content: `Instruction: Generate 3 interview questions for Leadership Skills based on the following keywords: ${keywords}`,
        },
      ],
    };

    axios
      .post(apiUrl, payload)
      .then((response) => {
        // Process the response and extract the questions
        const generatedLeadershipSkillsQuestions = response.data.choices[0].message.content.split('\n');
        setLeadershipSkillsQuestions(generatedLeadershipSkillsQuestions);
      })
      .catch((error) => {
        console.error('Error generating leadership skills questions:', error);
      });
  };

  return (
    <div className="response">
      <h3>Leadership Skills</h3>
      <button onClick={generateLeadershipSkillsQuestions}>Generate Leadership Skills Questions</button>
      <ul>
        {/* Render the questions using the leadershipSkillsQuestions state */}
        {leadershipSkillsQuestions.map((question, index) => (
          <li key={index}>{question}</li>
        ))}
      </ul>
    </div>
  );
};

export default LeadershipSkills;
