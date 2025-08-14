"use client";
import { FC } from "react";
import Image from "next/image";

const About: FC = () => {
  return (
    <div className="h-dvh">
      <h1 className="m-4 mb-10 text-center text-2xl font-bold text-(--color-bg-button)">
        About me
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
          <p>
            I&apos;m a frontend developer and JavaScript instructor with 13
            years of experience. My students have gone on to build their careers
            across the globe — from EPAM to Google, from Sweden to Japan.
            Although I was dismissed from BSU, I remain undeterred: when one
            when one reality closes, another can be found… or simply opened with
            a portal.
          </p>
          <p>
            Inspired by art and travel, I channel creative chaos into structured
            code. I love transforming complex ideas into intuitive interfaces —
            whether it&apos;s a landing page for an intergalactic corporation or
            a control panel for a portal gun.
          </p>
          <p>
            <strong>“Oh geez, Morty, it works!”</strong> — that&apos;s usually
            what people say when they land on one of my sites.
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
