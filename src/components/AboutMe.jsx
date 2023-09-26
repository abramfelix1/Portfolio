import React, { useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ViewContext } from "../context/ViewContext";

export default function AboutMe() {
  const { setShowAbout } = useContext(ViewContext);
  const [showPage, setShowPage] = useState(null);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        setShowAbout(false);
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
        exit={{ opacity: 0, transition: { duration: 0.25 } }}
        className="w-full h-full  z-50 relative"
      >
        {showPage && (
          <motion.div
            key="about"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.25 } }}
            className="flex flex-col w-full h-full  z-50 relative pb-52"
          >
            <div className="flex items-center pt-20">
              <div className="w-32 h-[1px] bg-white"></div>
              <p className="text-xl text-white font-normal whitespace-nowrap px-2">
                About Me
              </p>
              <div className="w-full h-[1px] bg-white"></div>
            </div>
            <div className="flex w-full h-full justify-between px-40 border-y-[1px] border-white bg-[rgb(0,0,0,0.5)]">
              <div className="text-white">
                <p>hi</p>
              </div>
              <img src="./pictures/aboutPhoto.jpg" alt="me" className="py-20" />
            </div>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
