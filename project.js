document.addEventListener("DOMContentLoaded", () => {
    // Path looks like: /Studypoint90/Dbms/6a2f7cadbd5a279935ce7be7
    const path = window.location.pathname;
    const pathParts = path.split('/').filter(part => part !== '');

    // Grab from the end of the URL
    const id = pathParts.pop();      // Gets '6a2f7cadbd5a279935ce7be7'
    let subject = pathParts.pop();   // Gets 'Dbms'
    
    // If the URL doesn't have enough parts, stop here
    if (!subject || !id) {
        document.getElementById('note-title').textContent = "Error: Invalid URL";
        document.getElementById('note-content').innerHTML = "<p>URL is missing subject or ID.</p>";
        return;
    }

    // Convert "Dbms" to "dbms" to match your API requirements
    subject = subject.toLowerCase();

    // Build your Render API URL
    const apiUrl = `https://api-callstudy.onrender.com/api/view/${subject}/${id}`;

    // Fetch the data
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) throw new Error("Network response was not ok");
            return response.json();
        })
        .then(data => {
            if (data.success && data.note) {
                document.getElementById('page-title').textContent = data.note.title; 
                document.getElementById('sidebar-subject').textContent = data.note.subject.toUpperCase() + " TOPICS";
                document.getElementById('note-title').textContent = data.note.title;
                
                // Convert the Markdown to HTML
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
