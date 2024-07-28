import React from "react";
import PlayList from "@/components/playlist";
import Header from "@/components/header";

const Music = () => {
  return (
    <>
    <Header/>
      <div className='relative overflow-hidden py-24 lg:py-32'>
        <div
          aria-hidden='true'
          className='flex absolute -top-96 start-1/2 transform -translate-x-1/2'
        >
          <div className='bg-gradient-to-r from-background/50 to-background blur-3xl w-[25rem] h-[44rem] rotate-[-60deg] transform -translate-x-[10rem]' />
          <div className='bg-gradient-to-r from-[#1ED760] to-purple-500 blur-3xl w-[90rem] h-[50rem] rounded-full origin-top-left -rotate-12 -translate-x-[15rem]' />
        </div>
        <div className='relative z-10'>
          <div className='container py-10 lg:py-16'>
            <div className='max-w-2xl text-center mx-auto'>
              <p className=''>Find your next playlist</p>
              <div className='mt-5 max-w-2xl'>
                <h1 className='scroll-m-20 text-4xl text-white font-extrabold tracking-tight lg:text-5xl'>
                  What should I listen to? 🤔
                </h1>
              </div>
              <div className='mt-5 max-w-3xl'>
                <p className='text-xl text-muted-foreground text-white'>
                  Get AI generated playlist from spotify based on how your mood
                  is. Listen to songs dynamically curated for you!
                </p>
              </div>
              <PlayList />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Music;
