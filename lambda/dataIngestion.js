const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, PutCommand, BatchWriteCommand } = require('@aws-sdk/lib-dynamodb');

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

function extractPlaceIdFromUrl(url) {
  const match = url.match(/1s0x[a-f0-9]+:0x[a-f0-9]+/);
  return match ? match[0] : null;
}

function categorizePlace(name, note) {
  const nameLC = name.toLowerCase();
  const noteLC = note ? note.toLowerCase() : '';
  
  if (nameLC.includes('coffee') || nameLC.includes('cafe') || noteLC.includes('coffee') || noteLC.includes('chai')) {
    return 'coffee';
  } else if (nameLC.includes('pizza') || nameLC.includes('restaurant') || nameLC.includes('deli') || nameLC.includes('food') || nameLC.includes('bakery')) {
    return 'food';
  } else if (nameLC.includes('park') || nameLC.includes('garden') || nameLC.includes('plaza') || nameLC.includes('woods')) {
    return 'parks';
  } else if (nameLC.includes('bar') || nameLC.includes('cocktail') || nameLC.includes('brew')) {
    return 'drinks';
  } else if (nameLC.includes('museum') || nameLC.includes('gallery') || nameLC.includes('theater') || nameLC.includes('sculpture')) {
    return 'culture';
  } else if (nameLC.includes('shop') || nameLC.includes('store') || nameLC.includes('barbershop')) {
    return 'shopping';
  }
  return 'other';
}

function estimateNeighborhood(name) {
  const nameLC = name.toLowerCase();
  
  if (nameLC.includes('brooklyn') || nameLC.includes('williamsburg') || nameLC.includes('dumbo')) return 'Brooklyn';
  if (nameLC.includes('queens') || nameLC.includes('astoria') || nameLC.includes('long island city')) return 'Queens';
  if (nameLC.includes('soho') || nameLC.includes('nolita')) return 'SoHo';
  if (nameLC.includes('village') || nameLC.includes('washington square')) return 'Greenwich Village';
  if (nameLC.includes('chelsea')) return 'Chelsea';
  if (nameLC.includes('midtown') || nameLC.includes('times square')) return 'Midtown';
  if (nameLC.includes('upper east')) return 'Upper East Side';
  if (nameLC.includes('upper west')) return 'Upper West Side';
  if (nameLC.includes('tribeca')) return 'Tribeca';
  if (nameLC.includes('chinatown')) return 'Chinatown';
  if (nameLC.includes('lower east')) return 'Lower East Side';
  if (nameLC.includes('financial') || nameLC.includes('wall street') || nameLC.includes('battery')) return 'Financial District';
  
  return 'Manhattan';
}

exports.handler = async (event) => {
  try {
    const csvData = event.csvData;
    
    if (!csvData || !Array.isArray(csvData)) {
      throw new Error('CSV data is required and must be an array');
    }

    const items = [];
    
    for (const row of csvData) {
      if (!row.Title || row.Title === 'Title') continue;
      
      const placeId = extractPlaceIdFromUrl(row.URL);
      if (!placeId) continue;

      const category = categorizePlace(row.Title, row.Note);
      const neighborhood = estimateNeighborhood(row.Title);
      
      const item = {
        placeId,
        name: row.Title,
        note: row.Note || '',
        url: row.URL,
        category,
        neighborhood,
        rating: row.Note ? 5 : 4, // Assume places with notes are higher rated
        tags: [],
        createdAt: new Date().toISOString(),
        coordinates: null // Will be filled by geocoding service later
      };
      
      items.push(item);
    }

    // Batch write to DynamoDB (25 items at a time)
    const batchSize = 25;
    const results = [];
    
    for (let i = 0; i < items.length; i += batchSize) {
      const batch = items.slice(i, i + batchSize);
      
      const putRequests = batch.map(item => ({
        PutRequest: {
          Item: item
        }
      }));

      const command = new BatchWriteCommand({
        RequestItems: {
          [process.env.TABLE_NAME]: putRequests
        }
      });

      const result = await docClient.send(command);
      results.push(result);
      
      // Small delay to avoid throttling
      if (i + batchSize < items.length) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `Successfully processed ${items.length} places`,
        results: results.length
      })
    };

  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message
      })
    };
  }
};