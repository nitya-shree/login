document.getElementById('addStudentForm').addEventListener('submit', function(e) {
    e.preventDefault();
  
    const name = document.getElementById('name').value;
    const marks = document.getElementById('marks').value;
  
    fetch('/students', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, marks }),
    })
    .then(response => response.text())
    .then(() => {
        alert('Student added successfully!');
        document.getElementById('addStudentForm').reset();
        fetchStudents();
    });
  });
  document.getElementById('searchForm').addEventListener('submit', function(e) {
      e.preventDefault();
      const name = document.getElementById('searchName').value;
  
      fetch(`/students/marks?name=${encodeURIComponent(name)}`)
      .then(response => response.json())
      .then(data => {
          const resultArea = document.getElementById('searchResults');
          if (data.marks !== undefined) {
              resultArea.innerHTML = `<p>Marks for ${name}: ${data.marks}</p>`;
          } else {
              resultArea.innerHTML =  `<p>Student not found</p>`;}
          })
            .catch(() => {
                alert('Student not found or an error occurred');
            });
        });
        
        function fetchStudents() {
          fetch('/students')
          .then(response => response.json())
          .then(data => {
              const list = document.getElementById('studentsList');
              list.innerHTML = '';
              data.forEach(student => {
                  const item = document.createElement('li');
                  item.textContent = `${student.name} - ${student.marks}`;
                  list.appendChild(item);
              });
          });
        }
        
        fetchStudents();