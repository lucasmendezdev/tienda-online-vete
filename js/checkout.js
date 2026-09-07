const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const resumen = document.getElementById("resumenPedido");
const totalSpan = document.getElementById("totalCompra");
const form = document.getElementById("checkoutForm");

const btnEnvio = document.getElementById("btnEnvio");
const envioBox = document.getElementById("envioBox");

let total = 0;



// ===============================
// Toggle envio
// ===============================

btnEnvio.addEventListener("click", () => {
  envioBox.classList.toggle("show");

  if (envioBox.classList.contains("show")) {
    btnEnvio.textContent = "❌ Quitar datos de envío";
  } else {
    btnEnvio.textContent = "📦 ¿Necesitás envío?";
  }
});

function formatearPrecio(valor) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0
  }).format(valor);
}

// ===============================
// Texto pedido
// ===============================

function generarTextoPedido() {

  let texto = "";

  carrito.forEach(item => {

    texto += `
${item.nombre} (${item.talle}) x${item.cantidad}
${formatearPrecio(item.precio * item.cantidad)}

`;
  });

  return texto;
}



// ===============================
// Resumen
// ===============================

function mostrarResumen() {

  resumen.innerHTML = "";
  total = 0;

  carrito.forEach(item => {

    const div = document.createElement("div");

    div.classList.add("resumen-item");

    div.innerHTML = `
      <span>${item.nombre} (${item.talle}) x${item.cantidad}</span>
      <span>${formatearPrecio(item.precio * item.cantidad)}</span>
    `;

    resumen.appendChild(div);

    total += item.precio * item.cantidad;
  });

  totalSpan.textContent = formatearPrecio(total);
}

mostrarResumen();



// ===============================
// Enviar
// ===============================

form.addEventListener("submit", e => {

  e.preventDefault();

  if (carrito.length === 0) {
    alert("El carrito está vacío");
    return;
  }


  const data = {
    nombre: form.nombre.value,
    email: form.email.value,
    telefono: form.telefono.value,
    direccion: form.direccion?.value || "Retiro en local",
    ciudad: form.ciudad?.value || "",
    pedido: generarTextoPedido(),
    total: formatearPrecio(total)
  };



  emailjs.send(
    "service_z7dok6h",
    "template_n8lcjjg",
    data
  )
  .then(() => {


    // Toast
    const toast = document.getElementById("toastSuccess");

    toast.classList.add("show");


    // WhatsApp
    const mensaje = `
Hola! Hice un pedido:

Nombre: ${data.nombre}
Tel: ${data.telefono}

Dirección: ${data.direccion}

Pedido:
${data.pedido}

Total: ${formatearPrecio(data.total)}
`;


    const telefonoTienda = "5492625527155";

    const url = `https://wa.me/${telefonoTienda}?text=${encodeURIComponent(mensaje)}`;



    // Limpiar carrito
    localStorage.removeItem("carrito");



    // Redirigir
    setTimeout(() => {
      window.open(url, "_blank");
      window.location.href = "index.html";
    }, 3000);



  })
  .catch(err => {

    console.error(err);

    alert("Error al enviar pedido. Intentá nuevamente.");

  });

});
