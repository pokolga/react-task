"use client";
import { FC, useContext } from "react";
import Image from "next/image";
import { LanguageContext } from "../../context/language-context";
import { texts } from "../../models/texts";

const About: FC = () => {
  const { language } = useContext(LanguageContext);
  return (
    <div className="h-dvh">
      <h1 className="m-4 mb-10 text-center text-2xl font-bold text-(--color-bg-button)">
        {texts[language].about.about_me}
      </h1>
      <div className="m-8 flex flex-col gap-8 md:flex-row">
        <Image
          src="/olga.jpg"
          alt="olga paklonskaya"
          width={300}
          height={300}
          className="rounded-lg"
        />
        <div className="flex flex-col justify-center gap-4 text-(--color-text)">
          <p>{texts[language].about.first}</p>
          <p>{texts[language].about.second}</p>
          <p>
            <strong>“{texts[language].about.strong}”</strong>{" "}
            {texts[language].about.third}
          </p>
        </div>
      </div>
      <div className="mx-auto flex w-fit items-center justify-center rounded-sm bg-(--color-bg-button) p-4 text-(--color-text-button) hover:cursor-pointer hover:shadow-xl">
        <a
          href="https://rs.school/courses/reactjs"
          target="_blank"
          rel="noreferrer"
        >
          <Image
            className="inline"
            src="/react.svg"
            width={50}
            height={50}
            alt="rs school logo"
          />
          <span> RS School: React Course</span>
        </a>
      </div>
    </div>
  );
};

export default About;
