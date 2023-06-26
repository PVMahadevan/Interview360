import './App.css';
import React, { useState } from 'react';
import axios from 'axios';
import CompanyLogo from './company-logo.png';
import CollabInterSkills from './components/CollabInterSkills/CollabInterSkills';
import './components/CollabInterSkills/CollabInterSkills.css';
import TechnicalProficiency from './components/TP/TechnicalProficiency';
import CommunicationSkills from './components/CommunicationSkills/CommunicationSkills';
import ContinuousLearning from './components/ContinuousLearning/ContinuousLearning';
import ProblemSolvingSkills from './components/ProblemSolvingSkills/ProblemSolvingSkills';
import AdaptabilityandFlexibility from './components/AdaptabilityandFlexibility/AdaptabilityandFlexibility';
import LeadershipSkills from './components/LeadershipSkills/LeadershipSkills';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const App = () => {
  const [designation, setDesignation] = useState('');
  const [keywords, setKeywords] = useState('');

  const handleDesignationChange = (event) => {
    setDesignation(event.target.value);
  };

  const handleKeywordsChange = (event) => {
    setKeywords(event.target.value);
  };

  const isFormValid = designation.trim() !== '' && keywords.trim() !== '';

  return (
    <div className="App">
      <div className="logo-container">
        <img src={CompanyLogo} alt="Logo" />
      </div>

      <header className="App-header">
        <h1>Interview360</h1>
      </header>

      <div className="input-container">
        <label htmlFor="designation">Designation:</label>
        <input
          type="text"
          id="designation"
          value={designation}
          onChange={handleDesignationChange}
        />

        <label htmlFor="keywords">Keywords:</label>
        <input
          type="text"
          id="keywords"
          value={keywords}
          onChange={handleKeywordsChange}
        />
      </div>

      <div className="question-container">
        {isFormValid && (
          <Carousel
            showThumbs={false}
            showArrows={true}
            infiniteLoop={true}
            emulateTouch={true}
          >
            <div>
              <TechnicalProficiency keywords={keywords} />
            </div>
            <div>
              <CollabInterSkills keywords={keywords} />
            </div>
            <div>
              <CommunicationSkills keywords={keywords} />
            </div>
            <div>
              <ContinuousLearning keywords={keywords} />
            </div>
            <div>
              <ProblemSolvingSkills keywords={keywords} />
            </div>
            <div>
              <AdaptabilityandFlexibility keywords={keywords} />
            </div>
            <div>
              <LeadershipSkills keywords={keywords} />
            </div>
          </Carousel>
        )}
      </div>
    </div>
  );
};

export default App;
