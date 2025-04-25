import fetch from 'node-fetch';

const API_URL = 'http://localhost:5000/api';

async function testApi() {
  try {
    // Test GET /api/links
    console.log('Test GET /api/links');
    const getResponse = await fetch(`${API_URL}/links`);
    const getData = await getResponse.json();
    console.log('GET Response:', getData);

    // Test POST /api/links
    console.log('\nTest POST /api/links');
    const postResponse = await fetch(`${API_URL}/links`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Test Link',
        url: 'https://example.com',
        category: 'test',
        _id: Date.now().toString(),
      }),
    });
    const postData = await postResponse.json();
    console.log('POST Response:', postData);

    // Test GET /api/links again to see if the new link was added
    console.log('\nTest GET /api/links again');
    const getResponse2 = await fetch(`${API_URL}/links`);
    const getData2 = await getResponse2.json();
    console.log('GET Response:', getData2);

    console.log('\nAPI Tests completed successfully!');
  } catch (error) {
    console.error('Error testing API:', error);
  }
}

testApi(); 