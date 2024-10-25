import React, { useState } from "react";
import { toDesktop } from "./request.ts";
import "./App.css";
import { log } from "./utils";
import Card from "./Card.tsx";

const getSentence = () => {
  const sentence = window.getSelection().toString();
  return sentence == ""
    ? "This domain is for use in illustrative examples in documents. You may use this domain in literature without prior coordination or asking for permission."
    : sentence;
};

const createAnkiCard = async ({ word, sentence, title, link, translation }) => {
  const { result, error } = await toDesktop({
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
  console.log(result, error);
};
const translate = (sentence) => sentence;

function App() {
  const [word, setWord] = useState("");

  const sentence = getSentence();
  const title = document.title;
  const link = document.location.href;
  const translation = translate(sentence);

  /* const translation = translate(selection); */
  return (
    <div>
      <div
        id="default-modal"
        tabindex="-1"
        class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full flex"
      >
        <div class="relative p-4 w-full max-w-2xl max-h-full">
          <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <Card sentence={sentence} title={title} translation={translation} />
          </div>
        </div>
      </div>
      {/* backdrop */}
      <div class="bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40"></div>
    </div>
  );
}

export default App;
