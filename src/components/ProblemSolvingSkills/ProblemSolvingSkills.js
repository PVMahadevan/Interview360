import React, { useState } from 'react';
import axios from 'axios';

const ProblemSolvingSkills = ({ keywords }) => {
  const [problemSolvingQuestions, setProblemSolvingQuestions] = useState([]);

  const generateProblemSolvingQuestions = () => {
    // Make the API request to generate questions
    const apiUrl = '/v1/chat/completions';
    const payload = {
      model: 'v0.2',
      messages: [
        {
          role: 'user',
          content: `Instruction: Generate 3 interview questions for Problem-Solving Skills based on the following keywords: ${keywords}`,
        },
      ],
    };

    axios
      .post(apiUrl, payload)
      .then((response) => {
        // Process the response and extract the questions
        const generatedProblemSolvingQuestions = response.data.choices[0].message.content;
        setProblemSolvingQuestions(generatedProblemSolvingQuestions);
      })
      .catch((error) => {
        console.error('Error generating problem-solving skills questions:', error);
      });
  };

  return (
    <div className="response">
      <h3>Problem-Solving Skills</h3>
      <button onClick={generateProblemSolvingQuestions}>Generate Problem Solving Skills Questions</button>
      <ul>
        {/* Render the questions using the problemSolvingQuestions state */}
        {problemSolvingQuestions}
      </ul>
    </div>
  );
};

export default ProblemSolvingSkills;
