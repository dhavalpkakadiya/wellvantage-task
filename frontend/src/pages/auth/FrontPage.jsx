import { useState, useEffect } from "react";
import trainer from "../../assets/png/trainer.png";
import trainer2 from "../../assets/png/trainer2.png";
import trainer3 from "../../assets/png/trainer3.png";
import logo from "../../assets/svg/logo.svg";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const FrontPage = () => {
  const navigate = useNavigate();
  const images = [trainer, trainer2, trainer3];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="md:w-full md:flex max-h-screen">
      <div
        className="md:w-1/2 h-screen w-full bg-cover bg-center transition-all duration-1000 ease-in-out"
        style={{ backgroundImage: `url(${images[currentImageIndex]})` }}
      >
        <div className="backdrop-blur-sm h-max-screen md:backdrop-blur-none">
          <div className="flex justify-center text-center pt-40 px-6 text-[27px] sm:pt-20 sm:text-[37px] md:mt-[100px] md:text-center font-[Poppins] md:font-medium text-white leading-tight">
            More Members, &nbsp;
            <br className="sm:hidden" />
            More Revenue.
            <br />
            Smarter Gym Management.
          </div>

          <div className="px-6 pt-20 sm:mt-32 md:hidden flex flex-col gap-5 items-center  h-screen overflow-hidden">
            <div className="font-semibold text-[37px] sm:font-bold sm:text-[40px] text-[#28A745]">
              Welcome to
            </div>
            <img src={logo} alt="logo" className="h-14 w-52  sm:h-[70px] sm:w-[294px]" />

            <Button
              variant="contained"
              className="bg-[#28A745]! text-white! sm:font-semibold! sm:text-[20px]! rounded-[15px]! sm:py-2.5! sm:px-[30px]!"
              onClick={() => navigate("/login")}
            >
              Gym Owner - Sign Up
            </Button>
          </div>
        </div>
      </div>

      <div className="hidden md:w-1/2 md:flex flex-col gap-6 items-center justify-center p-6">
        <div className="font-bold text-[40px] text-[#28A745]">
          Welcome to
        </div>

        <img src={logo} alt="logo" className="h-[70px] w-[294px]" />

        <Button
          variant="contained"
          className="bg-[#28A745]! text-white! font-semibold! text-[20px]! rounded-[15px]! py-2.5! px-[30px]!"
          onClick={() => navigate("/login")}
        >
          Gym Owner - Sign Up
        </Button>
      </div>
    </div>
  );
};

export default FrontPage;
