import React, { useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';

const TechnicalProficiency = ({ keywords }, { designation }) => {
  const [questions, setQuestions] = useState([]);
  const [answers, ] = useState([]);

  const generateQuestions = () => {
    // Make the API request to generate questions
    const apiUrl = '/v1/chat/completions';
    const payload = {
      model: 'bud-v0.2',
      messages: [
        {
          role: 'user',
          content: `Please create a set of three interview questions designed to evaluate candidates technical proficiency in relation to the specific role of ${designation}. These questions should focus on assessing the candidates depth of domain knowledge, practical skills, and overall expertise in the field. Incorporate the provided keywords ${keywords} to ensure the questions effectively target the required qualifications.`,
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
//        generateProbableAnswers(generatedQuestions);
      })
      .catch((error) => {
        console.error('Error generating questions:', error);
      });
  };

//  const generateProbableAnswers = (questions) => {
//    // Create an array to store the generated answers
//    const generatedAnswers = [];
//
//    // Iterate through each question
//    questions.forEach((question, index) => {
//      // Make the API request to generate an answer for the question
//      const apiUrl = '/v1/chat/completions';
//      const payload = {
//        model: 'bud-v0.2',
//        messages: [
//          {
//            role: 'user',
//            content: `Roleplay as an interview candidate and provide a response to the following question: ${question} in an ideal manner.`,
//          },
//        ],
//      };
//
//      axios
//        .post(apiUrl, payload)
//        .then((response) => {
//          // Process the response and extract the answer
//          const generatedAnswer = response.data.choices[0].message.content;
//
//          // Add the answer to the generatedAnswers array at the corresponding index
//          generatedAnswers[index] = generatedAnswer;
//
//          // Check if all answers have been generated
//          if (generatedAnswers.length === questions.length) {
//            // Set the answers state once all answers have been generated
//            setAnswers(generatedAnswers);
//          }
//        })
//        .catch((error) => {
//          console.error('Error generating probable answer:', error);
//        });
//    });
//  };

  return (
    <div className="response">
      <h3>Technical Proficiency</h3>
      <Button variant="primary" onClick={generateQuestions}>Generate Technical Proficiency</Button>
      <div className="questions-answers">
        <ul style={{ textAlign: 'left' }}>
          {/* Render the questions using the questions state */}
          {questions.map((question, index) => (
            <React.Fragment key={index}>
              <li>{question}</li>
              {answers[index] && (
                <li>
                  <strong>Answer: </strong>
                  {answers[index].split('\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </li>
              )}
            </React.Fragment>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TechnicalProficiency;
