import React from "react";

const Globe: React.FC = () => {
  return (
    <>
      <style>
        {`
          @keyframes earthRotate {
            0% { background-position: 0 0; }
            100% { background-position: 200% 0; }
          }
          @keyframes twinkling { 0%,100% { opacity:0.1; } 50% { opacity:1; } }
          @keyframes twinkling-slow { 0%,100% { opacity:0.1; } 50% { opacity:1; } }
          @keyframes twinkling-long { 0%,100% { opacity:0.1; } 50% { opacity:1; } }
          @keyframes twinkling-fast { 0%,100% { opacity:0.1; } 50% { opacity:1; } }
        `}
      </style>
      <div className="flex items-center justify-center w-full h-full" style={{ fontSize: 'min(3.2vw, 40px)' }}>
        <div
          className="relative rounded-full overflow-hidden"
          style={{
            width: '25em',
            height: '25em',
            boxShadow: '0 0 3em rgba(100, 180, 255, 0.5), 0 0 1em rgba(100, 180, 255, 0.3), -0.5em 0 1em #8ad4ff inset, 1.5em 0.2em 2.5em #000 inset, -2.4em -0.2em 4em rgba(100, 180, 255, 0.6) inset, 25em 0 4.4em #00000066 inset, 15em 0 3.8em #000000aa inset',
            backgroundImage: "url('https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg')",
            backgroundSize: "200% 100%",
            backgroundPosition: "left",
            animation: "earthRotate 40s linear infinite",
          }}
        >
          {/* Stars */}
          <div className="absolute left-[10%] top-[20%] w-[1%] h-[1%] bg-white rounded-full" style={{ animation: "twinkling 3s infinite" }} />
          <div className="absolute left-[35%] top-[15%] w-[0.8%] h-[0.8%] bg-white rounded-full" style={{ animation: "twinkling-long 4s infinite" }} />
          <div className="absolute left-[80%] top-[30%] w-[1.2%] h-[1.2%] bg-white rounded-full" style={{ animation: "twinkling-fast 1.5s infinite" }} />
          <div className="absolute left-[20%] top-[70%] w-[1%] h-[1%] bg-white rounded-full" style={{ animation: "twinkling-slow 2s infinite" }} />
          <div className="absolute left-[70%] top-[80%] w-[0.8%] h-[0.8%] bg-white rounded-full" style={{ animation: "twinkling 3s infinite" }} />
        </div>
      </div>
    </>
  );
};

export default Globe;
