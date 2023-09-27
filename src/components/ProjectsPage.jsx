import React, { useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ViewContext } from "../context/ViewContext";
import { Howl } from "howler";

export default function ProjectsPage() {
  const { setShowProjects } = useContext(ViewContext);
  const [showPage, setShowPage] = useState(null);

  const projectNames = ["HeartBeats", "Accord", "Seabnb"];

  const menuExit = new Howl({
    src: ["./sounds/menuExit.mp3"],
    volume: 0.15,
    loop: false,
  });

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
            <div className="flex items-center pt-20">
              <div className="w-32 h-[1px] bg-white"></div>
              <i className="text-xl text-white font-normal whitespace-nowrap px-2">
                Projects
              </i>
              <div className="w-full h-[1px] bg-white"></div>
            </div>
            <div className="flex w-full h-full justify-between border-y-[1px] pt-4 border-white bg-[rgb(0,0,0,0.25)] backdrop-filter backdrop-saturate-[.25]">
              <div className="text-white text-2xl leading-none w-80 select-none">
                <div className="w-full h-[2px] mb-[1px] bg-gradient-to-r from-[rgb(0,0,0,0.50)] from-80% to-transparent"></div>
                {projectNames.map((name) => (
                  <div className="flex flex-col justify-end items-center w-full bg-gradient-to-r from-black to-transparent pt-4 relative">
                    <div className="flex justify-start items-start w-[100px]">
                      <p>{name}</p>
                    </div>
                    <img
                      src={"./pictures/pointer2.png"}
                      alt="pointer"
                      className="absolute w-8 left-20 bottom-[-6px] z-50"
                    />
                    <div className="w-full h-[2px] bg-gradient-to-r from-[rgb(255,255,255,0.25)] from-80% to-transparent"></div>
                  </div>
                ))}
              </div>
              <div className="text-white">AAAAAAAAAAAAAAAAAA</div>
            </div>
            <div
              className="flex text-white text-xl w-full justify-end items-center px-10 select-none"
              onClick={() => {
                setShowProjects(false);
                menuExit.play();
              }}
            >
              <img src="./pictures/escKey.png" alt="me" className="w-16 px-2" />
              <p className="">Exit Projects</p>
            </div>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
