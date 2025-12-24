document.addEventListener('DOMContentLoaded', () => {
    // --- DATABASE ATUALIZADA COM MEDIDAS PRECISAS ---
    const cocktails = [
        {
            name: "Boulevardier",
            subtitle: "A bold classic with a whiskey soul",
            ingredients: [
                "30 ml Powers Irish Whiskey",
                "30 ml Campari",
                "30 ml Martini Rosso",
                "Orange twist"
            ],
            history: "A cousin to the Negroni, the Boulevardier swaps gin for the warmth of whiskey. Legend has it this drink was created by Erskine Gwynne in the 1920s."
        },
        {
            name: "Espresso Martini",
            subtitle: "The modern coffee classic",
            ingredients: [
                "40 ml Vodka",
                "30 ml Coffee liqueur",
                "30 ml Fresh espresso",
                "Optional sugar syrup"
            ],
            history: "Created in the 1980s. A famous model allegedly asked for something that would 'wake me up and f**k me up'."
        },
        {
            name: "Aperol Spritz",
            subtitle: "Light, refreshing and social",
            ingredients: [
                "60 ml Aperol",
                "90 ml Prosecco Mionetto",
                "30 ml Sparkling water",
                "Orange slice"
            ],
            history: "Originating from Northern Italy, the Spritz became an icon of the 'Dolce Vita'."
        },
        {
            name: "Penicillin",
            subtitle: "A modern classic for cold nights",
            ingredients: [
                "50 ml Powers Irish Whiskey",
                "25 ml Fresh lemon juice",
                "20 ml Honey syrup",
                "Fresh ginger"
            ],
            history: "Created in 2005. A soothing blend of honey, lemon, and ginger fortified with whiskey. A true winter hug."
        },
        {
            name: "Basil Smash",
            subtitle: "Fresh, green and unexpected",
            ingredients: [
                "50 ml Beefeater London Dry Gin",
                "25 ml Fresh lemon juice",
                "15 ml Simple syrup",
                "Fresh basil leaves"
            ],
            history: "Created in 2008 by Jörg Meyer in Hamburg. Vibrant green color and herbal freshness."
        }
    ];

    // --- RENDER MENU ---
    const cocktailList = document.getElementById('cocktail-list');
    if (cocktailList) {
        cocktails.forEach(cocktail => {
            const li = document.createElement('li');
            li.className = 'cocktail-item';
            li.innerHTML = `
                <div class="item-info">
                    <h3>${cocktail.name}</h3>
                    <span class="item-subtitle">${cocktail.subtitle}</span>
                </div>
                <div class="item-arrow" style="font-size: 1.5rem; color: #c5a059">→</div>
            `;
            li.addEventListener('click', () => openModal(cocktail));
            cocktailList.appendChild(li);
        });
    }

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

    const closeBtn = document.querySelector('.close-btn');
    if (closeBtn) {
        closeBtn.onclick = () => modal.classList.remove('open');
    }

    window.onclick = (e) => {
        if (e.target === modal) modal.classList.remove('open');
    };

    // --- ANTIGRAVIT EFFECT (Canvas Particles + Snow) ---
    const canvas = document.getElementById('canvas-bg');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let mouse = { x: -1000, y: -1000 };

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
        window.addEventListener('touchstart', e => {
            mouse.x = e.touches[0].clientX;
            mouse.y = e.touches[0].clientY;
        });

        resize();

        class Particle {
            constructor() {
                this.init();
            }
            init() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 1;
                this.speedY = Math.random() * 0.8 + 0.3; // Efeito de neve caindo
                this.speedX = (Math.random() - 0.5) * 0.5;
                this.opacity = Math.random() * 0.5 + 0.2;
            }
            update() {
                this.y += this.speedY;
                this.x += this.speedX;

                // Atração suave pelo mouse (Antigravit Style)
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 180) {
                    this.x += dx * 0.03;
                    this.y += dy * 0.03;
                }

                // Resetar partícula ao sair da tela (loop infinito de neve)
                if (this.y > canvas.height) {
                    this.y = -10;
                    this.x = Math.random() * canvas.width;
                }
            }
            draw() {
                ctx.fillStyle = `rgba(197, 160, 89, ${this.opacity})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        for (let i = 0; i < 75; i++) {
            particles.push(new Particle());
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            requestAnimationFrame(animate);
        }
        animate();
    }
});