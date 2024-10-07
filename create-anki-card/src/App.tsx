import React, { useState } from "react";
import { toDesktop } from "./request.ts";
import "./App.css";
import { log } from "./utils";

const getSentence = () => {
  const sentence = window.getSelection().toString();
  return sentence == ""
    ? "This domain is for use in illustrative examples in documents. You may use this domain in literature without prior coordination or asking for permission."
    : sentence;
};

const trim = (str) => {
  const res = str.trim();
  return [".", ",", "!", "?"].some((symbol) => res.endsWith(symbol))
    ? res.slice(0, -1)
    : res;
};
const createAnkiCard = ({ word, sentence, title, link, translation }) => {
  toDesktop({
    deckName: "experiment",
    modelName: "basic-clip",
    fields: {
      Word: word,
      Sentence: sentence,
      "Source-Url": link,
      "Source-Name": title,
      Translation: translation,
    },
    tags: ["English"],
  });
};
const translate = (sentence) => sentence;

function App() {
  const [word, setWord] = useState("");

  const sentence = getSentence();
  const words = sentence.split(" ");
  const title = document.title;
  const link = document.location.href;
  const translation = translate(sentence);

  const clickWord = (event) => {
    const word = trim(event.target.innerHTML);
    setWord(word);
    console.log("click word", word);
  };
  /* const translation = translate(selection); */
  return (
    <div>
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">
          Making (which type) Anki Card
        </h3>
      </div>
      <div className="mt-6 border-t border-gray-100">
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
          className="pointer-events-auto rounded-md bg-indigo-600 px-3 py-2 text-[0.8125rem] font-semibold leading-5 text-white hover:bg-indigo-500"
          onClick={() => {
            createAnkiCard({ word, sentence, link, title, translation });
          }}
        >
          Create Anki Card
        </button>
      </div>
    </div>
  );
}

export default App;
