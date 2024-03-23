const spinnerContainer = document.getElementById('spinner');

const encabezadoTabla = () => {
  return `
    <table class="table table-hover">
    <thead>
      <tr>
        <th scope="col">ID</th>
        <th scope="col">Email</th>
        <th scope="col">First Name</th>
        <th scope="col">Last Name</th>
        <th scope="col">Avatar</th>
      </tr>
    </thead>
  <tbody>
`;
};

const cuerpoTabla = (user) => {
  return `
    <tr>
      <th scope="row">${user.id}</th>
      <td>${user.email}</td>
      <td>${user.first_name}</td>
      <td>${user.last_name}</td>
      <td><img src="${user.avatar}" alt="Avatar de ${user.first_name} ${user.last_name}" style="width: 50px; height: 50px; border-radius: 50%;"></td>
    </tr>
`;
};

const generarTabla = (users) => {
  const encabezado = encabezadoTabla();
  const cuerpo = users.map(user => cuerpoTabla(user)).join("");
  return encabezado + cuerpo + "</tbody></table>";
};

const mostrarTabla = (tabla) => document.getElementById("generarTabla").innerHTML = tabla;

const obtenerDatos = async (url) => {
  try {
    //spinnerContainer.style.display = 'flex';
    const resolve = await fetch(url);
    const requestData = await resolve.json();
    const users = requestData.data;
    setTimeout(() => {
      const tabla = generarTabla(users);
      mostrarTabla(tabla);
      spinnerContainer.style.display = 'none';
    }, 5000);
  } catch (err) {
    console.error('Error al obtener datos: ', err);
    spinnerContainer.style.display = 'none';
  }
}

const handleButton = () => {
  spinnerContainer.style.display = 'flex';
  obtenerDatos("https://reqres.in/api/users?delay=3");
};