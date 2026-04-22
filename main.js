let data = JSON.parse(localStorage.getItem('data')) || [];
let editIndex = -1;
let isSearching = false;

function render(filtered = data) {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';

    filtered.forEach((item, index) => {
        tableBody.innerHTML += `
        <tr>
          <td>${item.name}</td>
          <td>${item.email}</td>
          <td class="actions">
            <button onclick="editData(${index})">Edit</button>
            <button onclick="deleteData(${index})">Delete</button>
          </td>
        </tr>
      `;
    });

    localStorage.setItem('data', JSON.stringify(data));
}

function addData() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    if (!name || !email) {
        alert('Please fill all fields');
        return;
    }

    if (editIndex === -1) {
        data.push({ name, email });
    } else {
        data[editIndex] = { name, email };
        editIndex = -1;
    }

    document.getElementById('name').value = '';
    document.getElementById('email').value = '';

    render();
}

function editData(index) {
    document.getElementById('name').value = data[index].name;
    document.getElementById('email').value = data[index].email;
    editIndex = index;
}

function deleteData(index) {
    if (confirm('Are you sure?')) {
        data.splice(index, 1);
        render();
    }
}

function searchData() {
    const value = document.getElementById('search').value.toLowerCase();

    const filtered = data.filter(item =>
        item.name.toLowerCase().includes(value) ||
        item.email.toLowerCase().includes(value)
    );

    render(filtered);
}

function toggleSearch() {
    const icon = document.getElementById('searchIcon');

    if (!isSearching) {
        searchData();
        icon.classList.remove('fa-magnifying-glass');
        icon.classList.add('fa-xmark');
        isSearching = true;
    } else {
        document.getElementById('search').value = '';
        render();

        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-magnifying-glass');
        isSearching = false;
    }
}

render();


