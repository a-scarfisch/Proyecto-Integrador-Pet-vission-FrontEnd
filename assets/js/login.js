// assets/js/login.js

const loginForm = document.getElementById('loginForm');

if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email    = document.getElementById('email');
    const password = document.getElementById('password');
    let valido     = true;

    // Limpiar errores previos
    limpiarError(email);
    limpiarError(password);

    // Validar correo
    if (!email.value.trim()) {
      mostrarError(email, 'El correo es obligatorio');
      valido = false;
    } else if (!esCorreoValido(email.value)) {
      mostrarError(email, 'Ingresa un correo válido — ejemplo: tu@email.com');
      valido = false;
    }

    // Validar contraseña
    if (!password.value.trim()) {
      mostrarError(password, 'La contraseña es obligatoria');
      valido = false;
    } else if (password.value.length < 8) {
      mostrarError(password, 'La contraseña debe tener mínimo 8 caracteres');
      valido = false;
    }

    if (valido) {
      redirigirPorRol(email.value);
    }
  });
}

// ============================================
// REDIRECCIÓN POR ROL — solo visual
// TODO Sprint 2: reemplazar por rol del JWT
// ============================================
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