const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, ScanCommand, QueryCommand } = require('@aws-sdk/lib-dynamodb');

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 3959; // Earth's radius in miles
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

exports.handler = async (event) => {
  try {
    const { 
      category,
      neighborhood, 
      userLat,
      userLon,
      maxDistance = 10,
      limit = 200
    } = event.queryStringParameters || {};

    let command;
    
    if (category) {
      // Query by category
      command = new QueryCommand({
        TableName: process.env.TABLE_NAME,
        IndexName: 'CategoryIndex',
        KeyConditionExpression: 'category = :category',
        ExpressionAttributeValues: {
          ':category': category
        },
        Limit: parseInt(limit)
      });
    } else if (neighborhood) {
      // Query by neighborhood
      command = new QueryCommand({
        TableName: process.env.TABLE_NAME,
        IndexName: 'LocationIndex',
        KeyConditionExpression: 'neighborhood = :neighborhood',
        ExpressionAttributeValues: {
          ':neighborhood': neighborhood
        },
        Limit: parseInt(limit)
      });
    } else {
      // Scan all places
      command = new ScanCommand({
        TableName: process.env.TABLE_NAME,
        Limit: parseInt(limit)
      });
    }

    const result = await docClient.send(command);
    let places = result.Items || [];

    // If user location is provided, calculate distances and sort
    if (userLat && userLon) {
      const userLatNum = parseFloat(userLat);
      const userLonNum = parseFloat(userLon);
      
      places = places
        .map(place => {
          if (place.coordinates && place.coordinates.lat && place.coordinates.lng) {
            const distance = calculateDistance(
              userLatNum, userLonNum,
              place.coordinates.lat, place.coordinates.lng
            );
            return { ...place, distance };
          }
          return { ...place, distance: null };
        })
        .filter(place => !maxDistance || !place.distance || place.distance <= parseFloat(maxDistance))
        .sort((a, b) => {
          if (a.distance === null) return 1;
          if (b.distance === null) return -1;
          return a.distance - b.distance;
        });
    }

    // Group by category for discovery
    const groupedByCategory = places.reduce((acc, place) => {
      if (!acc[place.category]) {
        acc[place.category] = [];
      }
      acc[place.category].push(place);
      return acc;
    }, {});

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      body: JSON.stringify({
        places,
        total: places.length,
        categories: Object.keys(groupedByCategory),
        groupedByCategory,
        hasUserLocation: !!(userLat && userLon)
      })
    };

  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        error: error.message
      })
    };
  }
};