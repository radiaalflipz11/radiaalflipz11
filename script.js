document.getElementById('generateButton').addEventListener('click', () => {
  const descriptionInput = document.getElementById('description');
  const imagesContainer = document.getElementById('imagesContainer');
  imagesContainer.innerHTML = ''; // Clear previous images

  const formData = new FormData();
  formData.append('prompt', descriptionInput.value);
  formData.append('samples', 1);
  formData.append('quality', 'MID');
  formData.append('guidance_scale', 40);
  formData.append('aspect_ratio', '1:1');
  formData.append('style', 'PHOTOREALISTIC');

  const apiKey = 'lmwr_sk_5hH7OICbHR_psSMX229KAQgob8bQ0D0DsQbin3dF0P7cMOjC'; // Replace with your actual LimeWire API key
  const apiUrl = 'https://api.limewire.com/v1/images/generate'; // Ensure this is the correct endpoint

  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`
    },
    body: formData
  })
  .then(response => {
    if (!response.ok) {
      return response.json().then(errorInfo => Promise.reject(errorInfo));
    }
    return response.json();
  })
  .then(data => {
    if (data.status === 'COMPLETED') {
      // Assuming the API returns image URLs in the 'data' array
      data.data.forEach(imageInfo => {
        const imgElement = document.createElement('img');
        imgElement.src = imageInfo.url; // Update with the correct field for image URL
        imagesContainer.appendChild(imgElement);
      });
    } else {
      alert('Image generation is in progress or failed');
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert('Failed to generate images. Please check the console for details.');
  });
});
