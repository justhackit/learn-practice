import { Construct } from 'constructs';
import { CfnOutput, RemovalPolicy } from 'aws-cdk-lib';
import { Distribution, PriceClass, ViewerProtocolPolicy } from 'aws-cdk-lib/aws-cloudfront';
import { S3Origin } from 'aws-cdk-lib/aws-cloudfront-origins';
import { BlockPublicAccess, Bucket } from 'aws-cdk-lib/aws-s3';
import { BucketDeployment, Source } from 'aws-cdk-lib/aws-s3-deployment';
import { Certificate } from 'aws-cdk-lib/aws-certificatemanager'


const path = './resources/build';

export class DeploymentService extends Construct {
    constructor(scope: Construct, id: string) {
        super(scope, id);

        //1. Create an s3 bucket where the site's static content is stored
        const hostingBucket = new Bucket(this, 'alantur-AWSomeUI-origin', {
            autoDeleteObjects: true,
            blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
            removalPolicy: RemovalPolicy.DESTROY,
        });

        //2. Create a Cloudfront distribution 
        const distribution = new Distribution(this, 'AWSomeUICloudfrontDistribution', {
            priceClass: PriceClass.PRICE_CLASS_100,
            defaultBehavior: {
                origin: new S3Origin(hostingBucket),
                viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
            },
            defaultRootObject: '/awsomeui/index.html',
            errorResponses: [
                {
                    httpStatus: 404,
                    responseHttpStatus: 200,
                    responsePagePath: '/awsomeui/index.html',
                },
                {
                    httpStatus: 403,
                    responseHttpStatus: 200,
                    responsePagePath: '/awsomeui/index.html',
                },
            ],
            domainNames: ["awsomeui.ajaysquare.com"],
            certificate: Certificate.fromCertificateArn(this, "ajaysquare_cert", "arn:aws:acm:us-east-1:676755168728:certificate/b9c312ca-02af-430d-ac76-b274760f7b7d")
        });

        //3. Deploy the Cloudfront distribution
        new BucketDeployment(this, 'BucketDeployment', {
            sources: [Source.asset(path)],
            destinationBucket: hostingBucket,
            distribution,
            distributionPaths: ['/*'],
            destinationKeyPrefix: "awsomeui/"
        });

        new CfnOutput(this, 'CloudFrontURL', {
            value: distribution.domainName,
            description: 'The distribution URL',
            exportName: 'CloudfrontURL',
        });

        new CfnOutput(this, 'BucketName', {
            value: hostingBucket.bucketName,
            description: 'The name of the S3 bucket',
            exportName: 'BucketName',
        });


    }
}