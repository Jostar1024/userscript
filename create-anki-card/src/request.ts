async function postData(url = "", data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

// anki relies on the addons `anki-connect` to provide a remote API.
// The repo https://git.foosoft.net/alex/anki-connect
export function toDesktop({ deckName, modelName, fields, tags }): {result: number, error: string} {
  return postData("http://localhost:8765", {
    action: "addNote",
    version: 6,
    params: {
      note: {
        deckName: deckName,
        modelName: modelName,
        fields: fields,
        options: {
          allowDuplicate: false,
          duplicateScope: "deck",
          duplicateScopeOptions: {
            deckName: deckName,
            checkChildren: false,
            checkAllModels: false,
          },
        },
        tags: tags,
      },
    },
  });
}
// {
//       note: {
//         deckName: "experiment",
//         modelName: "basic",
//         fields: { Front: "front content", Back: "back content" },
//         options: {
//           allowDuplicate: false,
//           duplicateScope: "deck",
//           duplicateScopeOptions: {
//             deckName: "Default",
//             checkChildren: false,
//             checkAllModels: false,
//           },
//         },
//         tags: ["yomichan"],
//       },
//     }
export function toMobile({ deckName, modelName, fields, tags }) {
  // var params = {
  //   profile: "User",
  //   type: "basic-clip",
  //   deck: "Default",
  //   fIdWord: "nil",
  //   fIdSentence: selection,
  //   "fIdSource-Name": title,
  //   "fIdSource-Link": link,
  //   fIdTranslation: translation,
  // };
  // params.
  // output url
  // open the url
  const fieldsParams = Object.entries(fields).reduce(
    (acc, [key, value]) => ({ ...acc, ["fId" + key]: value }),
    {},
  );
  const params = {
    profile: "User",
    type: modelName,
    deck: deckName,
    ...fieldsParams,
  };

  const queryParams = Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
  const resultUrl = encodeURI(`anki://x-callback-url/addnote?${queryParams}`);
  console.log(resultUrl);
}
