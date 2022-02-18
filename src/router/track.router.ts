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

router.put(
  "/track",
  [body("audioTag").notEmpty()],
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).send(errors.array());
      console.log(req.body);
      const tag: AudioTag = req.body.audioTag;
      const filePath = `./src/assets/tracks/${tag.fileName}`;
      await ID3.update(req.body.audioTag, filePath, async (err, buffer) => {
        if (err) throw err;
        await ID3.read(filePath, function (err, tags) {
          if (err) throw err;
          const toReturnTag: AudioTag = tags;
          toReturnTag.fileName = tag.fileName;
          res.status(200).send(toReturnTag);
        });
      });
    } catch (err) {
      console.log(err);
      res.status(400);
    }
  }
);

export { router as trackRouter };
