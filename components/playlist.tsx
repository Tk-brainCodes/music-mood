"use client";

import React, { useState } from "react";
import { Playlist, getPlaylistByMood } from "@/lib/spotify";
import { getDynamicMusicMood } from "@/lib/langchain";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoaderCircle } from "lucide-react";
import { GenreCombobox } from "./genre";

const PlayList = () => {
  const [text, setText] = useState<string>("");
  const [mood, setMood] = useState<string>("");
  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = React.useState("");

  const handleAnalyzeMood = async () => {
    const prompt = `Analyze the mood of the following text and respond with a single word: ${text}`;
    setLoading(true);
    const analyzedMood = await getDynamicMusicMood(prompt);
    if (analyzedMood) {
      const mood = analyzedMood.trim().toLowerCase();
      setMood(mood);
      const playlist = await getPlaylistByMood(mood, value);
      setPlaylist(playlist);
    }
    setLoading(false);
  };

  const getSpotifyEmbedUrl = (uri: string) => {
    const embedUri = uri.replace("spotify:playlist:", "");
    return `https://open.spotify.com/embed/playlist/${embedUri}`;
  };

  console.log("mood", mood);
  console.log("playlist", playlist);

  return (
    <div className='flex flex-col items-center justify-center mt-4 gap-[20px]'>
      <div className='max-w-md mt-[1em] mb-[1em]'>
        <label className='mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white'>
          Search
        </label>
        <div className='relative'>
          <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
            <svg
              className='w-4 h-4 text-gray-500 dark:text-gray-400'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 20 20'
            >
              <path
                stroke='currentColor'
                stroke-linecap='round'
                stroke-linejoin='round'
                stroke-width='2'
                d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
              />
            </svg>
          </div>
          <Input
            type='search'
            id='default-search'
            className='block w-[40vw] p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            placeholder='Enter your current mode; joyful, sad...'
            required
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
      </div>
      <div className='w-full px-2 py-2 flex items-center justify-center'>
        <h3 className='text-xl font-semibold text-white mt-2 mb-2'>
          Enter Genre
        </h3>
      </div>
      <GenreCombobox value={value} setValue={setValue} />

      <Button
        onClick={handleAnalyzeMood}
        className='px-6 py-6 bg-[#1ED760] rounded-full mt-[1em] '
      >
        {loading ? (
          <span className='flex gap-x-3'>
            <LoaderCircle className='animate-spin' /> Loading playlist..
          </span>
        ) : (
          " Get Playlist"
        )}
      </Button>
      {mood && (
        <div className='flex items-start justify-center flex-col'>
          <h1 className='text-white text-xl italic'>Detected Mood: {mood}</h1>
          {playlist && (
            <div className='flex flex-col items-start gap-[20px]'>
              <p className=' text-[20px] text-semibold text-[#1ED760]'>
                {playlist.name}
              </p>
              <p className='text-white text-[20px]'>
                by {playlist.owner.display_name}
              </p>
              <p className='text-white text-[20px]'>{playlist.description}</p>

              <iframe
                src={getSpotifyEmbedUrl(playlist.uri)}
                width='300'
                height='380'
                allow='encrypted-media'
                allowFullScreen
                className='w-[80vw] h-[400px]'
              ></iframe>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PlayList;
