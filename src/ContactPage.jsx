import React, { useContext } from "react";
import { ViewContext } from "./context/ViewContext";
import { Howl } from "howler";
export default function ContactPage() {
  const { setShowContact } = useContext(ViewContext);

  const menuExit = new Howl({
    src: ["./sounds/menuExit.mp3"],
    volume: 0.15,
    loop: false,
  });

  return (
    <div
      className="flex justify-center items-center w-full h-full text-white pointer-events-auto z-50"
      onClick={() => {
        setShowContact(false);
        menuExit.play();
      }}
    >
      <div className="flex flex-col w-fit h-fit bg-[rgb(245,158,11,0.5)] rounded-md border-[1px] p-2 select-none">
        <div
          className="flex flex-col w-fit h-fit gap-y-5 bg-amber-500 rounded-md border-[1px] p-8 select-none"
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
    </div>
  );
}
