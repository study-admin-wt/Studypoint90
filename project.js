document.addEventListener("DOMContentLoaded", () => {
    // 1. Get the current frontend URL path
    // Example: if the user is on mywebsite.com/dbms/6a2f7cadbd5a279935ce7be7
    const path = window.location.pathname;
    const pathParts = path.split('/').filter(part => part !== '');

    // 2. Extract the last two parts of the URL as subject and ID
    const id = pathParts.pop();      // e.g., '6a2f7cadbd5a279935ce7be7'
    const subject = pathParts.pop(); // e.g., 'dbms'
    
    // If the URL doesn't have enough parts, stop here
    if (!subject || !id) {
        document.getElementById('note-title').textContent = "Error: Invalid URL";
        document.getElementById('note-content').innerHTML = "<p>URL is missing subject or ID.</p>";
        return;
    }

    // 3. Build your Render API URL
    const apiUrl = `https://api-callstudy.onrender.com/api/view/${subject}/${id}`;

    // 4. Fetch the data
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            if (data.success && data.note) {
                // 5. Inject the data into the HTML elements
                
                // Update browser tab title
                document.getElementById('page-title').textContent = data.note.title; 
                
                // Update sidebar title dynamically
                document.getElementById('sidebar-subject').textContent = data.note.subject.toUpperCase() + " TOPICS";
                
                // Update the main heading
                document.getElementById('note-title').textContent = data.note.title;
                
                // Convert the Markdown content into HTML and inject it
                const htmlContent = marked.parse(data.note.content);
                document.getElementById('note-content').innerHTML = htmlContent;
                
            } else {
                throw new Error("Note not found in database");
            }
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            document.getElementById('note-title').textContent = "Error loading content";
            document.getElementById('note-content').innerHTML = "<p>Sorry, we couldn't load the requested topic.</p>";
        });
});

// Existing toggle menu function
function toggleTopicMenu() {
    // Add your sidebar toggle CSS logic here
    console.log("Menu toggled");
}
