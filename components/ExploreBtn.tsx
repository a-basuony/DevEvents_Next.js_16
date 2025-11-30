"use client";

import Image from "next/image";

const ExploreBtn = () => {
  const handleClick = () => {
    const section = document.getElementById("events");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" }); // smooth scroll
    }
  };
  return (
    <button
      className="mt-7 mx-auto "
      type="button"
      id="explore-btn"
      onClick={handleClick}
    >
      <a href="#events">
        Explore Events
        <Image src="/icons/arrow-down.svg" alt="arrow" width={24} height={24} />
      </a>
    </button>
  );
};

export default ExploreBtn;
