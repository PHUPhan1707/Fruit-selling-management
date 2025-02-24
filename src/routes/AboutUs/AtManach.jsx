import { useState } from "react";
import { motion } from "framer-motion";
import Explore from "../../components/ExploreFruit/ExploreFruit";
  
const AtManach = () => {
  const images = [
    "/src/assets/Banner1.png",
    "/src/assets/Banner2.png",
    "/src/assets/Banner3.png",
    "/src/assets/Banner4.png",
    "/src/assets/Banner5.png",
  ];

  const [startIndex, setStartIndex] = useState(0);
  const totalImages = images.length;

  const nextImage = () => {
    setStartIndex((prev) => (prev + 1) % totalImages);
  };

  const prevImage = () => {
    setStartIndex((prev) => (prev - 1 + totalImages) % totalImages);
  };

  return (
    <div className="mt-[14.1rem]">
      {/* Banner giới thiệu */}
      

      {/* Slider */}
      <div className="container mt-6">
        <div
          className="row d-flex align-items-center justify-content-center"
          style={{
            padding: "30px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "40px",  
            flexWrap: "wrap",  
          }}
        >
          <button className="btn btn-light" onClick={prevImage}>
            ◀
          </button>

           
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "15px",
              maxWidth: "100%",  
              overflow: "hidden",
            }}
          >
            {[...Array(4)].map((_, index) => {
             
              const imageIndex = (startIndex + index) % totalImages;
              return (
                <motion.div
                  key={imageIndex}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ type: "spring", stiffness: 100 }}
                  className="card"
                  style={{
                    width: "300px",
                    height: "450px",
                    flexShrink: 0,
                  }}
                >
                  <img
                    src={images[imageIndex]}
                    className="card-img-top"
                    alt={`Image ${imageIndex + 1}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      maxWidth: "100%", 
                    }}
                  />
                </motion.div>
              );
            })}
          </div>

          <button className="btn btn-light" onClick={nextImage}>
            ▶
          </button>
        </div>
      </div>

      
      <div
        style={{
          height: "100%",
          backgroundColor: "#485935",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "60px",
          marginTop: "-150px",  
          position: "relative", 
          zIndex: -1, 
        }}
      >
        <div
          style={{
            margin: "100px 0 0 0 ",
            width: "756px",
            height: "72px",
            textAlign: "center",
            color: "#ECF5E1",
            fontSize: 60,
            fontFamily: "Bonheur Royale",
            fontWeight: "500",
            wordWrap: "break-word",
          }}
        >
          Live well and eat with passion
        </div>
        <ul
        style={{
            fontSize: 15,
            color: '#F0F0F0',
            fontFamily: "Inter",
            textAlign: "center",
          }}> 
          <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ut est odio.</li>
          <li>Nullam placerat tortor diam. Pellentesque non augue in libero aliquet bibendum.</li>
          <li>Nunc iaculis tincidunt mi, vitae lobortis sem consectetur a. Cras ut velit eu nisi scelerisque hendrerit. </li>
          <li>Suspendisse eget tellus vel ipsum porttitor semper. Nunc tempus gravida auctor.</li></ul>
          
        
          
        
      </div>
      {/* Phần mô tả */}
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <div style={{ paddingLeft: "230px", paddingTop: "100px" }}>
          <Explore />
        </div>
        <div
          style={{
            display: "grid",
            paddingLeft: "100px",
            paddingTop: "100px",
            gridGap: "10px",
          }}
        >
          <div
            style={{
              width: "800px",
              height: "105.67px",
              color: "#485935",
              fontSize: 30,
              fontFamily: "Poppins",
              fontWeight: "700",
              wordWrap: "break-word",
              padding: "50px",
            }}
          >
            Manach brings you a spectrum of fruits at their peak of perfection.
          </div>
          <div
            style={{
              width: "800px",
              height: "100px",
              color: "#485935",
              fontSize: 20,
              fontFamily: "Poppins",
              fontWeight: "400",
              wordWrap: "break-word",
              padding: "50px",
            }}
          >
            Whether you crave the familiar comfort of a classic apple or the
            exotic allure of a tropical mango, we've got you covered!
          </div>
        </div>
      </div>
    </div>
  );
};

export default AtManach;
