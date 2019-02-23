import { S3 } from "aws-sdk";

export default function createS3Client() {
  let options = {};
  return new S3(options);
}
