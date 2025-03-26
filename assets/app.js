document.addEventListener("DOMContentLoaded", function () {

    const buttons = document.querySelectorAll(
        "#shopify-section-template--16358403276890__image_with_text_nFTifR .push-btn, " +
        "#shopify-section-template--16358403276890__rich_text_VFiiaa .push-btn, " +
        "#shopify-section-template--16358403276890__rich_text_hikhyV .push-btn"
    );

    // Sección de destino
    const targetSection = document.getElementById("shopify-section-template--16358403276890__rich_text_QF7WNj");
    
    if (!targetSection) {
        console.error("Section doesn't exist");
        return;
    }
    
  
    buttons.forEach(button => {
        button.addEventListener("click", function (event) {
            event.preventDefault();
            targetSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });
    });
});



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






