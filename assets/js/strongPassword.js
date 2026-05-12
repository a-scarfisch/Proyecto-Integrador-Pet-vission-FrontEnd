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

    function checkStrength(val) {
      const bar = document.getElementById('strengthBar');
      const text = document.getElementById('strengthText');
      if (!val) { bar.style.width = '0%'; text.textContent = ''; return; }
      let strength = 0;
      if (val.length >= 8) strength++;
      if (/[A-Z]/.test(val)) strength++;
      if (/[0-9]/.test(val)) strength++;
      if (/[^A-Za-z0-9]/.test(val)) strength++;
      const levels = [
        { w: '25%', color: '#e63946', label: 'Muy débil' },
        { w: '50%', color: '#f4a261', label: 'Débil' },
        { w: '75%', color: '#2a9d8f', label: 'Buena' },
        { w: '100%', color: '#198754', label: 'Excelente' },
      ];
      const level = levels[strength - 1] || levels[0];
      bar.style.width = level.w;
      bar.style.backgroundColor = level.color;
      text.textContent = level.label;
      text.style.color = level.color;
    }