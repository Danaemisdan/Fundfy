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

        </div>
      </div>
    </>
  );
};

export default Globe;
