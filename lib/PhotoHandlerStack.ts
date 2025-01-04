import * as cdk from "aws-cdk-lib";
import {
  Code,
  Function as LambdaFunction,
  Runtime,
} from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";

interface PhotoHandlerStackProps extends cdk.StackProps {
  targetBucketArn: string;
}

export class PhotoHandlerStack extends cdk.Stack {

  constructor(scope: Construct, id: string, props: PhotoHandlerStackProps) {
    super(scope, id, props);
    
    const targetBucket = cdk.Fn.importValue("photos-bucket");

    new LambdaFunction(this, "PhotosHandler", {
      runtime: Runtime.NODEJS_22_X,
      handler: "index.handler",
      code: Code.fromInline(`
        exports.handler = async(event) => {
          console.log("hello from " + process.env.TARGET_BUCKET);
          return { message: "Hello, CommonJS!" };
        };
      `),
      environment: {
        TARGET_BUCKET: props.targetBucketArn,
      },
    });
  }
}
