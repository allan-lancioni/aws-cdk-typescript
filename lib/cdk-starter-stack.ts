import * as cdk from "aws-cdk-lib";
import { Bucket, CfnBucket } from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

class L3Bucket extends Construct {
  constructor(scope: Construct, id: string, duration: number) {
    super(scope, id);

    new Bucket(this, 'L3Bucket', {
      lifecycleRules: [{
        expiration: cdk.Duration.days(duration)
      }]
    })
  }
}

export class CdkStarterStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const duration = new cdk.CfnParameter(this, 'duration', {
      default: 5,
      minValue: 1,
      maxValue: 10,
      type: 'Number'
    })

    const myL1Bucket = new CfnBucket(this, "MyL1Bucket", {
      lifecycleConfiguration: {
        rules: [
          {
            expirationInDays: duration.valueAsNumber,
            status: "Enabled",
          },
        ],
      },
    });

    const myL2Bucket = new Bucket(this, "MyL2Bucket", {
      lifecycleRules: [
        {
          expiration: cdk.Duration.days(duration.valueAsNumber),
        },
      ],
    });

    const myL3Bucket = new L3Bucket(this, 'MyL3Bucket', duration.valueAsNumber)

  }
}
