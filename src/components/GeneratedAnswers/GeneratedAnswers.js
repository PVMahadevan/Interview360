import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './GeneratedAnswers.css';
import { Button } from 'react-bootstrap';

const GeneratedAnswers = ({ generatedQuestions, onDismiss }) => {
  return (
    <div className="generated-answers-container">
      <h2>Generated Answers:</h2>
      <Carousel showThumbs={false} showArrows={true} infiniteLoop={true} emulateTouch={true}>
        {generatedQuestions.map((question, index) => (
          <div key={index}>
            <h3>Question {index + 1}</h3>
            <p>{question}</p>
          </div>
        ))}
      </Carousel>
      <button className="next-button" onClick={onDismiss}>
        Next
      </button>
    </div>
  );
};

export default GeneratedAnswers;
