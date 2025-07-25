# NYC Curated Project Progress

## Project Overview
Building a serverless web application for NYC recommendations to solve the problem of friends and family constantly asking for recommendations. The app showcases 183+ personally curated spots across NYC.

**Domain**: nyc.ziyaadm.com  
**GitHub**: https://github.com/ziyaadm/nyc-curated  
**Project Type**: AWS SAA portfolio project demonstrating serverless architecture

## Completed Tasks ✅

### Phase 1: Foundation & Setup

1. **Data Analysis & Processing**
   - Extracted Google Maps data using Google Takeout ("Saved" export)
   - CSV contains 183 places with Title, Note, URL, Tags, Comment columns
   - Built CSV to JSON processor at `scripts/processData.js`
   - Personal notes preserved (e.g., "Good chai" for Rehmat restaurant)

2. **CDK Infrastructure Setup**
   - Initialized CDK TypeScript project
   - Created comprehensive stack in `lib/nyc-curated-stack.ts`
   - **DynamoDB**: Table with GSIs for category and location queries
   - **Lambda**: Two functions - data ingestion and getNearbyPlaces API
   - **API Gateway**: REST API with CORS for frontend integration
   - **S3**: Static website hosting bucket
   - **CloudFront**: Global CDN distribution
   - **Security**: Least privilege IAM, encryption at rest/transit

3. **Lambda Functions**
   - `dataIngestion.js`: Processes CSV data, smart categorization, batch writes to DynamoDB
   - `getNearbyPlaces.js`: API endpoint for querying places with filtering and distance calculation
   - Auto-categorizes places: coffee, food, parks, culture, drinks, shopping, other
   - Estimates neighborhoods: Manhattan, Brooklyn, Queens, SoHo, etc.

4. **Repository Setup**
   - Professional README with architecture overview and setup instructions
   - Proper .gitignore excluding sensitive data and build artifacts
   - Initial commit with descriptive message
   - Pushed to GitHub: https://github.com/ziyaadm/nyc-curated

## Current State

### Project Structure
```
nyc-curated/
├── lib/
│   └── nyc-curated-stack.ts    # CDK infrastructure
├── lambda/
│   ├── dataIngestion.js        # CSV processing Lambda
│   ├── getNearbyPlaces.js      # API endpoint Lambda
│   └── package.json            # Lambda dependencies
├── scripts/
│   └── processData.js          # CSV to JSON processor
├── data.csv                    # Google Maps export (183 places)
├── processed-data.json         # Processed places data
├── README.md                   # Professional documentation
└── .gitignore                  # Git ignore rules
```

### Data Schema (DynamoDB)
```javascript
{
  placeId: "0x89c25a3836a2822b:0x9de17767a9b244f5", // From Google Maps URL
  name: "Fruit Street Sitting Area",
  note: "",                    // Personal notes from Google Maps
  url: "https://www.google.com/maps/place/...",
  category: "parks",           // Auto-categorized
  neighborhood: "Manhattan",   // Auto-detected
  rating: 4,                   // 5 if has personal note, 4 otherwise
  coordinates: null,           // Will be geocoded later
  createdAt: "2025-07-22T..."
}
```

### AWS Services Configuration
- **DynamoDB**: Pay-per-request billing, CategoryIndex and LocationIndex GSIs
- **Lambda**: Node.js 20.x runtime, proper environment variables
- **API Gateway**: CORS enabled, rate limiting, caching disabled for API routes
- **S3**: Public read access for static assets, encryption enabled
- **CloudFront**: Caching optimized for static content, API pass-through

## Current Status - LIVE AND DEPLOYED ✅

**Live Site**: https://d27p3gw2aa2p40.cloudfront.net  
**API Endpoint**: https://kvax6bff90.execute-api.us-east-1.amazonaws.com/prod/  
**Data Loaded**: 179 places successfully loaded into DynamoDB  
**Display Status**: All 179 places now visible on frontend (limit issue fixed)

### Phase 2 Frontend - COMPLETED ✅

1. **React TypeScript Frontend**
   - Built with Vite + React 18 + TypeScript
   - Tailwind CSS for modern styling
   - React Query for API state management
   - Responsive design with mobile-first approach

2. **Frontend Features**
   - Search functionality across places, notes, and neighborhoods
   - Category-based filtering
   - Rating display and sorting
   - Personal notes highlighted with 💭 emoji
   - Direct Google Maps integration
   - Clean, modern UI design

3. **Production Deployment**
   - S3 static website hosting
   - CloudFront CDN distribution
   - Proper CORS configuration
   - Cache invalidation implemented

### Infrastructure Status
- **CDK Stack**: Deployed and updated ✅
- **S3 Permissions**: Fixed for CloudFront access ✅
- **Data Loading**: 179/183 places loaded (4 filtered for invalid URLs) ✅
- **Frontend Build**: Production build deployed ✅

## Next Steps (Future Enhancements)

### Future Enhancements:
- MTA API integration for travel times
- Geocoding service integration for coordinates
- User location-based recommendations
- Analytics dashboard
- CI/CD pipeline with GitHub Actions

## Key Decisions Made

1. **Architecture**: Serverless-first for cost optimization and scalability
2. **Data Source**: Google Maps Takeout for authentic personal recommendations
3. **Categorization**: Smart auto-categorization based on place names and notes
4. **Discovery Focus**: Emphasis on finding new spots vs just nearby places
5. **Security**: Least privilege IAM, encryption everywhere, proper CORS
6. **Cost Optimization**: On-demand DynamoDB, pay-per-invoke Lambda

## Cost Estimates
- **Low Traffic** (~100-500 visits/month): $2-5/month
- **Moderate Traffic**: ~$10-20/month
- First year mostly free under AWS Free Tier

## Repository Quality
- Professional README showcasing technical skills
- Clean commit history with descriptive messages
- Proper documentation for setup and deployment
- Security best practices demonstrated
- Real-world problem solving approach

## Authentication & Tokens
- GitHub Personal Access Token configured for repository access
- AWS CLI should be configured for CDK deployment

## Commands Reference
```bash
# Build and deploy
npm run build
npx cdk bootstrap  # First time only
npx cdk deploy

# Process data
node scripts/processData.js

# Lambda dependencies
cd lambda && npm install
```

This project demonstrates enterprise-level AWS architecture, security best practices, and real-world problem solving - perfect for impressing prospective employers while providing genuine value to friends and family.