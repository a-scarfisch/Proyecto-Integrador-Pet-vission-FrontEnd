// assets/js/register.js

// ============================================
// UTILIDADES
// ============================================

// Muestra el mensaje de error bajo el input
function mostrarError(inputId, mensaje) {
  const input = document.getElementById(inputId);
  const error = document.getElementById('error-' + inputId);

  if (input) input.classList.add('is-invalid');
  if (input) input.classList.remove('is-valid');
  if (error) error.textContent = mensaje;
}

// Limpia el error y marca como válido
function marcarValido(inputId) {
  const input = document.getElementById(inputId);
  const error = document.getElementById('error-' + inputId);

  if (input) input.classList.remove('is-invalid');
  if (input) input.classList.add('is-valid');
  if (error) error.textContent = '';
}

// Limpia el estado del campo sin marcarlo válido ni inválido
function limpiarCampo(inputId) {
  const input = document.getElementById(inputId);
  const error = document.getElementById('error-' + inputId);

  if (input) input.classList.remove('is-invalid', 'is-valid');
  if (error) error.textContent = '';
}

// Verifica formato de correo con arroba y dominio
function esCorreoValido(correo) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
}

// Verifica que la contraseña tenga mayúscula y número
function esPasswordSegura(password) {
  return /[A-Z]/.test(password) && /[0-9]/.test(password);
}

// Toggle para mostrar u ocultar contraseña
function togglePassword(id, el) {
  const input = document.getElementById(id);
  const icon = el.querySelector('i');
  if (input.type === 'password') {
    input.type = 'text';
    icon.className = 'bi bi-eye-slash text-muted';
  } else {
    input.type = 'password';
    icon.className = 'bi bi-eye text-muted';
  }
}

// Barra de fortaleza de contraseña
function checkStrength(valor) {
  const bar = document.getElementById('strengthBar');
  const text = document.getElementById('strengthText');
  if (!bar) return;

  if (!valor) {
    bar.style.width = '0%';
    text.textContent = '';
    return;
  }

  let nivel = 0;
  if (valor.length >= 8) nivel++;
  if (/[A-Z]/.test(valor)) nivel++;
  if (/[0-9]/.test(valor)) nivel++;
  if (/[^A-Za-z0-9]/.test(valor)) nivel++;

  const niveles = [
    { ancho: '25%', color: '#e63946', texto: 'Muy débil' },
    { ancho: '50%', color: '#f4a261', texto: 'Débil' },
    { ancho: '75%', color: '#2a9d8f', texto: 'Buena' },
    { ancho: '100%', color: '#198754', texto: 'Excelente' },
  ];

  const actual = niveles[nivel - 1] || niveles[0];
  bar.style.width = actual.ancho;
  bar.style.backgroundColor = actual.color;
  text.textContent = actual.texto;
  text.style.color = actual.color;
}

// ============================================
// VALIDACIONES INDIVIDUALES
// Se llaman al hacer blur en cada campo
// ============================================

function validarTelefono() {
  const valor = document.getElementById('telefono').value.trim();
  if (!valor) {
    mostrarError('telefono', 'El teléfono es obligatorio');
    return false;
  }
  if (valor.length < 8) {
    mostrarError('telefono', 'Ingresa un teléfono válido');
    return false;
  }
  marcarValido('telefono');
  return true;
}

function validarNombre() {
  const valor = document.getElementById('nombre').value.trim();
  if (!valor) {
    mostrarError('nombre', 'El nombre es obligatorio');
    return false;
  }
  if (valor.length < 2) {
    mostrarError('nombre', 'El nombre debe tener mínimo 2 caracteres');
    return false;
  }
  marcarValido('nombre');
  return true;
}

function validarApellidos() {
  const valor = document.getElementById('apellidos').value.trim();
  if (!valor) {
    mostrarError('apellidos', 'El apellido es obligatorio');
    return false;
  }
  if (valor.length < 2) {
    mostrarError('apellidos', 'El apellido debe tener mínimo 2 caracteres');
    return false;
  }
  marcarValido('apellidos');
  return true;
}

