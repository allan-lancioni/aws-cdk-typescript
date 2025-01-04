#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { PhotoStack } from "../lib/PhotoStack";
import { PhotoHandlerStack } from "../lib/PhotoHandlerStack";
import { BucketTagger } from './BucketTagger';

const app = new cdk.App();
const photoStack = new PhotoStack(app, "PhotosStack");
new PhotoHandlerStack(app, "PhotoHandlerStack", {
  targetBucketArn: photoStack.photosBucketArn,
});

const bucketTagger = new BucketTagger("level", "test");
cdk.Aspects.of(app).add(bucketTagger);