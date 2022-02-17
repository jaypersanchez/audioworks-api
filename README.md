# Overview 

Assignment from Audioworks.  This repo is the Express middleware providing the API to GET audio files and POST a change to audio file ID3 tags.

## Setup Guide

Run `yarn install`

Create a `.env` file on under the directory of "audioworks-api" and put a line in the file "PORT=3001"

Run the application with `npm run dev`

You can test the enpoints using POSTMAN

1. Get all tracks `http://localhost:3001/api/track`
2. Get a specific audio track `http://localhost:3001/api/track/FILENAME`
