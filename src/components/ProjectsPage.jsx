import React, { useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ViewContext } from "../context/ViewContext";
import { Howl } from "howler";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Navigation, FreeMode, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function ProjectsPage() {
  const [hovered, setHovered] = useState("???");
  const { setShowProjects } = useContext(ViewContext);
  const [showPage, setShowPage] = useState(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const handleSlideChange = (swiper) => {
    setActiveSlide(swiper.activeIndex);
  };

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

  const heartBeatFiles = [
    "/gifs/heartBeatsHome.gif",
    "/gifs/heartBeatsDemo1.gif",
    "/gifs/heartBeatsDemo2.gif",
  ];

  const accordFiles = ["/pictures/accordHome.png", "/gifs/accordDemo.gif"];

  const seabnbFiles = ["/gifs/seabnbDemo.gif"];

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
                <div className="scroll text-white text-2xl leading-none w-96 select-none overflow-auto mb-4 ">
                  <div className="w-full h-[2px] mb-[1px] bg-gradient-to-r from-[rgb(0,0,0,0.50)] from-80% to-transparent"></div>
                  {projectNames.map((name, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col justify-end items-center w-full bg-gradient-to-r from-black to-transparent pt-4 relative"
                      onMouseEnter={() => {
                        if (name !== "???") {
                          menuNav.play();
                          setHovered(name);
                          setActiveSlide(0);
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
                          className="absolute w-8 left-[100px] bottom-[-6px] z-50"
                        />
                      )}
                      <div className="w-full h-[2px] bg-gradient-to-r from-[rgb(255,255,255,0.25)] from-80% to-transparent"></div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col w-[80%] h-full items-center justify-center">
                  {hovered === "HeartBeats" && (
                    <>
                      <div className="w-[70%] pb-2 sm:w-[30%]  md:w-[50%] lg:w-[60%] xl:w-[70%] 2xl:w-[70%]">
                        <Swiper
                          slidesPerView={1}
                          mousewheel={true}
                          pagination={{ clickable: true }}
                          // freeMode={true}
                          modules={[Mousewheel, Navigation, Pagination]}
                          onSlideChange={handleSlideChange}
                        >
                          {heartBeatFiles.map((file, idx) => (
                            <SwiperSlide key={idx}>
                              <img
                                src={activeSlide === idx ? file : `/gifs`}
                                data-src={file}
                                alt={`HeartBeats ${file}`}
                              />
                            </SwiperSlide>
                          ))}
                        </Swiper>
                      </div>
                      <div className="scroll flex flex-col gap-y-2 justify-center items-center text-white overflow-auto">
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
                    <>
                      <div className="w-[70%] pb-2 sm:w-[30%]  md:w-[50%] lg:w-[60%] xl:w-[70%] 2xl:w-[70%]">
                        <Swiper
                          slidesPerView={1}
                          mousewheel={true}
                          pagination={{ clickable: true }}
                          // freeMode={true}
                          modules={[Mousewheel, Navigation, Pagination]}
                          onSlideChange={handleSlideChange}
                        >
                          {accordFiles.map((file, idx) => (
                            <SwiperSlide key={idx}>
                              <img
                                src={activeSlide === idx ? file : `/gifs`}
                                data-src={file}
                                alt={`Accord ${file}`}
                              />
                            </SwiperSlide>
                          ))}
                        </Swiper>
                      </div>
                      <div className="scroll flex flex-col gap-y-2 justify-center items-center text-white overflow-auto">
                        <p className="">
                          Technologies: Python, JavaScript, React, Redux, Flask,
                          PostgreSQL Flask-SocketIO, SocketIO, AWS
                        </p>
                        <p>
                          Accord, inspired by Discord, provides a platform for
                          users to connect and engage within communities.
                        </p>
                        <div className="flex gap-x-4">
                          <a
                            href="https://accord-ajr.onrender.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium"
                          >
                            Visit Accord
                          </a>
                          <a
                            href="https://github.com/abramfelix1/Accord"
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
                  {hovered === "Seabnb" && (
                    <>
                      <div className="w-[70%] pb-2 sm:w-[30%]  md:w-[50%] lg:w-[60%] xl:w-[70%] 2xl:w-[70%]">
                        <Swiper
                          slidesPerView={1}
                          mousewheel={true}
                          pagination={{ clickable: true }}
                          // freeMode={true}
                          modules={[Mousewheel, Navigation, Pagination]}
                          onSlideChange={handleSlideChange}
                        >
                          {seabnbFiles.map((file, idx) => (
                            <SwiperSlide key={idx}>
                              <img
                                src={activeSlide === idx ? file : `/gifs`}
                                data-src={file}
                                alt={`Accord ${file}`}
                              />
                            </SwiperSlide>
                          ))}
                        </Swiper>
                      </div>
                      <div className="scroll flex flex-col gap-y-2 justify-center items-center text-white overflow-auto">
                        <p className="">
                          Technologies: JavaScript, React, Redux, Express,
                          PostgreSQL
                        </p>
                        <p>
                          Seabnb, inspired by Airbnb, my first full-stack
                          project.
                        </p>
                        <div className="flex gap-x-4">
                          <a
                            href="https://airbnb-clone-2u2s.onrender.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium"
                          >
                            Visit Seabnb
                          </a>
                          <a
                            href="https://github.com/abramfelix1/SeaBnB"
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
