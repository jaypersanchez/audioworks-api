import express, { Router, Request, Response } from "express";
import { body, param, validationResult } from "express-validator";
import ID3 from "node-id3";
import { dirname } from "path";
import fs from "fs";
import { AudioTrack, AudioTag } from "../model/audio.model";

const appDir = dirname(require.main.filename);
const router: Router = express.Router();

router.get("/track", async (req: Request, res: Response) => {
  const tracks = fs.readdirSync(`${appDir}/assets/tracks`);

  const audioTrack: AudioTrack[] = await Promise.all(
    tracks?.map(async (track) => {
      try {
        const filePath = `./src/assets/tracks/${track}`;
        const tags: AudioTrack = await ID3.read(filePath);
        tags.fileName = track;
        return tags;
      } catch (err) {
        console.log(err);
        return {};
      }
    })
  );

  res.status(200).json(audioTrack);
});

router.get("/track/:fileName", (req: Request, res: Response) => {
  const filePath = `${appDir}/assets/tracks/${req.params.fileName}`;
  console.log(filePath);
  res.sendFile(filePath);
});



export { router as trackRouter };
