# NYC Curated

A serverless web application showcasing my curated recommendations for NYC visitors, built with AWS CDK and modern cloud architecture.

## 🗽 About

NYC Curated solves the problem of friends and family constantly asking for NYC recommendations. Instead of repeatedly sharing the same list, I built this beautiful, interactive web app that showcases 183+ personally curated spots across the five boroughs.

**Live Site**: [nyc.ziyaadm.com](https://nyc.ziyaadm.com)

## 🏗️ Architecture

### AWS Services Used
- **DynamoDB**: NoSQL database with GSIs for fast querying by category/location
- **Lambda**: Serverless compute for API endpoints and data processing
- **API Gateway**: RESTful API with CORS support
- **S3**: Static website hosting for frontend assets
- **CloudFront**: Global CDN for performance and caching
- **CDK**: Infrastructure as Code using TypeScript

### Key Features
- **Discovery-Focused UX**: Find great spots you might not know about
- **Smart Categorization**: Auto-categorized into food, coffee, parks, culture, etc.
- **Personal Notes**: My personal recommendations and notes for each place
- **Responsive Design**: Mobile-first for on-the-go discovery
- **Fast Performance**: Sub-second API responses with CloudFront caching

## 🚀 Tech Stack

**Backend:**
- AWS CDK (TypeScript)
- Node.js Lambda functions
- DynamoDB with Global Secondary Indexes
- API Gateway with Lambda integration

**Frontend:** (Coming in Phase 2)
- React with TypeScript
- Interactive maps (Mapbox/AWS Location Service)
- Responsive CSS/Material-UI

**DevOps:**
- GitHub Actions CI/CD
- AWS CDK for infrastructure deployment
- Proper IAM roles with least privilege

## 📊 Data Source

Places data sourced from my personal Google Maps saved lists, processed and enriched with:
- Smart categorization based on place names and notes
- Neighborhood estimation for location-based filtering
- Personal ratings and notes preserved from original list

## 🛠️ Local Development

### Prerequisites
- Node.js 18+
- AWS CLI configured
- AWS CDK CLI installed

### Setup
```bash
# Clone the repository
git clone https://github.com/yourusername/nyc-curated.git
cd nyc-curated

# Install dependencies
npm install
cd lambda && npm install && cd ..

# Build the CDK app
npm run build

# Deploy to AWS
npx cdk bootstrap  # First time only
npx cdk deploy
```

### Data Ingestion
```bash
# Process CSV data from Google Takeout
node scripts/processData.js

# Deploy and run data ingestion Lambda
# (See deployment instructions below)
```

## 📁 Project Structure

```
nyc-curated/
├── lib/
│   └── nyc-curated-stack.ts    # CDK infrastructure definition
├── lambda/
│   ├── dataIngestion.js        # Process and load places data
│   ├── getNearbyPlaces.js      # API for querying places
│   └── package.json
├── scripts/
│   └── processData.js          # CSV to JSON processor
├── frontend/                   # React app (Phase 2)
├── data.csv                    # Google Maps export data
└── processed-data.json         # Processed places data
```

## 🔒 Security & Best Practices

- **Least Privilege IAM**: Lambda functions have minimal required permissions
- **Encryption**: DynamoDB encryption at rest and in transit
- **CORS**: Properly configured for frontend domain
- **Rate Limiting**: API Gateway throttling configured
- **Cost Optimization**: On-demand DynamoDB billing, Lambda pay-per-invoke

## 🌟 Why This Project

This project demonstrates:
1. **Real-world problem solving**: Solving an actual pain point for friends/family
2. **AWS SAA skills**: Serverless architecture, proper security, cost optimization
3. **Full-stack development**: Backend APIs, frontend UX, data processing
4. **Best practices**: Infrastructure as Code, CI/CD, monitoring
5. **Personal branding**: Showcases both technical skills and local NYC knowledge

## 📈 Future Enhancements

- [ ] Interactive frontend with React
- [ ] MTA API integration for travel times
- [ ] User location-based recommendations
- [ ] Photo uploads for places
- [ ] Analytics dashboard
- [ ] Mobile app version

## 🤝 Contributing

This is a personal portfolio project, but feedback and suggestions are welcome! Please open an issue or reach out.

## 📞 Contact

- **Website**: [ziyaadm.com](https://ziyaadm.com)
- **LinkedIn**: [linkedin.com/in/ziyaadm](https://linkedin.com/in/ziyaadm)
- **Email**: hello@ziyaadm.com

---

*Built with ❤️ in NYC*
