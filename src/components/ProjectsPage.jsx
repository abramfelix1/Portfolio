import React, { useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ViewContext } from "../context/ViewContext";
import { Howl } from "howler";

export default function ProjectsPage() {
  const { setShowProjects } = useContext(ViewContext);
  const [showPage, setShowPage] = useState(null);

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
            <div className="flex w-full h-full justify-between px-40 border-y-[1px] border-white bg-[rgb(0,0,0,0.5)] backdrop-filter backdrop-saturate-[.25]">
              <div className="text-white">
                <p>hi</p>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
