// assets/js/login.js

const loginForm = document.getElementById('loginForm');

if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email    = document.getElementById('email');
    const password = document.getElementById('password');
    let valido     = true;

    limpiarError(email);
    limpiarError(password);

    if (!email.value.trim()) {
      mostrarError(email, 'El correo es obligatorio');
      valido = false;
    } else if (!esCorreoValido(email.value)) {
      mostrarError(email, 'Ingresa un correo válido — ejemplo: tu@email.com');
      valido = false;
    }

    if (!password.value.trim()) {
      mostrarError(password, 'La contraseña es obligatoria');
      valido = false;
    } else if (password.value.length < 8) {
      mostrarError(password, 'La contraseña debe tener mínimo 8 caracteres');
      valido = false;
    }

    if (!valido) return;

    const btn = loginForm.querySelector('button[type=submit]');
    btn.disabled = true;
    btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Ingresando...';

    try {
      const res = await fetch(`${API.BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          correo:   email.value,
          password: password.value
        })
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem('vv_token', data.data.token);
        localStorage.setItem('vv_user',  JSON.stringify(data.data));

        const rutas = {
          VETERINARIO:   '../vet/dashboard.html',
          ADMINISTRADOR: '../admin/dashboard.html',
          CLIENTE:       '../client/dashboard.html'
        };

        window.location.href = rutas[data.data.rol] || '../client/dashboard.html';

      } else {
        mostrarError(email, data.message || 'Correo o contraseña incorrectos');
        btn.disabled = false;
        btn.innerHTML = 'Iniciar sesión <i class="bi bi-arrow-right ms-2"></i>';
      }

    } catch (err) {
      mostrarError(email, 'No se pudo conectar con el servidor');
      btn.disabled = false;
      btn.innerHTML = 'Iniciar sesión <i class="bi bi-arrow-right ms-2"></i>';
    }
  });
}

// ============================================
// REDIRECCIÓN POR ROL — solo visual
// TODO Sprint 2: reemplazar por rol del JWT
// ============================================
// SE QUITA POR VALIDACIONES, EN DESARROLLO LOCAL DESCOMENTAR ESTO
/*
function redirigirPorRol(correo) {
  const c = correo.toLowerCase();

  if (c.includes('vet') || c.includes('doctor') || c.includes('dr')) {
    window.location.href = '../vet/dashboard.html';
    return;
  }

  if (c.includes('admin')) {
    window.location.href = '../admin/dashboard.html';
    return;
  }

  window.location.href = '../client/dashboard.html';
}
*/

// ============================================
// VALIDACIÓN EN TIEMPO REAL
// ============================================
document.getElementById('email')
  ?.addEventListener('blur', function () {
    limpiarError(this);
    if (!this.value.trim()) return;
    if (!esCorreoValido(this.value)) {
      mostrarError(this, 'Ingresa un correo válido — ejemplo: tu@email.com');
    } else {
      marcarValido(this);
    }
  });

document.getElementById('password')
  ?.addEventListener('blur', function () {
    limpiarError(this);
    if (!this.value.trim()) return;
    if (this.value.length < 8) {
      mostrarError(this, 'La contraseña debe tener mínimo 8 caracteres');
    } else {
      marcarValido(this);
    }
  });

// Limpia el error mientras el usuario corrige
['email', 'password'].forEach(id => {
  document.getElementById(id)
    ?.addEventListener('input', function () {
      if (this.classList.contains('is-invalid')) {
        limpiarError(this);
      }
    });
});

// ============================================
// UTILIDADES
// ============================================
function mostrarError(input, mensaje) {
  input.classList.add('is-invalid');
  input.classList.remove('is-valid');

  let feedback = input.closest('.input-group')
                      ?.parentElement
                      .querySelector('.invalid-feedback');

  if (!feedback) {
    feedback = document.createElement('div');
    feedback.classList.add('invalid-feedback');
    input.closest('.input-group')
         ?.parentElement
         .appendChild(feedback);
  }

  feedback.textContent = mensaje;
}

function limpiarError(input) {
  input.classList.remove('is-invalid', 'is-valid');
  const feedback = input.closest('.input-group')
                        ?.parentElement
                        .querySelector('.invalid-feedback');
  if (feedback) feedback.textContent = '';
}

function marcarValido(input) {
  input.classList.remove('is-invalid');
  input.classList.add('is-valid');
}

function esCorreoValido(correo) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
}