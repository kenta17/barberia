/* ============================================
   STYLOS BARBER'S CLUB - Sistema de Reservas
   ============================================ */

const WHATSAPP_BOOKING = "59168307053";

/* ---- FECHA MÍNIMA (HOY) ---- */
function setMinDate() {
    const dateInput = document.getElementById('fecha');
    if (!dateInput) return;

    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
}

/* ---- ENVIAR RESERVA POR WHATSAPP ---- */
function submitBooking(e) {
    e.preventDefault();

    const nombre   = document.getElementById('nombre').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const servicio = document.getElementById('servicioElegido');
    const fecha    = document.getElementById('fecha').value;
    const hora     = document.getElementById('hora').value;
    const notas    = document.getElementById('notas')?.value.trim() || '';

    if (!nombre || !telefono || !servicio.value || !fecha || !hora) {
        showBookingError('Por favor completa todos los campos requeridos.');
        return;
    }

    /* Nombre del servicio seleccionado */
    const servicioNombre = servicio.options[servicio.selectedIndex].text;

    /* Formatear fecha */
    const [year, month, day] = fecha.split('-');
    const fechaFormatted = `${day}/${month}/${year}`;

    /* Formatear hora */
    const [hh, mm] = hora.split(':');
    const h = parseInt(hh);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 || 12;
    const horaFormatted = `${h12}:${mm} ${ampm}`;

    /* Construir mensaje */
    let msg = "📅 *SOLICITUD DE RESERVA — STYLOS BARBER'S CLUB*\n\n";
    msg += "━━━━━━━━━━━━━━━━━━━━\n";
    msg += `👤 *Cliente:* ${nombre}\n`;
    msg += `📱 *Celular:* ${telefono}\n`;
    msg += "━━━━━━━━━━━━━━━━━━━━\n";
    msg += `✂️ *Servicio:* ${servicioNombre}\n`;
    msg += `📆 *Fecha:* ${fechaFormatted}\n`;
    msg += `⏰ *Hora:* ${horaFormatted}\n`;

    if (notas) {
        msg += "━━━━━━━━━━━━━━━━━━━━\n";
        msg += `📝 *Notas:* ${notas}\n`;
    }

    msg += "━━━━━━━━━━━━━━━━━━━━\n";
    msg += "¡Hola! Me gustaría reservar una cita con los datos indicados. ¡Gracias! 😊";

    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/${WHATSAPP_BOOKING}?text=${encoded}`, '_blank');

    /* Limpiar formulario */
    document.getElementById('booking-form').reset();
    setMinDate();
    showBookingSuccess();
}

/* ---- MENSAJES DE ESTADO ---- */
function showBookingSuccess() {
    let msg = document.getElementById('booking-msg');
    if (!msg) {
        msg = document.createElement('div');
        msg.id = 'booking-msg';
        msg.style.cssText = `
            background: #d4edda;
            color: #155724;
            padding: 14px 20px;
            border-radius: 6px;
            font-weight: 700;
            font-size: 14px;
            text-align: center;
            margin-top: 10px;
            border: 1px solid #c3e6cb;
        `;
        document.getElementById('booking-form').appendChild(msg);
    }

    msg.textContent = '✅ ¡Reserva enviada! Te redirigimos a WhatsApp para confirmar.';
    msg.style.display = 'block';

    setTimeout(() => { msg.style.display = 'none'; }, 5000);
}

function showBookingError(text) {
    let msg = document.getElementById('booking-msg');
    if (!msg) {
        msg = document.createElement('div');
        msg.id = 'booking-msg';
        msg.style.cssText = `
            padding: 14px 20px;
            border-radius: 6px;
            font-weight: 700;
            font-size: 14px;
            text-align: center;
            margin-top: 10px;
        `;
        document.getElementById('booking-form').appendChild(msg);
    }

    msg.style.background = '#f8d7da';
    msg.style.color = '#721c24';
    msg.style.border = '1px solid #f5c6cb';
    msg.style.display = 'block';
    msg.textContent = `⚠️ ${text}`;

    setTimeout(() => { msg.style.display = 'none'; }, 4000);
}

/* ---- INICIALIZAR ---- */
document.addEventListener('DOMContentLoaded', () => {
    setMinDate();

    const form = document.getElementById('booking-form');
    if (form) form.addEventListener('submit', submitBooking);
});
