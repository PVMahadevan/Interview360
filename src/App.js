import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import CompanyLogo from './company-logo.png';
import CollabInterSkills from './components/CollabInterSkills/CollabInterSkills';
import './components/CollabInterSkills/CollabInterSkills.css';
import TechnicalProficiency from './components/TP/TechnicalProficiency';
import './components/TP/TechnicalProficiency.css';
import CommunicationSkills from './components/CommunicationSkills/CommunicationSkills';
import ContinuousLearning from './components/ContinuousLearning/ContinuousLearning';
import ProblemSolvingSkills from './components/ProblemSolvingSkills/ProblemSolvingSkills';
import AdaptabilityandFlexibility from './components/AdaptabilityandFlexibility/AdaptabilityandFlexibility';
import LeadershipSkills from './components/LeadershipSkills/LeadershipSkills';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const App = () => {
  const [designation, setDesignation] = useState('');
  const [keywords, setKeywords] = useState('');
  const [generatedQuestions, setGeneratedQuestions] = useState([]);


  const skillsData = [
    {
      name: 'Technical Proficiency',
      component: <TechnicalProficiency keywords={keywords} designation={designation} />,
    },
    {
      name: 'Problem Solving Skills',
      component: <ProblemSolvingSkills keywords={keywords} designation={designation} />,
    },
    {
      name: 'Continuous Learning',
      component: <ContinuousLearning keywords={keywords} designation={designation} />,
    },
    {
      name: 'Communication Skills',
      component: <CommunicationSkills keywords={keywords} designation={designation} />,
    },
    {
      name: 'Collaboration & Interpersonal Skills',
      component: <CollabInterSkills keywords={keywords} designation={designation} />,
    },
    {
      name: 'Adaptability and Flexibility Skills',
      component: <AdaptabilityandFlexibility keywords={keywords} designation={designation} />,
    },
    {
      name: 'Leadership Skills',
      component: <LeadershipSkills keywords={keywords} designation={designation} />,
    },
  ];

  const handleDesignationChange = (event) => {
    setDesignation(event.target.value);
  };

  const handleKeywordsChange = (event) => {
    setKeywords(event.target.value);
  };

  const handleButtonClick = async () => {
    if (isFormValid) {
      try {
        // Make a POST request to the API with the entered keywords and designation
        const response = await axios.post('http://127.0.0.1:8000/download-resumes', {
          username: 'mahadevan@accubits.com', // Replace with your LinkedIn username
          password: 'Maha@1991', // Replace with your LinkedIn password
          keywords: keywords,
          designation: designation,
          num_pages: 5, // Replace with the number of pages you want to search on LinkedIn
        });

        // Update the state with the generated questions
        setGeneratedQuestions(response.data);
        // Set showAnswerGenerator to true to display the generated questions
      } catch (error) {
        console.error('Failed to search LinkedIn:', error);
      }
    }
  };

  const handleSkillButtonClick = (skill) => {
    // You can set some state or perform an action based on the clicked skill
    // For example, you might want to show a component related to the selected skill
    console.log(`Skill button clicked: ${skill}`);
  };

  const isFormValid = designation.trim() !== '' && keywords.trim() !== '';

  return (
    <div className="App">
      <header className="App-header">
        <div className="logo-container">
          <img src={CompanyLogo} alt="Logo" />
        </div>
        <p className="interview_logo">Interview 360</p>
      </header>

      <div className="input-container">
        <div className="text-inputs">
          <label htmlFor="designation">Designation:</label>
          <input
            type="text"
            id="designation"
            value={designation} required
            onChange={handleDesignationChange}
          />

          <label htmlFor="keywords">Keywords:</label>
          <input
            type="text"
            id="keywords"
            value={keywords} required
            onChange={handleKeywordsChange}
          />
        </div>
        <Button variant="primary" className="search_linkedin" onClick={handleButtonClick}>Search LinkedIn</Button>
      </div>

 <Row xs={1} md={2} className="g-4">
      {skillsData.map((skill, idx) => (
        <Col key={idx}>
          <Card>
            <Card.Body>
              <Card.Text>
                {skill.component}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>

      {isFormValid && (
        <div className="answer-container">
          <h2>Generated Questions:</h2>
          <div className="question-list">
            {generatedQuestions.map((question, index) => (
              <div key={index} className="question-item">
                <h3>Question {index + 1}</h3>
                <p>{question}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
