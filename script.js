document.addEventListener('DOMContentLoaded', () => {
    // --- DATABASE ---
    const cocktails = [
        {
            name: "Boulevardier",
            subtitle: "A bold classic with a whiskey soul",
            ingredients: ["30 ml Powers Irish Whiskey", "30 ml Campari", "30 ml Martini Rosso", "Orange twist"],
            history: "A cousin to the Negroni, the Boulevardier swaps gin for the warmth of whiskey. Legend has it this drink was created by Erskine Gwynne in the 1920s."
        },
        {
            name: "Espresso Martini",
            subtitle: "The modern coffee classic",
            ingredients: ["40 ml Vodka", "30 ml Coffee liqueur", "30 ml Fresh espresso", "Optional sugar"],
            history: "Created in the 1980s. A famous model allegedly asked for something that would 'wake me up and f**k me up'."
        },
        {
            name: "Aperol Spritz",
            subtitle: "Light, refreshing and social",
            ingredients: ["60 ml Aperol", "90 ml Prosecco Mionetto", "Splash of sparkling water", "Orange slice"],
            history: "Originating from Northern Italy, the Spritz became an icon of the 'Dolce Vita'."
        },
        {
            name: "Penicillin",
            subtitle: "A modern classic for cold nights",
            ingredients: ["50 ml Powers Irish Whiskey", "25 ml Fresh lemon juice", "20 ml Honey syrup", "Fresh ginger"],
            history: "Created in 2005. A soothing blend of honey, lemon, and ginger fortified with whiskey."
        },
        {
            name: "Basil Smash",
            subtitle: "Fresh, green and unexpected",
            ingredients: ["50 ml Beefeater London Dry Gin", "25 ml Fresh lemon juice", "Fresh basil leaves", "Sugar syrup"],
            history: "Created in 2008 by Jörg Meyer. Vibrant green and herbal freshness."
        }
    ];

    // --- RENDER MENU ---
    const cocktailList = document.getElementById('cocktail-list');
    cocktails.forEach(cocktail => {
        const li = document.createElement('li');
        li.className = 'cocktail-item';
        li.innerHTML = `
            <div class="item-info">
                <h3>${cocktail.name}</h3>
                <span class="item-subtitle">${cocktail.subtitle}</span>
            </div>
            <div class="item-arrow">→</div>
        `;
        li.addEventListener('click', () => openModal(cocktail));
        cocktailList.appendChild(li);
    });

    // --- MODAL LOGIC ---
    const modal = document.getElementById('modal-container');
    const openModal = (c) => {
        document.getElementById('detail-name').textContent = c.name;
        document.getElementById('detail-subtitle').textContent = c.subtitle;
        document.getElementById('detail-history').textContent = c.history;
        const ingList = document.getElementById('detail-ingredients');
        ingList.innerHTML = c.ingredients.map(i => `<li>${i}</li>`).join('');
        modal.classList.add('open');
    };

    document.querySelector('.close-btn').onclick = () => modal.classList.remove('open');
    window.onclick = (e) => e.target === modal && modal.classList.remove('open');

    // --- ANTIGRAVIT EFFECT (Canvas Particles) ---
    const canvas = document.getElementById('canvas-bg');
    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouse = { x: -100, y: -100 };

    const resize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
    window.addEventListener('touchstart', e => { mouse.x = e.touches[0].clientX; mouse.y = e.touches[0].clientY; });

    resize();

    class Particle {
        constructor() {
            this.init();
        }
        init() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedY = Math.random() * 0.5 + 0.2; // Neve caindo
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random() * 0.5 + 0.1;
        }
        update() {
            this.y += this.speedY;
            this.x += this.speedX;

            // Atração pelo mouse (efeito interativo)
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const distance = Math.sqrt(dx*dx + dy*dy);
            if (distance < 150) {
                this.x += dx * 0.02;
                this.y += dy * 0.02;
            }

            if (this.y > canvas.height) this.init();
        }
        draw() {
            ctx.fillStyle = `rgba(197, 160, 89, ${this.opacity})`; // Cor Gold
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    for (let i = 0; i < 80; i++) particles.push(new Particle());

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    }
    animate();
});