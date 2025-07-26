import React from 'react';
import opImage from '../assets/olga.jpg';
import reactLogo from '../assets/react.svg';

const About: React.FC = () => {
  return (
    <>
      <h1 className="m-4 mb-10 text-center text-2xl font-bold text-blue-600">About me</h1>
      <div className="m-4 flex flex-col gap-4 md:flex-row">
        <img src={opImage} alt="olga paklonskaya" />
        <div className="flex flex-col justify-center gap-4">
          <p>
            I&apos;m a frontend developer and JavaScript instructor with 13 years of experience. My
            students have gone on to build their careers across the globe — from EPAM to Google,
            from Sweden to Japan. Although I was dismissed from BSU, I remain undeterred: when one
            when one reality closes, another can be found… or simply opened with a portal.
          </p>
          <p>
            Inspired by art and travel, I channel creative chaos into structured code. I love
            transforming complex ideas into intuitive interfaces — whether it&apos;s a landing page
            for an intergalactic corporation or a control panel for a portal gun.
          </p>
          <p>
            <strong>“Oh geez, Morty, it works!”</strong> — that&apos;s usually what people say when
            they land on one of my sites.
          </p>
        </div>
      </div>
      <div className="flex justify-center">
        <a href="https://rs.school/courses/reactjs" target="_blank" rel="noreferrer">
          <img className="inline" src={reactLogo} width="50" alt="rs school logo" />
          <span className="text-cyan-700"> RS School: React Course</span>
        </a>
      </div>
    </>
  );
};

export default About;