function validarEmail() {
  const valor = document.getElementById('email').value.trim();
  if (!valor) {
    mostrarError('email', 'El correo es obligatorio');
    return false;
  }
  if (!esCorreoValido(valor)) {
    mostrarError('email', 'Ingresa un correo válido — ejemplo: tu@email.com');
    return false;
  }
  marcarValido('email');
  return true;
}

function validarPassword() {
  const valor = document.getElementById('password').value;
  if (!valor) {
    mostrarError('password', 'La contraseña es obligatoria');
    return false;
  }
  if (valor.length < 8) {
    mostrarError('password', 'La contraseña debe tener mínimo 8 caracteres');
    return false;
  }
  if (!esPasswordSegura(valor)) {
    mostrarError('password', 'Debe contener al menos una mayúscula y un número');
    return false;
  }
  marcarValido('password');
  return true;
}

function validarConfirm() {
  const password = document.getElementById('password').value;
  const confirm = document.getElementById('confirm').value;
  if (!confirm) {
    mostrarError('confirm', 'Confirma tu contraseña');
    return false;
  }
  if (confirm !== password) {
    mostrarError('confirm', 'Las contraseñas no coinciden');
    return false;
  }
  marcarValido('confirm');
  return true;
}

function validarTerms() {
  const terms = document.getElementById('terms');
  const error = document.getElementById('error-terms');
  if (!terms.checked) {
    error.textContent = 'Debes aceptar los términos para continuar';
    return false;
  }
  error.textContent = '';
  return true;
}

// ============================================
// EVENTOS EN TIEMPO REAL — blur por campo
// ============================================

document.getElementById('nombre')
  ?.addEventListener('blur', validarNombre);

document.getElementById('apellidos')
  ?.addEventListener('blur', validarApellidos);

document.getElementById('email')
  ?.addEventListener('blur', validarEmail);

document.getElementById('telefono')
  ?.addEventListener('blur', validarTelefono);

document.getElementById('password')
  ?.addEventListener('blur', validarPassword);

document.getElementById('password')
  ?.addEventListener('input', function () {
    checkStrength(this.value);
    // Si ya estaba marcado inválido, revalida mientras escribe
    if (this.classList.contains('is-invalid')) validarPassword();
  });

document.getElementById('confirm')
  ?.addEventListener('blur', validarConfirm);

// Limpia el error del campo cuando el usuario empieza a escribir
['nombre', 'apellidos', 'email', 'password', 'confirm'].forEach(id => {
  document.getElementById(id)
    ?.addEventListener('input', function () {
      if (this.classList.contains('is-invalid')) {
        limpiarCampo(id);
      }
    });
});

// ============================================
// SUBMIT — valida todo antes de enviar
// ===========================================

// ============================================
// SUBMIT — conectado al backend
// ============================================

const registerForm = document.getElementById('registerForm');

if (registerForm) {
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nombreOk = validarNombre();
    const apellidosOk = validarApellidos();
    const emailOk = validarEmail();
    const passwordOk = validarPassword();
    const confirmOk = validarConfirm();
    const termsOk = validarTerms();
    const telefonoOk = validarTelefono();

    if (!nombreOk || !apellidosOk || !emailOk || !telefonoOk ||
      !passwordOk || !confirmOk || !termsOk) return;

    const btn = registerForm.querySelector('button[type=submit]');
    btn.disabled = true;
    btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Creando cuenta...';

    try {
      const res = await fetch(`${API.BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombres: document.getElementById('nombre').value.trim(),
          apellidos: document.getElementById('apellidos').value.trim(),
          correo: document.getElementById('email').value.trim(),
          password: document.getElementById('password').value,
          telefono: document.getElementById('telefono')?.value.trim() || '',
          rol: 'CLIENTE'
        })
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem('vv_token', data.data.token);
        localStorage.setItem('vv_user', JSON.stringify(data.data));
        window.location.href = '../client/dashboard.html';

      } else {
        mostrarError('email', data.message || 'Error al crear la cuenta');
        btn.disabled = false;
        btn.innerHTML = 'Crear cuenta <i class="bi bi-arrow-right ms-2"></i>';
      }

    } catch (err) {
      mostrarError('email', 'No se pudo conectar con el servidor');
      btn.disabled = false;
      btn.innerHTML = 'Crear cuenta <i class="bi bi-arrow-right ms-2"></i>';
    }
  });
}