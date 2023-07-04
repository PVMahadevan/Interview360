import React, { useState } from 'react';
import axios from 'axios';

const CollabInterSkills = ({ keywords }) => {
  const [collabInterSkillsQuestions, setCollabInterSkillsQuestions] = useState([]);
  const [collabInterSkillsAnswers, setCollabInterSkillsAnswers] = useState([]);

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

        // Generate probable answers for the questions
        generateProbableAnswers(generatedCollabInterSkillsQuestions);
      })
      .catch((error) => {
        console.error('Error generating Collaboration & Interpersonal Skills questions:', error);
      });
  };

  const generateProbableAnswers = (questions) => {
    // Make the API request to generate answers for the questions
    const apiUrl = '/v1/chat/completions';
    const payload = {
      model: 'bud-v0.2',
      messages: questions.map((question) => ({
        role: 'user',
        content: `Roleplay as an interview candidate and provide a well-thought-out response to the following question: ${question}`,
      })),
    };

    axios
      .post(apiUrl, payload)
      .then((response) => {
        // Process the response and extract the answers
        const generatedCollabInterSkillsAnswers = response.data.choices.map((choice) => choice.message.content);
        setCollabInterSkillsAnswers(generatedCollabInterSkillsAnswers);
      })
      .catch((error) => {
        console.error('Error generating probable answers:', error);
      });
  };

  return (
    <div className="response">
      <h3>Collaboration & Interpersonal Skills</h3>
      <button onClick={generateCollabInterSkillsQuestions}>Generate C&I Questions</button>
      <div className="questions-answers">
        <ul>
          {/* Render the questions using the collabInterSkillsQuestions state */}
          {collabInterSkillsQuestions.map((question, index) => (
            <li key={index}>{question}</li>
          ))}
        </ul>
        <ul>
          {/* Render the probable answers using the collabInterSkillsAnswers state */}
          {collabInterSkillsAnswers.map((answer, index) => (
            <li key={index}>{answer}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CollabInterSkills;
