const fs = require('fs');
const path = require('path');

function csvToJson(csvText) {
  const lines = csvText.split('\n');
  const headers = lines[0].split(',');
  const result = [];

  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue;
    
    const values = lines[i].split(',');
    const obj = {};
    
    headers.forEach((header, index) => {
      obj[header.trim()] = values[index] ? values[index].trim() : '';
    });
    
    if (obj.Title) {
      result.push(obj);
    }
  }
  
  return result;
}

function main() {
  try {
    const csvPath = path.join(__dirname, '../data.csv');
    const csvContent = fs.readFileSync(csvPath, 'utf8');
    
    const jsonData = csvToJson(csvContent);
    
    console.log(`Parsed ${jsonData.length} places from CSV`);
    console.log('\nSample places:');
    jsonData.slice(0, 5).forEach((place, i) => {
      console.log(`${i + 1}. ${place.Title} ${place.Note ? `(${place.Note})` : ''}`);
    });
    
    // Save processed data
    const outputPath = path.join(__dirname, '../processed-data.json');
    fs.writeFileSync(outputPath, JSON.stringify(jsonData, null, 2));
    
    console.log(`\nProcessed data saved to: ${outputPath}`);
    console.log('\nNext steps:');
    console.log('1. Deploy the CDK stack: npx cdk deploy');
    console.log('2. Run the data ingestion Lambda with this processed data');
    
  } catch (error) {
    console.error('Error processing data:', error);
  }
}

if (require.main === module) {
  main();
}

module.exports = { csvToJson };