let entries = [];

function onSubmit(e) {
    e.preventDefault();  
    let data = {
        name: document.querySelector("#name").value,
        email: document.querySelector("#email").value,
        password : document.querySelector("#password").value,
        dob: document.querySelector("#dob").value,
        acceptTerms: !!document.querySelector("#acceptTerms").value
    }
    const today = new Date();
    const dob  = new Date(data.dob);
    let age = today.getFullYear() - dob.getFullYear();
  
    if (
      today.getMonth() < dob.getMonth() ||
      (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())
    ) {
       age--;
    }

    if(!(age >= 18 && age <= 55)){
        document.querySelector("#dob").setCustomValidity("Error");
        document.querySelector("#dob").reportValidity();
        return false;
    }

  

    entries.push(data);
    localStorage.setItem('users', JSON.stringify(entries));

    document.querySelector('table').appendChild(createUser(data));
}

function createUser(user){
    const row = document.createElement('tr');
    row.innerHTML =`
    <td>${user.name}</td>
    <td>${user.email}</td>
    <td>${user.password}</td>
    <td>${user.dob}</td>
    <td>${user.acceptTerms}</td>
    `;

    return row;
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector('form').addEventListener('submit', onSubmit);
    entries = JSON.parse(localStorage.getItem('users')) || [];
    for(let user of entries){
        document.querySelector('table').appendChild(createUser(user));
    }
});
