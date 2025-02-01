import React, { useEffect, useState } from "react";
import "./Card.css";
const Card = ({ data }) => {
  const [show, toggle] = useState("hidden");
  const [liked, like] = useState(false);
  const [mobile, setMobile] = useState(false);
  if (data == undefined) {
    return;
  }

  const handleDownload = async () => {
    try {
      const res = await fetch(data);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "poster.jpg";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (e) {
      console.log("ERROR");
    }
  };
  useEffect(() => {
    if (window.innerWidth < 768) {
    } else {
    }
  });
  return (
    <div
      onMouseEnter={() => {
        toggle((prev) => {
          if (prev == "hidden") {
            return "flex";
          } else {
            return "hidden";
          }
        });
      }}
      onMouseLeave={() => {
        toggle((prev) => {
          if (prev == "hidden") {
            return "flex";
          } else {
            return "hidden";
          }
        });
      }}
      className=" card  rounded-lg relative  cursor-pointer "
    >
      <img className="w-full" src={`${data}`}></img>
      <div
        className={`option ${show}  w-full    flex justify-between items-center p-2 `}
      >
        <button
          onClick={handleDownload}
          className={`bg-green-800 text-2xl text-white rounded-lg flex items-center justify-center`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="icon icon-tabler icons-tabler-outline icon-tabler-download"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" />
            <path d="M7 11l5 5l5 -5" />
            <path d="M12 4l0 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Card;
