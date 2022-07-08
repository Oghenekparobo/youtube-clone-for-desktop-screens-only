import prisma from "lib/prisma";
import { faker } from "@faker-js/faker";
import AWS from "aws-sdk";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.end();

  if (req.body.task === "generate_content") {
    // create 100 users

    let i = 0;
    while (i < 5) {
      await prisma.user.create({
        data: {
          name: faker.name.findName(),
          username: faker.internet.userName().toLowerCase(),
          email: faker.internet.email().toLowerCase(),
          image: faker.image.avatar(),
        },
      });

      i++;
    }

    const s3 = new AWS.S3({
      accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
    });

    const videoURL = "https://bootcamp-oghenekparobo.s3.ca-central-1.amazonaws.com/big_buck_bunny_720p_5mb.mp4.mp4";
    const thumbnailURL = "https://bootcamp-oghenekparobo.s3.ca-central-1.amazonaws.com/pexels-gabriella-12329480.jpg";

    const users = await prisma.user.findMany();

    const getRandomUser = () => {
      const randomIndex = Math.floor(Math.random() * users.length);
      return users[randomIndex];
    };

    //create 20 videos, randomly assigned to users
    let k = 0;

    while (k < 20) {
      await prisma.video.create({
        data: {
          title: faker.lorem.words(),
          thumbnail: thumbnailURL,
          url: videoURL,
          length: faker.datatype.number(1000),
          visibility: "public",
          views: faker.datatype.number(1000),
          author: {
            connect: { id: getRandomUser().id },
          },
        },
      });

      k++
    }
  }

  if (req.body.task === "clean_database") {
    await prisma.user.deleteMany({});
  }
  res.end();
}
