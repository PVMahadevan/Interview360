import React, { useState } from 'react';
import axios from 'axios';


const TechnicalProficiency = () => {
    const [questions, setQuestions] = useState([]);

      const generateQuestions = () => {
        // Make the API request to generate questions
        const apiUrl = '/v1/chat/completions';
        const payload = {
          model: 'v0.2',
          messages: [
            {
              role: 'user',
              content: `Instruction: Generate 3 interview questions each for the following skills: Technical Proficiency, Collaboration and Interpersonal Skills, Continuous Learning Mindset, Communication Skills, Problem-Solving Skills, Adaptability and Flexibility, Leadership Skills. Think step by step to evaluate the candidate better.`,
            },
          ],
        };

        axios
          .post(apiUrl, payload)
          .then((response) => {
            // Process the response and extract the questions
            const generatedQuestions = response.data.choices[0].message.content;
            setQuestions(generatedQuestions);
          })
          .catch((error) => {
            console.error('Error generating questions:', error);
          });
      };

return(
<div className="response">
            <h3>Technical Proficiency</h3>
            <button onClick={generateQuestions}>Generate Technical Proficiency Questions</button>
            <ul>
              {questions}
            </ul>
         </div>
);

};

export default TechnicalProficiency;
