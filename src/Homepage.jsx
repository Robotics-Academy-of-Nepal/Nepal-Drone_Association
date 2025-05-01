import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import drone18 from './assets/drone18.jpg';
import Navbar from "./NavBar";
import Footer from "./Footer";
import About from './About';
import TeamPage from './Team';
import ImageSlider from './Slider';
import News from './NewsGrid';
import { Users, Building2, Plane, UserPlus } from "lucide-react";
import Slider from './Slider2';

function Homepage() {
  const aboutRef = useRef(null);
  const teamRef = useRef(null);
  const newsRef = useRef(null);

  const specs = [
    {
      icon: <Users className="w-8 h-8 mb-3" />,
      title: "Drone Pilots",
      description: "100+ Professional Pilots",
    },
    {
      icon: <Building2 className="w-8 h-8 mb-3" />,
      title: "Institutions",
      description: "30+ Partner Institutions",
    },
    {
      icon: <Plane className="w-8 h-8 mb-3" />,
      title: "Drones",
      description: "20+ Advanced Drones",
    },
    {
      icon: <UserPlus className="w-8 h-8 mb-3" />,
      title: "Members",
      description: "800+ Active Members",
    },
  ];

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  useEffect(() => {
    const scrollTarget = localStorage.getItem('scrollTarget');

    if (scrollTarget) {
      localStorage.removeItem('scrollTarget');

      setTimeout(() => {
        switch (scrollTarget) {
          case 'about':
            scrollToSection(aboutRef);
            break;
          case 'team':
            scrollToSection(teamRef);
            break;
          case 'news':
            scrollToSection(newsRef);
            break;
          default:
            break;
        }
      }, 100);
    }
  }, []);

  return (
    <>
      <Navbar
        onAboutClick={() => scrollToSection(aboutRef)}
        onTeamClick={() => scrollToSection(teamRef)}
        onNewsClick={() => scrollToSection(newsRef)}
      />

      <div className="max-w-screen-lg xl:max-w-none 2xl:max-w-none mx-auto px-4 mt-2">
        <div className="bg-gradient-to-r from-[#003893] to-[#DC143C] text-white w-[95%] rounded-2xl mx-auto">
          <div className="mt-2 w-full flex items-center rounded-md px-2 lg:flex-row xl:flex-row">
            <div className="relative h-auto overflow-hidden">
              <ImageSlider />
            </div>
          </div>

          {/* Specs section */}
          <div className="rounded-lg mx-auto p-6 mt-2 text-white">
            <div className="rounded-lg p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {specs.map((spec) => (
                  <div key={spec.title} className="flex flex-col items-center text-center p-4">
                    {spec.icon}
                    <h3 className="text-lg font-semibold mb-2">{spec.title}</h3>
                    <p className="text-sm">{spec.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <section ref={aboutRef}>
          <About />
        </section>

        <section ref={teamRef}>
          <TeamPage />
        </section>

        <section ref={newsRef}>
          <div className="relative w-full max-w-8xl mx-auto mt-8 mb-8 px-4">
            <h1 className="text-3xl font-bold text-center mb-8">News & Events</h1>
            {/* <Slider /> */}
            <News />
          </div>
        </section>
      </div>

      <Footer
        onAboutClick={() => scrollToSection(aboutRef)}
        onTeamClick={() => scrollToSection(teamRef)}
      />
    </>
  );
}

export default Homepage;
