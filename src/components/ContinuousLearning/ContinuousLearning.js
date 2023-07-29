import React, { useState } from 'react';
import axios from 'axios';

const ContinuousLearning = ({ keywords }) => {
  const [continuousLearningQuestions, setContinuousLearningQuestions] = useState([]);
  const [continuousLearningAnswers, ] = useState([]);

  const generateContinuousLearningQuestions = () => {
    // Make the API request to generate questions
    const apiUrl = '/v1/chat/completions';
    const payload = {
      model: 'bud-v0.2',
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
        const generatedContinuousLearningQuestions = response.data.choices[0].message.content.split('\n');
        setContinuousLearningQuestions(generatedContinuousLearningQuestions);

        // Generate probable answers for the questions
//        generateProbableAnswers(generatedContinuousLearningQuestions);
      })
      .catch((error) => {
        console.error('Error generating continuous learning questions:', error);
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
//        const generatedContinuousLearningAnswers = response.data.choices.map((choice) => choice.message.content);
//        setContinuousLearningAnswers(generatedContinuousLearningAnswers);
//      })
//      .catch((error) => {
//        console.error('Error generating probable answers:', error);
//      });
//  };

  return (
    <div className="response">
      <h3>Continuous Learning Mindset</h3>
      <button onClick={generateContinuousLearningQuestions}>Generate Continuous Learning Questions</button>
       <div className="questions-answers">
                    <ul style={{ textAlign: 'left' }}>
                      {/* Render the questions using the adaptabilityFlexibilityQuestions state */}
                      {continuousLearningQuestions.map((question, index) => (
                        <React.Fragment key={index}>
                          <li>{question}</li>
                          {continuousLearningAnswers[index] && (
                            <li>
                              <strong>Answer: </strong>
                              {continuousLearningAnswers[index].split('\n').map((paragraph, index) => (
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

export default ContinuousLearning;
