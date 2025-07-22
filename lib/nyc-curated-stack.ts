import * as cdk from 'aws-cdk-lib';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';
import { Construct } from 'constructs';

export class NycCuratedStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // DynamoDB Table for Places
    const placesTable = new dynamodb.Table(this, 'PlacesTable', {
      tableName: 'nyc-curated-places',
      partitionKey: {
        name: 'placeId',
        type: dynamodb.AttributeType.STRING
      },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      encryption: dynamodb.TableEncryption.AWS_MANAGED,
      pointInTimeRecovery: true,
      removalPolicy: cdk.RemovalPolicy.RETAIN
    });

    // GSI for category-based queries
    placesTable.addGlobalSecondaryIndex({
      indexName: 'CategoryIndex',
      partitionKey: {
        name: 'category',
        type: dynamodb.AttributeType.STRING
      },
      sortKey: {
        name: 'rating',
        type: dynamodb.AttributeType.NUMBER
      }
    });

    // GSI for location-based queries
    placesTable.addGlobalSecondaryIndex({
      indexName: 'LocationIndex', 
      partitionKey: {
        name: 'neighborhood',
        type: dynamodb.AttributeType.STRING
      },
      sortKey: {
        name: 'placeId',
        type: dynamodb.AttributeType.STRING
      }
    });

    // S3 Bucket for frontend and assets
    const websiteBucket = new s3.Bucket(this, 'WebsiteBucket', {
      bucketName: `nyc-curated-${cdk.Aws.ACCOUNT_ID}`,
      websiteIndexDocument: 'index.html',
      websiteErrorDocument: 'error.html',
      publicReadAccess: true,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ACLS,
      encryption: s3.BucketEncryption.S3_MANAGED,
      removalPolicy: cdk.RemovalPolicy.RETAIN
    });

    // Lambda function for getting nearby places
    const getNearbyPlacesFunction = new lambda.Function(this, 'GetNearbyPlaces', {
      runtime: lambda.Runtime.NODEJS_20_X,
      code: lambda.Code.fromAsset('lambda'),
      handler: 'getNearbyPlaces.handler',
      environment: {
        TABLE_NAME: placesTable.tableName
      }
    });

    // Lambda function for data ingestion
    const dataIngestionFunction = new lambda.Function(this, 'DataIngestion', {
      runtime: lambda.Runtime.NODEJS_20_X,
      code: lambda.Code.fromAsset('lambda'),
      handler: 'dataIngestion.handler',
      timeout: cdk.Duration.minutes(5),
      environment: {
        TABLE_NAME: placesTable.tableName
      }
    });

    // Grant DynamoDB permissions
    placesTable.grantReadData(getNearbyPlacesFunction);
    placesTable.grantWriteData(dataIngestionFunction);

    // API Gateway
    const api = new apigateway.RestApi(this, 'NycCuratedApi', {
      restApiName: 'NYC Curated API',
      description: 'API for NYC recommendations app',
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
        allowMethods: apigateway.Cors.ALL_METHODS,
        allowHeaders: ['Content-Type', 'X-Amz-Date', 'Authorization', 'X-Api-Key']
      }
    });

    // API Gateway integration
    const placesResource = api.root.addResource('places');
    const nearbyResource = placesResource.addResource('nearby');
    
    nearbyResource.addMethod('GET', new apigateway.LambdaIntegration(getNearbyPlacesFunction));

    // CloudFront Distribution
    const distribution = new cloudfront.Distribution(this, 'Distribution', {
      defaultBehavior: {
        origin: new origins.S3Origin(websiteBucket),
        allowedMethods: cloudfront.AllowedMethods.ALLOW_GET_HEAD,
        cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED
      },
      additionalBehaviors: {
        '/api/*': {
          origin: new origins.RestApiOrigin(api),
          allowedMethods: cloudfront.AllowedMethods.ALLOW_ALL,
          cachePolicy: cloudfront.CachePolicy.CACHING_DISABLED
        }
      }
    });

    // Outputs
    new cdk.CfnOutput(this, 'WebsiteURL', {
      value: `https://${distribution.domainName}`,
      description: 'CloudFront Distribution URL'
    });

    new cdk.CfnOutput(this, 'ApiURL', {
      value: api.url,
      description: 'API Gateway URL'
    });

    new cdk.CfnOutput(this, 'DataIngestionFunction', {
      value: dataIngestionFunction.functionName,
      description: 'Data ingestion Lambda function name'
    });
  }
}
