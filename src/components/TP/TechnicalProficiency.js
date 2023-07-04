import React, { useState } from 'react';
import axios from 'axios';

const TechnicalProficiency = ({ keywords }, {designation}) => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);

  const generateQuestions = () => {
    // Make the API request to generate questions
    const apiUrl = '/v1/chat/completions';
    const payload = {
      model: 'bud-v0.2',
      messages: [
        {
          role: 'user',
          content: `Instruction: Create a set of three targeted interview questions that effectively assess the candidates Technical Proficiency in alignment with the specific role of ${designation}. These questions should aim to evaluate the candidates depth of domain knowledge, practical skills, and overall expertise in the field, incorporating the provided keywords ${keywords}.`,
           },
      ],
    };

    axios
      .post(apiUrl, payload)
      .then((response) => {
        // Process the response and extract the questions
        const generatedQuestions = response.data.choices[0].message.content.split('\n');
        setQuestions(generatedQuestions);

        // Generate probable answers for the questions
        generateProbableAnswers(generatedQuestions);
      })
      .catch((error) => {
        console.error('Error generating questions:', error);
      });
  };

  const generateProbableAnswers = (questions) => {
    // Create an array to store the generated answers
    const generatedAnswers = [];

    // Iterate through each question
    questions.forEach((question, index) => {
      // Make the API request to generate an answer for the question
      const apiUrl = '/v1/chat/completions';
      const payload = {
        model: 'bud-v0.2',
        messages: [
          {
            role: 'user',
            content: `Roleplay as an interview candidate and provide a well-thought-out response to the following question: ${question}`,
          },
        ],
      };

      axios
        .post(apiUrl, payload)
        .then((response) => {
          // Process the response and extract the answer
          const generatedAnswer = response.data.choices[0].message.content;

          // Add the answer to the generatedAnswers array at the corresponding index
          generatedAnswers[index] = generatedAnswer;

          // Check if all answers have been generated
          if (generatedAnswers.length === questions.length) {
            // Set the answers state once all answers have been generated
            setAnswers(generatedAnswers);
          }
        })
        .catch((error) => {
          console.error('Error generating probable answer:', error);
        });
    });
  };


  return (
    <div className="response">
      <h3>Technical Proficiency</h3>
      <button onClick={generateQuestions}>Generate Technical Proficiency Questions</button>
      <div className="questions-answers">
        <ul>
          {/* Render the questions using the questions state */}
          {questions.map((question, index) => (
            <li key={index}>{question}</li>
          ))}
        </ul>
        <ul>
          {/* Render the probable answers using the answers state */}
          {answers.map((answer, index) => (
            <React.Fragment key={index}>
              <li>
                <strong>Answer: </strong>
                {answer.split('\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p> // Change li to p here
                ))}
              </li>
            </React.Fragment>
          ))}
        </ul>

      </div>
    </div>
  );
};

export default TechnicalProficiency;
