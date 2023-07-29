import React, { useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';

const LeadershipSkills = ({ keywords }) => {
  const [leadershipSkillsQuestions, setLeadershipSkillsQuestions] = useState([]);
  const [leadershipSkillsAnswers, setLeadershipSkillsAnswers] = useState([]);

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

        // Generate probable answers for the questions
//        generateProbableAnswers(generatedLeadershipSkillsQuestions);
      })
      .catch((error) => {
        console.error('Error generating leadership skills questions:', error);
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
//        const generatedLeadershipSkillsAnswers = response.data.choices.map((choice) => choice.message.content);
//        setLeadershipSkillsAnswers(generatedLeadershipSkillsAnswers);
//      })
//      .catch((error) => {
//        console.error('Error generating probable answers:', error);
//      });
//  };

  return (
    <div className="response">
       <Button variant="primary" onClick={generateLeadershipSkillsQuestions}>Generate Leadership Skills</Button>
       <div className="questions-answers">
                    <ul style={{ textAlign: 'left' }}>
                      {/* Render the questions using the adaptabilityFlexibilityQuestions state */}
                      {leadershipSkillsQuestions.map((question, index) => (
                        <React.Fragment key={index}>
                          <li>{question}</li>
                          {leadershipSkillsAnswers[index] && (
                            <li>
                              <strong>Answer: </strong>
                              {leadershipSkillsAnswers[index].split('\n').map((paragraph, index) => (
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

export default LeadershipSkills;
