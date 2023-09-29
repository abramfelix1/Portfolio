import React, { useContext, useEffect } from "react";
import { ViewContext } from "../context/ViewContext";
import { Howl } from "howler";
export default function ContactPage() {
  const { setShowContact } = useContext(ViewContext);

  const menuExit = new Howl({
    src: ["./sounds/menuExit.mp3"],
    volume: 0.15,
    loop: false,
  });

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        setShowContact(false);
        menuExit.play();
      }
    };

    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [setShowContact]);

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
          <a
            href="https://github.com/abramfelix1"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </a>
          <a
            href="https://www.linkedin.com/in/abram-felix-98937b162/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a
            href="https://wellfound.com/u/abram-felix"
            target="_blank"
            rel="noopener noreferrer"
            className="select-text"
          >
            Wellfound
          </a>
          <a
            href="mailto:abramfelix1@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="select-text"
          >
            abramfelix1@gmail.com
          </a>
        </div>
      </div>
    </div>
  );
}
