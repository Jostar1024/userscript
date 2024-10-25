import React, { useRef, useLayoutEffect } from "react";
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
  const dialog = useRef();
  useLayoutEffect(() => {
    dialog.current.showModal();
  }, [dialog]);
  const sentence = getSentence();
  const title = document.title;
  const link = document.location.href;
  const translation = translate(sentence);

  /* const translation = translate(selection); */
  return (
    <dialog
      class="backdrop:bg-gray-900/50
             overflow-y-auto overflow-x-hidden fixed justify-center items-center
             w-full
             rounded-lg
             shadow
             flex
             md:w-1/2
             "
      ref={dialog}
    >
      <div class="relative">
        <Card sentence={sentence} title={title} translation={translation} />
      </div>
    </dialog>
  );
}

export default App;
