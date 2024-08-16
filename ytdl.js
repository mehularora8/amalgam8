#!/usr/bin/env node

const ytdl = require('ytdl-core');
const fs = require('fs');

// Check if a URL is provided as a command-line argument
if (process.argv.length < 3) {
  console.log('Please provide a YouTube URL as a command-line argument');
  process.exit(1);
}

const videoUrl = process.argv[2];

async function downloadAudio(url) {
  try {
    // Create a write stream for the audio
    const writeStream = fs.createWriteStream("./audio.mp4");

    // Start the download
    const audio = ytdl(url, {
      filter: 'audioonly',
      requestOptions: {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        }
      }
    })

    // Handle ytdl errors
    audio.on('error', (err) => {
        console.log('Error in ytdl stream:', err);
        writeStream.close();
    });

    console.log(audio);
    
    audio.pipe(writeStream);

    // Handle the finish event
    writeStream.on('finish', () => {
      console.log('Download completed!');
    });

    // Handle errors
    writeStream.on('error', (err) => {
      console.log('Error downloading audio:', err);
    });

  } catch (err) {
    console.log("error caught");
    console.log('Error:', err.message);
  }
}

downloadAudio(videoUrl);