const stockProductos = [
    {
      id: 1,
      nombre: "Ryzen 7",
      cantidad: 3,
      desc: "Ryzen 7 37000x 8 cores 3.6Ghz Socket AM4",
      precio: 7589,
      img: "img/Ryzen 7.jpg",
    },
    {
      id: 2,
      nombre: "mouse g203 logitech",
      cantidad: 10,
      desc: "Logitech g203 lightsync un mouse para juegos disponible en una variedad de vibrantes colores. Con la tecnología LIGHTSYNC, un sensor para juegos y un diseño clásico de 6 botones, animarás tu acción y tu espacio. ",
      precio: 603,
      img: "img/g203.jpg",
    },
    {
      id: 3,
      nombre: "Adaptador JP g2 USB-C",
      cantidad: 20,
      desc: "Adaptador de red color negro",
      precio: 315,
      img: "img/USB-C.jpg",
    },
    {
      id: 4,
      nombre: "Teclado mecanico Logitech G413",
      cantidad: 1,
      desc: "Teclado mécanico artca logitech negro con rojo ",
      precio: 1536,
      img: "img/g413.jpg",
    },
    {
      id: 5,
      nombre: "Audifonos juego Turtle Beach Recon 70",
      cantidad: 5,
      desc: "Headsert para gaming Turtle Beach Recon 70  Camo Azul",
      precio: 1200,
      img: "img/Recon70.jpg",
    },
    {
      id: 6,
      nombre: "Consola XBOX series X 1TB",
      cantidad: 1,
      desc: "Consola XBOX ONE series X 1TB almacenamiento, incluye 1 mes game pass",
      precio: 1200,
      img: "img/xboxx.jpg",
    },
    {
      id: 7,
      nombre: "Monitor gamer AOC 27g2",
      cantidad: 3,
      desc: "Monitor gamer AOC 27G2 Full HD 144Hz HDMI",
      precio: 5969,
      img: "img/27g2.jpg",
    },
    {
      id: 8,
      nombre: "SSD 1TB Acer",
      cantidad: 20,
      desc: "Disco de estado solido de 1TB marca Acer PCI-e 3.0 M.2",
      precio: 2000,
      img: "img/SSD.jpg",
    },
    {
      id: 9,
      nombre: "Fifa 2023",
      cantidad: 5,
      desc: "Juego de futbol",
      precio: 14,
      img: "img/FIFA-23.jpg",
    },
    {
      id: 10,
      nombre: "Silla Gamer ANTICA",
      cantidad: 7,
      desc: "Silla gamer ergonomica reclinable",
      precio: 49000,
      img: "img/SillaGamer.jpg",
    },
  ];
  
  let carrito = [];
  
  const contenedor = document.querySelector("#contenedor");
  const carritoContenedor = document.querySelector("#carritoContenedor");
  const vaciarCarrito = document.querySelector("#vaciarCarrito");
  const precioTotal = document.querySelector("#precioTotal");
  const activarFuncion = document.querySelector("#activarFuncion");
  const procesarCompra = document.querySelector("#procesarCompra");
  const totalProceso = document.querySelector("#totalProceso");
  const formulario = document.querySelector('#procesar-pago')
  
  if (activarFuncion) {
    activarFuncion.addEventListener("click", procesarPedido);
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  
    mostrarCarrito();
    document.querySelector("#activarFuncion").click(procesarPedido);
  });

  if(formulario){
    formulario.addEventListener('submit', enviarCompra)
  }
  
  
  if (vaciarCarrito) {
    vaciarCarrito.addEventListener("click", () => {
      carrito.length = [];
      mostrarCarrito();
    });
  }
  
  if (procesarCompra) {
    procesarCompra.addEventListener("click", () => {
      if (carrito.length === 0) {
        Swal.fire({
          title: "¡Tu carrito está vacio!",
          text: "Compra algo para continuar con la compra",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      } else {
        const newLocal = location.href = "compra.html";
      }
    });
  }
  
  stockProductos.forEach((prod) => {
    const { id, nombre, precio, desc, img, cantidad } = prod;
    if (contenedor) {
      contenedor.innerHTML += `
      <div class="card mt-3" style="width: 18rem;">
      <img class="card-img-top mt-2" src="${img}" alt="Card image cap">
      <div class="card-body">
        <h5 class="card-title">${nombre}</h5>
        <p class="card-text">Precio: ${precio}</p>
        <p class="card-text">Descripcion: ${desc}</p>
        <p class="card-text">Cantidad: ${cantidad}</p>
        <button class="btn btn-primary" onclick="agregarProducto(${id})">Comprar Producto</button>
      </div>
    </div>
      `;
    }
  });
  
  function agregarProducto(id) {
  const existe = carrito.some(prod => prod.id === id);

  if (existe) {
    const prod = carrito.map(prod => {
      if (prod.id === id) {
        prod.cantidad++;
      }
    });
  } else {
    const item = stockProductos.find((prod) => prod.id === id);
    carrito.push(item);
  }
  mostrarCarrito();
}
  
  const mostrarCarrito = () => {
    const modalBody = document.querySelector(".modal .modal-body");
    if (modalBody) {
      modalBody.innerHTML = "";
      carrito.forEach((prod) => {
        const { id, nombre, precio, desc, img, cantidad } = prod;
        console.log(modalBody);
        modalBody.innerHTML += `
        <div class="modal-contenedor">
          <div>
          <img class="img-fluid img-carrito" src="${img}"/>
          </div>
          <div>
          <p>Producto: ${nombre}</p>
        <p>Precio: ${precio}</p>
        <p>Cantidad :${cantidad}</p>
        <button class="btn btn-danger"  onclick="eliminarProducto(${id})">Eliminar producto</button>
          </div>
        </div>
        
    
        `;
      });
    }
  
    if (carrito.length === 0) {
      console.log("Nada");
      modalBody.innerHTML = `
      <p class="text-center text-primary parrafo">¡Aun no agregaste nada!</p>
      `;
    } else {
      console.log("Algo");
    }
    carritoContenedor.textContent = carrito.length;
  
    if (precioTotal) {
      precioTotal.innerText = carrito.reduce(
        (acc, prod) => acc + prod.cantidad * prod.precio,
        0
      );
    }
  
    guardarStorage();
  };
  
  function guardarStorage() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }
  
  function eliminarProducto(id) {
    const juegoId = id;
    carrito = carrito.filter((juego) => juego.id !== juegoId);
    mostrarCarrito();
  }


  function procesarPedido() {
    carrito.forEach((prod) => {
      const listaCompra = document.querySelector("#lista-compra tbody");
      const { id, nombre, precio, img, cantidad } = prod;
      if (listaCompra) {
        const row = document.createElement("tr");
        row.innerHTML += `
                <td>
                <img class="img-fluid img-carrito" src="${img}"/>
                </td>
                <td>${nombre}</td>
              <td>${precio}</td>
              <td>${cantidad}</td>
              <td>${precio * cantidad}</td>
              `;
        listaCompra.appendChild(row);
      }
    });
    totalProceso.innerText = carrito.reduce(
      (acc, prod) => acc + prod.cantidad * prod.precio,
      0
    );
  }
  
   function enviarCompra(e){
     e.preventDefault()
     const cliente = document.querySelector('#cliente').value
     const email = document.querySelector('#correo').value
  
     if(email === '' || cliente == ''){
       Swal.fire({
         title: "¡Debes completar tu email y nombre!",
         text: "Rellena el formulario",
         icon: "error",
         confirmButtonText: "Aceptar",
     })
   } else {
  
    const btn = document.getElementById('button');
  
  // document.getElementById('procesar-pago')
  //  .addEventListener('submit', function(event) {
  //    event.preventDefault();
  
     btn.value = 'Enviando...';
  
     const serviceID = 'default_service';
     const templateID = 'template_qxwi0jn';
  
     emailjs.sendForm(serviceID, templateID, this)
      .then(() => {
        btn.value = 'Finalizar compra';
        alert('Correo enviado!');
      }, (err) => {
        btn.value = 'Finalizar compra';
        alert(JSON.stringify(err));
      });
      
     const spinner = document.querySelector('#spinner')
     spinner.classList.add('d-flex')
     spinner.classList.remove('d-none')
  
     setTimeout(() => {
       spinner.classList.remove('d-flex')
       spinner.classList.add('d-none')
       formulario.reset()
  
       const alertExito = document.createElement('p')
       alertExito.classList.add('alert', 'alerta', 'd-block', 'text-center', 'col-12', 'mt-2', 'alert-success')
       alertExito.textContent = 'Compra realizada correctamente'
       formulario.appendChild(alertExito)
  
       setTimeout(() => {
         alertExito.remove()
       }, 3000)
  
  
     }, 3000)
   }
   localStorage.clear()
  
   }