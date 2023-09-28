import React, { useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ViewContext } from "../context/ViewContext";
import { Howl } from "howler";

export default function AboutMe() {
  const { setShowAbout } = useContext(ViewContext);
  const [showPage, setShowPage] = useState(null);

  const menuExit = new Howl({
    src: ["./sounds/menuExit.mp3"],
    volume: 0.15,
    loop: false,
  });

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        setShowAbout(false);
        menuExit.play();
      }
    };

    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [setShowAbout]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPage(true);
    }, 0);

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
        exit={{ opacity: 0, transition: { duration: 0.25 } }}
        className="w-full h-full  z-50 relative"
      >
        {showPage && (
          <motion.div
            key="about"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.125 } }}
            className="flex flex-col w-full h-full  z-50 relative pb-52"
          >
            <div className="flex items-center pt-20">
              <div className="w-32 h-[1px] bg-white"></div>
              <i className="text-xl text-white font-normal whitespace-nowrap px-2 select-none">
                About Me
              </i>
              <div className="w-full h-[1px] bg-white"></div>
            </div>
            <div className="flex w-full h-full justify-between px-40 border-y-[1px] border-white bg-[rgb(0,0,0,0.25)] backdrop-saturate-[.25]">
              <div className="text-white">
                <p>hi</p>
              </div>
              <img
                src="./pictures/aboutPhoto4.jpg"
                alt="me"
                className="my-20 border-[1px] border-white rounded-3xl"
              />
            </div>
            <div
              className="flex text-white text-xl w-full justify-end items-center px-10 select-none"
              onClick={() => {
                setShowAbout(false);
                menuExit.play();
              }}
            >
              <img src="./pictures/escKey.png" alt="me" className="w-16 px-2" />
              <p className="">Exit About Me</p>
            </div>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
