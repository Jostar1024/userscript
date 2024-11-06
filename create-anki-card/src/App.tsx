import React, { useState, useCallback } from "react";
import { toDesktop } from "./request.ts";
import styles from "./App.css?inline";
import { log } from "./utils";
import Card from "./Card.tsx";
import ReactShadowRoot from "./react-shadow-root.tsx";

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

function App({ container: container }) {
  const [dialog, setDialog] = useState(null);
  const dialogRef = useCallback((node) => {
    if (node !== null) {
      setDialog(node);
      container.style.display = "";
      node.showModal();
    }
  }, []);
  const sentence = getSentence();
  const title = document.title;
  const link = document.location.href;
  const translation = translate(sentence);

  const closeModal = (event) => {
    dialog.close();
    container.style.display = "none";
  };
  /* const translation = translate(selection); */
  return (
    <div>
      <ReactShadowRoot>
        <style>{styles}</style>
        <dialog
          className="backdrop:bg-gray-900/50
                     overflow-y-auto overflow-x-hidden
                     fixed justify-center items-center
                     w-full
                     rounded-lg
                     shadow
                     md:w-1/2
                     "
          ref={dialogRef}
          onCancel={closeModal}
        >
          <div className="">
            <div className="px-4 sm:px-0">
              <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-base font-semibold leading-7 text-gray-900">
                  Making (which type) Anki Card
                </h3>

                <button
                  class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={closeModal}
                >
                  <svg
                    class="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span class="sr-only">Close modal</span>
                </button>
              </div>
            </div>
            <Card sentence={sentence} title={title} translation={translation} />
          </div>
        </dialog>
      </ReactShadowRoot>
    </div>
  );
}

export default App;
