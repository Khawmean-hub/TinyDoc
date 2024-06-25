const linkDoc = 'https://script.google.com/macros/s/AKfycbyrDzjNPOwB1G3g9Gb94Z5D8xxopv1fF3bFY-kI_Q_s/dev'

async function fetchDocContent() {
    try {
      const response = await fetch(linkDoc);
      const data = await response.json();
      console.log(data.content)
    } catch (error) {
      console.error('Error fetching document content:', error);
    }
  }