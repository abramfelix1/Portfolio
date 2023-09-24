import React, { useContext } from "react";
import { ViewContext } from "./context/ViewContext";

export default function ContactPage() {
  const { setShowContact } = useContext(ViewContext);

  return (
    <div
      className="flex justify-center items-center w-full h-full text-white pointer-events-auto z-50"
      onClick={() => {
        setShowContact(false);
      }}
    >
      <div
        className="flex flex-col w-fit h-fit gap-y-5 bg-amber-800 rounded-md border-2 p-10"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <p>Resume</p>
        <p>Github</p>
        <p>Linkedin</p>
        <p>abramfelix1@gmail.com</p>
      </div>
    </div>
  );
}
