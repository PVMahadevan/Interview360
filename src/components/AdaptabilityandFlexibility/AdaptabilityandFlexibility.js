import React, { useState } from 'react';
import axios from 'axios';

const AdaptabilityandFlexibility = ({ keywords }) => {
  const [adaptabilityFlexibilityQuestions, setAdaptabilityFlexibilityQuestions] = useState([]);
  const [adaptabilityFlexibilityAnswers, ] = useState([]);

  const generateAdaptabilityFlexibilityQuestions = () => {
    // Make the API request to generate questions
    const apiUrl = '/v1/chat/completions';
    const payload = {
      model: 'bud-v0.2',
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
        const generatedAdaptabilityFlexibilityQuestions = response.data.choices[0].message.content.split('\n');
        setAdaptabilityFlexibilityQuestions(generatedAdaptabilityFlexibilityQuestions);

        // Generate probable answers for the questions
//        generateProbableAnswers(generatedAdaptabilityFlexibilityQuestions);
      })
      .catch((error) => {
        console.error('Error generating adaptability and flexibility questions:', error);
      });
  };

//  const generateProbableAnswers = (questions) => {
//    // Make the API request to generate answers for the questions
//    const apiUrl = '/v1/chat/completions';
//    const payload = {
//      model: 'bud-v0.2',
//      messages: questions.map((question) => ({
//        role: 'user',
//        content: `Roleplay as an interview candidate and provide a well-thought-out response to the following question: ${question}`,
//      })),
//    };
//
//    axios
//      .post(apiUrl, payload)
//      .then((response) => {
//        // Process the response and extract the answers
//        const generatedAdaptabilityFlexibilityAnswers = response.data.choices.map((choice) => choice.message.content);
//        setAdaptabilityFlexibilityAnswers(generatedAdaptabilityFlexibilityAnswers);
//      })
//      .catch((error) => {
//        console.error('Error generating probable answers:', error);
//      });
//  };

  return (
    <div className="response">
      <h3>Adaptability and Flexibility</h3>
      <button onClick={generateAdaptabilityFlexibilityQuestions}>Generate Adaptability and Flexibility Questions</button>
      <div className="questions-answers">
              <ul style={{ textAlign: 'left' }}>
                {/* Render the questions using the adaptabilityFlexibilityQuestions state */}
                {adaptabilityFlexibilityQuestions.map((question, index) => (
                  <React.Fragment key={index}>
                    <li>{question}</li>
                    {adaptabilityFlexibilityAnswers[index] && (
                      <li>
                        <strong>Answer: </strong>
                        {adaptabilityFlexibilityAnswers[index].split('\n').map((paragraph, index) => (
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

export default AdaptabilityandFlexibility;
