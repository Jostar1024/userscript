import React, { useState } from "react";

const trim = (str) => {
  const res = str.trim();
  return [".", ",", "!", "?"].some((symbol) => res.endsWith(symbol))
    ? res.slice(0, -1)
    : res;
};

export default function Card({ sentence, title, translation, link }) {
  const [word, setWord] = useState("");
  const words = sentence.split(" ");

  const clickWord = (event) => {
    const word = trim(event.target.innerHTML);
    setWord(word);
    console.log("click word", word);
  };
  return (
    <>
      <div className="p-4 md:p-5 space-y-4 mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Word
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {word}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Sentence
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {words.map((word) => (
                <span onClick={clickWord}>{word} </span>
              ))}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Source-URL
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {link}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Source-Name
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {title}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Translation
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              empty
            </dd>
          </div>
        </dl>
        <button
          className="text-white pointer-events-auto rounded-md  px-3 py-2 text-[0.8125rem] font-semibold leading-5
                     bg-blue-700 hover:bg-blue-800
                     focus:ring-4 focus:outline-none focus:ring-blue-300"
          onClick={() => {
            createAnkiCard({ word, sentence, link, title, translation });
          }}
        >
          Create Anki Card
        </button>
      </div>
    </>
  );
}
