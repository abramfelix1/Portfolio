import React, { useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ViewContext } from "../context/ViewContext";
import { Howl } from "howler";

export default function ProjectsPage() {
  const [hovered, setHovered] = useState("???");
  const { setShowProjects } = useContext(ViewContext);
  const [showPage, setShowPage] = useState(null);

  const projectNames = [
    "Seabnb",
    "Accord",
    "HeartBeats",
    "???",
    "???",
    "???",
    "???",
    "???",
    "???",
    "???",
    "???",
    "???",
    "???",
    "???",
    "???",
    "???",
    "???",
    "???",
  ];

  const menuExit = new Howl({
    src: ["./sounds/menuExit.mp3"],
    volume: 0.15,
    loop: false,
  });

  const menuNav = new Howl({
    src: ["./sounds/menuNav.mp3"],
    volume: 0.1,
    loop: false,
  });
  menuNav.seek(0.25);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        setShowProjects(false);
        menuExit.play();
      }
    };

    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [setShowProjects]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPage(true);
    }, 250);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        key="transition"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.25 } }}
        exit={{ opacity: 1, transition: { duration: 0.25 } }}
        className="w-full h-full bg-black z-50 relative"
      >
        {showPage && (
          <motion.div
            key="about"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.25 } }}
            style={{ backgroundImage: `url('/pictures/workdesk5.png')` }}
            className="flex flex-col w-full h-full bg-cover bg-center bg-no-repeat bg-blue-100 z-50 relative pb-24"
          >
            <div className="flex flex-col w-full h-full z-50 relative pb-28">
              <div className="flex items-center pt-20">
                <div className="w-32 h-[1px] bg-white"></div>
                <i className="text-xl text-white font-normal whitespace-nowrap px-2 select-none">
                  Projects
                </i>
                <div className="w-full h-[1px] bg-white"></div>
              </div>
              <div className="flex w-full h-full justify-between border-y-[1px] pt-4 border-white bg-[rgb(0,0,0,0.25)] backdrop-filter backdrop-saturate-[.25]">
                <div className="scroll text-white text-2xl leading-none w-96 select-none overflow-auto mb-4">
                  <div className="w-full h-[2px] mb-[1px] bg-gradient-to-r from-[rgb(0,0,0,0.50)] from-80% to-transparent"></div>
                  {projectNames.map((name, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col justify-end items-center w-full bg-gradient-to-r from-black to-transparent pt-4 relative"
                      onMouseEnter={() => {
                        if (name !== "???") {
                          menuNav.play();
                          setHovered(name);
                        } else setHovered("???");
                      }}
                      // onMouseLeave={() => {
                      //   setHovered("???");
                      // }}
                    >
                      <div className="flex justify-start items-start w-[100px]">
                        <p>{name}</p>
                      </div>
                      {name === hovered && hovered !== "???" && (
                        <img
                          src={"./pictures/pointer2.png"}
                          alt="pointer"
                          className="absolute w-8 left-[72px] bottom-[-6px] z-50"
                        />
                      )}
                      <div className="w-full h-[2px] bg-gradient-to-r from-[rgb(255,255,255,0.25)] from-80% to-transparent"></div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col w-full h-full items-center justify-center">
                  {hovered === "HeartBeats" && (
                    <>
                      <img
                        src={"/gifs/heartbeatsHome.gif"}
                        alt="HeartBeats home"
                        className="w-[70%] pb-2"
                      />
                      <div className="flex flex-col gap-y-2 justify-center items-center text-white">
                        <p className="">
                          Technologies: JavaScript, React, Redux, Express,
                          PostgreSQL, TailwindCSS, Spotify API TailwindCSS
                        </p>
                        <p>
                          HeartBeats is a web application that allows users to
                          journal their emotions and, in response, curates songs
                          aligned with their moods, enabling them to craft
                          personalized playlists.
                        </p>
                        <div className="flex gap-x-4">
                          <a
                            href="https://heart-beats.onrender.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium"
                          >
                            Visit HeartBeats
                          </a>
                          <a
                            href="https://github.com/abramfelix1/HeartBeats"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium"
                          >
                            Github
                          </a>
                        </div>
                      </div>
                    </>
                  )}
                  {hovered === "Accord" && (
                    <div className="text-white">AAAAAAAAAAAAAAAAAA</div>
                  )}
                  {hovered === "Seabnb" && (
                    <div className="text-white">AAAAAAAAAAAAAAAAAA</div>
                  )}
                </div>
              </div>
              <div
                className="flex text-white text-xl w-full justify-end items-center px-10 select-none"
                onClick={() => {
                  setShowProjects(false);
                  menuExit.play();
                }}
              >
                {/* {hovered !== "???" && (
                  <p className="flex justify-self-end">
                    Click to Visit {hovered}
                  </p>
                )} */}
                <img
                  src="./pictures/escKey.png"
                  alt="me"
                  className="w-16 px-2"
                />
                <p className="">Exit Projects</p>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
