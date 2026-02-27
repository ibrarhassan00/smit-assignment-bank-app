import { useEffect, useState } from "react";

const images = [
  "/src/pic/01.jpg",
  "/src/pic/02.jpg",
  "/src/pic/03.jpg",
  "/src/pic/04.jpg",
];

const DashboardHeader = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000); // 3 sec

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="relative mb-8 overflow-hidden rounded-xl p-12 text-center text-white"
      style={{
        backgroundImage: `url(${images[index]})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "background-image 1s ease-in-out",
      }}
    >
      {/* overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* content */}
      <div className="relative z-10">
        <h1 className="text-6xl">Complaint Dashboard</h1>
        <p className="text-gray-200 text-2xl py-4" >
          Submit and track your complaints
        </p>
      </div>
    </div>
  );
};

export default DashboardHeader;
