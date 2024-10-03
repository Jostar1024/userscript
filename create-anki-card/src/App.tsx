import React from "react";
import "./App.css";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

function App() {
  const selection = window.getSelection().toString();
  const title = document.title;
  const link = document.location.href;
  console.log("from App", link);
  /* const translation = translate(selection); */
  return (
    <AlertDialog>
      <AlertDialogTrigger class="bg-lime-200">Open <div class="bg-lime-200">but</div></AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>

          <p>{selection}</p>
          <p>{title}</p>
          <p>{link}</p>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default App;
