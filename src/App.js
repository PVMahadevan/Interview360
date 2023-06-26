import './App.css';
import React, { useState } from 'react';
import axios from 'axios';
import CollabInterSkills from './components/CollabInterSkills/CollabInterSkills';
import './components/CollabInterSkills/CollabInterSkills.css';
import TechnicalProficiency from './components/TP/TechnicalProficiency';
import CommunicationSkills from './components/CommunicationSkills/CommunicationSkills';
import ContinuousLearning from './components/ContinuousLearning/ContinuousLearning';
import ProblemSolvingSkills from './components/ProblemSolvingSkills/ProblemSolvingSkills';
import AdaptabilityandFlexibility from'./components/AdaptabilityandFlexibility/AdaptabilityandFlexibility';
import LeadershipSkills from './components/LeadershipSkills/LeadershipSkills';

const App = () => {
  const [designation, setDesignation] = useState('');
  const [keywords, setKeywords] = useState('');


  const handleDesignationChange = (event) => {
    setDesignation(event.target.value);
  };

  const handleKeywordsChange = (event) => {
    setKeywords(event.target.value);
  };



  return (
    <div className="App">
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
        <h2>Generated Questions</h2>

     <TechnicalProficiency keywords={keywords}/>
     <CollabInterSkills keywords={keywords} />
     <CommunicationSkills keywords={keywords} />
     <ContinuousLearning keywords={keywords} />
     <ProblemSolvingSkills keywords={keywords} />
     <AdaptabilityandFlexibility keywords={keywords} />
     <LeadershipSkills keywords={keywords} />
      </div>
    </div>
  );
};

export default App;
