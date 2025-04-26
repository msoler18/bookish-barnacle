document.addEventListener("DOMContentLoaded", function () {
    
    const productVariants = {
        "one-package": "41680956719194",
        "three-packages": "41680956751962",
        "six-packages": "41680956784730"
    };

    
    function openCartDrawer() {
        setTimeout(() => {
            const cartButton = document.getElementById("CartButton");
            if (cartButton) {
                cartButton.click();
                console.log("Simulando clic en el botón del carrito");
            } else {
                console.error("No se pudo encontrar el botón del carrito");
            }
        }, 1500); 
    }


    function addToCart(variantId) {
        fetch("/cart/add.js", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: variantId,
                quantity: 1
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log("Producto agregado al carrito", data);
            sessionStorage.setItem("cart_updated", "true");
            window.location.href = window.location.pathname + "?cart_updated=true";
        })
        .catch(error => console.error("Error al agregar al carrito:", error));
    }

    
    if (new URLSearchParams(window.location.search).get("cart_updated") === "true") {
        openCartDrawer();
        
        window.history.replaceState({}, document.title, window.location.pathname);
    }

    
    Object.keys(productVariants).forEach(id => {
        const button = document.getElementById(id);
        if (button) {
            button.addEventListener("click", function (event) {
                event.preventDefault();
                addToCart(productVariants[id]);
            });
        }
    });
});






