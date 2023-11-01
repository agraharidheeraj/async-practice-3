const fetch = require('node-fetch');

// Function to fetch and print directories
async function fetchAndPrintDirectories() {
  try {
    // Fetch the root directory data
    const rootResponse = await fetch('http://localhost:3000');
    const rootData = await rootResponse.json();

    if (rootData.items && rootData.items.length > 0) {
      for (const item of rootData.items) {
        if (item.isDir) {
          // Fetch directory data and print it
          const directoryData = await fetchDirectory(item.name);
          console.log(JSON.stringify(directoryData, null, 2));
        }
      }
    }
  } catch (error) {
    console.error('Error fetching root directory:', error);
  }
}

// Function to fetch directory data
async function fetchDirectory(directoryName) {
  try {
    // Fetch data for a specific directory
    const directoryResponse = await fetch(`http://localhost:3000/${directoryName}`);
    const directoryData = await directoryResponse.json();

    const result = {
      name: directoryName,
      isDir: true,
      files: [],
    };

    if (directoryData.files && directoryData.files.length > 0) {
      for (const file of directoryData.files) {
        result.files.push(file);
      }
    }

    return result;
  } catch (error) {
    console.error(`Error fetching files in directory ${directoryName}:`, error);
    return {};
  }
}

// Call the fetchAndPrintDirectories function to start the process
fetchAndPrintDirectories();
