import React, { useEffect, useState } from "react";
import { getAllTracks } from "../api";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
// import Player from "../Components/Player";
import "swiper/css";
// import "swiper/css/navigation";

// import "../style/Home.css";
import "../style/Testing.css";
import SongSkeleton from "../Components/SongSkeleton";

const Home = ({ setCurrentTrack, user }) => {
  const [allTracks, setAllTracks] = useState([]);
  // const [currentTrack, setCurrentTrack] = useState(null);

  useEffect(() => {
    async function fetchTracks() {
      try {
        const response = await getAllTracks();

        setAllTracks(response.data);
      } catch (error) {
        console.error("Error fetching tracks:", error);
      }
    }

    fetchTracks();
  }, []);

  const playSong = (track) => {
    // audio logic will go here later
  };

  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) {
      return "Good Morning ";
    } else if (hour >= 12 && hour < 17) {
      return "Good Afternoon ";
    } else if (hour >= 17 && hour < 21) {
      return "Good Evening ";
    } else {
      return "Good Night ";
    }
  };



  return (
    <div className="home-container">

      {/* TOP HERO BANNER */}
      <section className="top-banner">
        <div className="banner-content">
          <h1>
            {getGreeting()}, {user?.name || "Music Lover"} 🎧
          </h1>
          <p>What do you want to listen today?</p>

        </div>
      </section>

      {/* FEATURED SECTION */}
      <section className="music-section">
        <h2>Featured For You</h2>

        <div className="horizontal-scroll">
          {allTracks.length === 0
            ? Array.from({ length: 6 }).map((_, index) => (
              <SongSkeleton key={index} />
            ))
            : allTracks.map((track, index) => (
              <div
                key={track._id || index}
                className="music-card"
                onClick={() => setCurrentTrack(track)}
              >
                {/* <div className="card-image">
                  <img
                    src={
                      track.imageUrl ||
                      "frontend/src/assets/Gemini_Generated_Image_afrpjbafrpjbafrp.png"
                    }
                    alt={track.title}
                  />
                  <div className="play-btn">▶</div>
                </div> */}
                <div className="card-image">
                  <img
                    src={
                      track.imageUrl ||
                      "frontend/src/assets/Gemini_Generated_Image_afrpjbafrpjbafrp.png"
                    }
                    alt={track.title}
                  />

                  <div className="image-overlay"></div>

                  <div className="play-btn">
                    ▶
                  </div>
                </div>

                <div className="card-info">
                  <h4>{track.title}</h4>
                  <p>{track.artists?.[0]}</p>
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* RECENT SECTION */}
      <section className="music-section">
        <h2>Recently Played</h2>

        <div className="recent-grid">
          {allTracks.slice(0, 6).map((track, index) => (
            <div
              key={index}
              className="recent-card"
              onClick={() => setCurrentTrack(track)}
            >
              <img
                src={
                  track.imageUrl ||
                  "frontend/src/assets/Gemini_Generated_Image_afrpjbafrpjbafrp.png"
                }
                alt={track.title}
              />
              <div>
                <h4>{track.title}</h4>
                <p>{track.artists?.[0]}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );



  //   return (
  //     <div className="min-h-screen bg-slate-900 text-white font-[Poppins]">

  //       {/* Hero Section */}
  //       <section className="hero-section">
  //         <div className="hero-content">
  //           <h1>Feel the Music</h1>
  //           <p>Stream millions of songs, anytime and anywhere</p>

  //           <div className="hero-buttons">
  //             <button className="btn primary">Explore Music</button>
  //             <button className="btn secondary">Create Playlist</button>
  //           </div>
  //         </div>
  //         {/* <div>
  //           <h1 className="text-6xl font-bold mb-4">
  //             Feel the Music
  //           </h1>
  //           <p className="text-lg opacity-90 mb-8">
  //             Stream your favorite songs anytime
  //           </p>

  //           <div className="flex gap-4">
  //             <button className="px-6 py-3 rounded-full bg-green-500 text-black font-medium">
  //               Play Now
  //             </button>
  //             <button className="px-6 py-3 rounded-full border border-white">
  //               Explore
  //             </button>
  //           </div>
  //         </div> */}

  //       </section>

  //       {/* Featured Albums / Tracks Slider */}
  //       <section className="section">
  //         <h2 className="section-title">Featured Albums</h2>
  // <Swiper
  //   modules={[Autoplay, Navigation]}
  //   spaceBetween={16}
  //   autoplay={{
  //     delay: 3000,
  //     disableOnInteraction: false,
  //   }}
  //   breakpoints={{
  //     0: {
  //       slidesPerView: 1,
  //       navigation: false,
  //     },
  //     480: {
  //       slidesPerView: 1.3,
  //       navigation: false,
  //     },
  //     768: {
  //       slidesPerView: 3,
  //       navigation: true,
  //     },
  //     1024: {
  //       slidesPerView: 5,
  //       navigation: true,
  //     },
  //   }}
  // >

  //           {allTracks.length === 0 ? (
  //             // Skeleton while songs load
  //             Array.from({ length: 5 }).map((_, index) => (
  //               <SwiperSlide key={index}>
  //                 <SongSkeleton />
  //               </SwiperSlide>
  //             ))
  //           ) : (
  //             allTracks.map((track, index) => (
  //                 // let trackImage = track.imageUrl || "frontend/src/assets/Gemini_Generated_Image_afrpjbafrpjbafrp.png"
  //               <SwiperSlide key={track._id || index}>
  //                 <div className="all-songs" onClick={() => setCurrentTrack(track)}>
  //                   <div className="song-banner">
  //                     <img src={track.imageUrl || "frontend/src/assets/Gemini_Generated_Image_afrpjbafrpjbafrp.png"} alt={track.Name} />
  //                   </div>
  //                   <div className="song-info">
  //                     <h4>{track.title}</h4>
  //                     <span>{track.artists[0]}</span>
  //                   </div>
  //                 </div>
  //               </SwiperSlide>
  //             ))
  //           )}

  //         </Swiper>

  //         {/* <Player track={currentTrack} /> */}

  //       </section>

  //       {/* Recently Played */}
  //       <section className="section">
  //         <h2 className="section-title">Recently Played</h2>

  //         <div className="song-list">
  //           <div className="song-item">
  //             <span>🎵</span>
  //             <div>
  //               <h4>Song One</h4>
  //               <p>Artist Name</p>
  //             </div>
  //           </div>

  //           <div className="song-item">
  //             <span>🎵</span>
  //             <div>
  //               <h4>Song Two</h4>
  //               <p>Artist Name</p>
  //             </div>
  //           </div>

  //           <div className="song-item">
  //             <span>🎵</span>
  //             <div>
  //               <h4>Song Three</h4>
  //               <p>Artist Name</p>
  //             </div>
  //           </div>
  //         </div>
  //       </section>

  //     </div>
  //   );
};

export default Home;
