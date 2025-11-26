import React from "react";
import BiryaniImg1 from "../assets/biryani3.png";
import BiryaniImg2 from "../assets/biryani5.png";
import BiryaniImg3 from "../assets/biryani2.png";
import Vector from "../assets/vector3.png";

const ImageList = [
  {
    id: 1,
    img: BiryaniImg1,
  },
  {
    id: 2,
    img: BiryaniImg2,
  },
  {
    id: 3,
    img: BiryaniImg3,
  },
];

const Hero = () => {
  const [imageId, setImageId] = React.useState(BiryaniImg1);

  const bgImage = {
    backgroundImage: `url(${Vector})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    height: "100%",
    width: "100%",
  };

  return (
    <>
      <section id="hero">
        <div className="min-h-[550px] sm:min-h-[650px] bg-gray-100 flex justify-center items-center dark:bg-gray-950 dark:text-white duration-200" style={bgImage}>
          <div className="container pb-8 sm:pb-0">
            <div className="grid grid-cols-1 sm:grid-cols-2">
              {/* text content section */}
              <div data-aos="zoom-out" data-aos-duration="400" data-aos-once="true" className="flex flex-col justify-center order-2 gap-4 pt-12 text-center sm:pt-0 sm:text-left sm:order-1">
                <h1 className="text-5xl font-bold sm:text-6xl lg:text-7xl">
                  Welcome <span className="text-transparent bg-clip-text bg-gradient-to-b from-primary to-secondary">RasaLokal</span>
                </h1>
                <p className="text-sm ">Nikmati cita rasa terbaik dari masakan lokal yang autentik, dibuat dari bahan segar dan diolah dengan penuh kehangatan</p>
                <div>
                  <button className="px-4 py-2 text-white duration-200 rounded-full bg-gradient-to-r from-primary to-secondary hover:scale-105">Pesan Sekarang</button>
                </div>
              </div>
              {/* Image section */}
              <div className="min-h-[450px] sm:min-h-[450px] flex justify-center items-center relative order-1 sm:order-2 ">
                <div className="h-[300px] sm:h-[450px] overflow-hidden flex justify-center items-center">
                  <img data-aos="zoom-in" data-aos-duration="300" data-aos-once="true" src={imageId} alt="biryani img" className="w-[300px] sm:w-[450px] sm:scale-125  mx-auto spin " />
                </div>
                <div className="flex lg:flex-col lg:top-1/2 lg:-translate-y-1/2 lg:py-2 justify-center gap-4 absolute bottom-[0px] lg:-right-10 bg-white/30 rounded-full">
                  {ImageList.map((item) => (
                    <img
                      key={item.id}
                      data-aos="zoom-in"
                      data-aos-duration="400"
                      data-aos-once="true"
                      src={item.img}
                      onClick={() => {
                        setImageId(item.id === 1 ? BiryaniImg1 : item.id === 2 ? BiryaniImg2 : BiryaniImg3);
                      }}
                      alt="biryani img"
                      className="max-w-[80px] h-[80px] object-contain inline-block hover:scale-105 duration-200"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
