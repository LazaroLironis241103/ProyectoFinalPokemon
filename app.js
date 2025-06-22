// ===== Menu Hamburguesa =====
const toggle = document.getElementById('menu-toggle');
const nav = document.getElementById('nav');
const overlay = document.getElementById('overlay');

toggle.addEventListener('click', () => {
  nav.classList.toggle('active');
  toggle.classList.toggle('open');
  overlay.classList.toggle('active');
});

overlay.addEventListener('click', () => {
  nav.classList.remove('active');
  toggle.classList.remove('open');
  overlay.classList.remove('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('active');
    toggle.classList.remove('open');
    overlay.classList.remove('active');
  });
});

// ===== Traduccion a Español =====
const tiposTraducidos = {
  normal: "Normal", fire: "Fuego", water: "Agua", grass: "Planta", electric: "Eléctrico",
  ice: "Hielo", fighting: "Lucha", poison: "Veneno", ground: "Tierra", flying: "Volador",
  psychic: "Psíquico", bug: "Bicho", rock: "Roca", ghost: "Fantasma", dark: "Siniestro",
  dragon: "Dragón", steel: "Acero", fairy: "Hada"
};

// ===== Busqueda de Pokémon =====
const input = document.getElementById("pokemonInput");
const apiData = document.getElementById("api-data");

input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    const nombre = input.value.toLowerCase().trim();
    if (nombre) {
      fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`)
        .then(response => {
          if (!response.ok) throw new Error("¡Pokémon no encontrado!");
          return response.json();
        })
        .then(data => mostrarPokemon(data))
        .catch(error => {
          apiData.innerHTML = `<p style="color: white; font-weight: bold;">${error.message}</p>`;
        });
    }
  }
});

function mostrarPokemon(pokemon) {
  const nombre = pokemon.name;
  const imagen = pokemon.sprites.other['official-artwork'].front_default;

  const tiposHTML = pokemon.types.map(t => {
    const tipoEn = t.type.name.toLowerCase();
    const tipoEs = tiposTraducidos[tipoEn] || tipoEn;
    return `<span class="type type-${tipoEn}">${tipoEs}</span>`;
  }).join('');

  const html = `
    <div class="pokemon-card">
      <img src="${imagen}" alt="${nombre}">
      <h3>${nombre}</h3>
      <div style="text-align: center;">${tiposHTML}</div>
    </div>
  `;

  apiData.innerHTML = html;
}

// ===== Validación de Formulario =====
const nombreInput = document.getElementById("nombre");
const mensajeNombre = document.getElementById("mensaje1");

nombreInput.addEventListener('input', () => {
  const valor = nombreInput.value.trim();
  const soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;  
  const letrasSolo = valor.replace(/\s/g, '');     

  if (letrasSolo.length < 3 || !soloLetras.test(valor)) {
    mensajeNombre.textContent = "El nombre debe tener al menos 3 letras y solo contener letras";
    nombreInput.style.borderColor = "red";
  } else {
    mensajeNombre.textContent = "Nombre válido";
    nombreInput.style.borderColor = "green";
  }
});

const emailInput = document.getElementById("email");
const mensajeEmail = document.getElementById("mensaje2");
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

emailInput.addEventListener('input', () => {
  if (emailRegex.test(emailInput.value.trim())) {
    mensajeEmail.textContent = "Correo válido";
    emailInput.style.borderColor = "green";
  } else {
    mensajeEmail.textContent = "Correo inválido";
    emailInput.style.borderColor = "red";
  }
});

const passwordInput = document.getElementById("password");
const mensajePassword = document.getElementById("mensaje3");

passwordInput.addEventListener('input', () => {
  const valor = passwordInput.value;

  if (valor.length < 8) {
    mensajePassword.textContent = "Debe tener al menos 8 caracteres";
    passwordInput.style.borderColor = "red";
  } else {
    mensajePassword.textContent = "Contraseña válida";
    passwordInput.style.borderColor = "green";
  }
});

const form = document.getElementById("form");
const enviarInput = document.getElementById("submit");
const mensajeSubmit = document.getElementById("mensaje4");

enviarInput.addEventListener('click', (e) => {
  e.preventDefault();

  const nombreValido = (() => {
    const valor = nombreInput.value.trim();
    const soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
    const letrasSolo = valor.replace(/\s/g, '');
    return letrasSolo.length >= 3 && soloLetras.test(valor);
  })();

  const emailValido = emailRegex.test(emailInput.value.trim());
  const passwordValido = passwordInput.value.length >= 8;

  if (nombreValido && emailValido && passwordValido) {
    mensajeSubmit.textContent = "Formulario enviado correctamente";
    mensajeSubmit.style.color = "green";

    // Limpiar campos
    form.reset();
    nombreInput.style.borderColor = "";
    emailInput.style.borderColor = "";
    passwordInput.style.borderColor = "";
    mensajeNombre.textContent = "";
    mensajeEmail.textContent = "";
    mensajePassword.textContent = "";
  } else {
    mensajeSubmit.textContent = "Por favor, completá todos los campos correctamente";
    mensajeSubmit.style.color = "red";
  }
});
