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
              <div className="scroll text-white pt-4 pr-60 overflow-auto">
                <p className="pl-6">Hi! A little (or a lot) about me...</p>
                <p className="pt-2">
                  <span className="pl-10">
                    Ever since I gained my consciousness, my eyes were always
                    glued to a screen. They tried to stop me, from unplugging my
                    games to hiding them, they didn't think 5 year old me{" "}
                  </span>{" "}
                  had the capabilities to find it and set it up myself. I had to
                  start problem solving, innovate new ways to get my screen
                  staring fix. So I pretended not to know where they hid my
                  stuff, and not know how to set things up. When I can get on a
                  game, even though I couldn't read, I somewhat knew what I was
                  doing, just a lot of trial and error, navigating the main
                  menu, till the game starts.
                </p>
                <p className="pt-2">
                  <span className="pl-10">
                    {" "}
                    Mid to late 2000s was when I got my first PC and it was life{" "}
                  </span>{" "}
                  changing. I didn't have internet for the first 3 years of
                  having it so I was left with playing with the pinball game, MS
                  Paint, and the file explorer. When I finally got internet, it
                  felt like I entered a new world, I explored a bunch of sites,
                  filled out a ton of surveys for free game consoles, and
                  downloaded a bunch of viruses, which eventually led to the
                  deletion of system32. A couple years later, I got my first
                  smartphone and started to mess around with that, which
                  eventually got hard bricked.
                </p>
                <p className="pt-2">
                  <span className="pl-10">
                    Early 2010's came around, being in highschool, I wanted to
                    make money, thats when I dabbled in a lot of multimedia
                    creation tools and fixed PC's and phones.{" "}
                  </span>{" "}
                  I manipulated photos, created logos, and edited videos. Thats
                  when I realized I like creating stuff with all of these
                  digital tools (probably influenced from all those years of
                  using MS Paint). Everything I made had to be better than the
                  last, tutorial after tutorial, taking on work that was above
                  my expertise. Spending hours on an hours worth of work.
                </p>
                <p className="pt-2">
                  <span className="pl-10">
                    Late 2010's to now, I explored both graphic design and
                    computer science in college. While pursuing a computer
                    science degree, I had a creative itch.
                  </span>{" "}
                  I wanted to create visually cool and interactive applications,
                  so I gave game development a shot, after a couple months in of
                  learning, I realized game development wasn't it. Shortly
                  after, I figured out that web development can fufill that
                  itch. I decided to take a bunch of online courses about web
                  development. Learning web development gave me the same feeling
                  as learning digital art.
                </p>
                <p className="pt-2">
                  <span className="pl-10">
                    3 months into learning web development, I knew that I wanted
                    to turn this into a career, so I joined a full-stack
                    software engineering bootcamp called App Academy.
                  </span>{" "}
                  After a year and a half long journey, I finally can make
                  stuff!
                </p>
                <p></p>
                <p></p>
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
