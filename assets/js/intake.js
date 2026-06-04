// Intake Form Logic
class FunzioneIntake {
    constructor() {
        this.currentStep = 0;
        this.selectedPackage = '';
        this.isEnglish = document.documentElement.lang === 'en';
        
        this.formData = {
            nombre: '',
            email: '',
            telefono: '',
            ciudad: '',
            tipoPropiedad: '',
            tipoUbicacion: '',
            tipoEspacio: '',
            esRemodelacion: '',
            estilos: [],
            objetivo: '',
            presupuesto: '',
            tieneContratista: ''
        };

        this.stepsConfig = this.isEnglish ? [
            { id: 'intro', title: 'Hi, I am Agueda.<br>Let\'s talk about your space.' },
            { id: 'general', title: 'To begin, what is your name?' },
            { id: 'contacto', title: 'Where can we contact you, [nombre]?' },
            { id: 'propiedad', title: 'What type of property are we working on?' },
            { id: 'ubicacion', title: 'Where is it located?' },
            { id: 'estilo', title: 'Select the vibes that connect with you the most.' },
            { id: 'presupuesto', title: 'What is your estimated investment for furniture and decor?' },
            { id: 'final', title: 'We are ready. Shall we send your request?' }
        ] : [
            { id: 'intro', title: 'Hola, soy Agueda.<br>Hablemos de tu espacio.' },
            { id: 'general', title: 'Para comenzar, ¿cómo te llamas?' },
            { id: 'contacto', title: '¿Dónde te contactamos, [nombre]?' },
            { id: 'propiedad', title: '¿Qué tipo de propiedad vamos a trabajar?' },
            { id: 'ubicacion', title: '¿Dónde está ubicada?' },
            { id: 'estilo', title: 'Selecciona las vibras que más conectan contigo.' },
            { id: 'presupuesto', title: '¿Cuál es la inversión estimada para mobiliario y decoración?' },
            { id: 'final', title: 'Estamos listos. ¿Enviamos tu solicitud?' }
        ];

        this.init();
    }

    init() {
        this.injectHTML();
        this.cacheDOM();
        this.bindEvents();
    }

    injectHTML() {
        const t = (es, en) => this.isEnglish ? en : es;
        
        const html = `
            <div id="intake-modal">
                <div class="intake-header">
                    <button class="intake-close" aria-label="${t('Cerrar', 'Close')}">
                        <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                    <div class="intake-progress">
                        <span id="intake-progress-text">01 / ${this.stepsConfig.length}</span>
                        <div class="intake-progress-bar-bg">
                            <div class="intake-progress-bar-fill" id="intake-progress-fill"></div>
                        </div>
                    </div>
                </div>

                <div class="intake-body" id="intake-steps-container">
                    
                    <!-- Step 0: Intro -->
                    <div class="intake-step active" data-step="0">
                        <h2 class="intake-step-title">${this.stepsConfig[0].title}</h2>
                        <p class="mb-8 max-w-lg text-lg opacity-70">${t('He preparado unas breves preguntas para entender mejor tu visión, estilo de vida y lo que necesitas. Toma un par de minutos, pero hace toda la diferencia.', 'I have prepared a few brief questions to better understand your vision, lifestyle, and needs. It takes a couple of minutes, but it makes all the difference.')}</p>
                        <button class="intake-btn-next">${t('Comenzar Formulario', 'Start Form')} <svg width="16" height="16" fill="none" class="ml-2" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg></button>
                    </div>

                    <!-- Step 1: Nombre -->
                    <div class="intake-step" data-step="1">
                        <h2 class="intake-step-title">${this.stepsConfig[1].title}</h2>
                        <input type="text" class="intake-input" id="intake-nombre" placeholder="${t('Tu nombre completo', 'Your full name')}">
                    </div>

                    <!-- Step 2: Contacto -->
                    <div class="intake-step" data-step="2">
                        <h2 class="intake-step-title" id="title-contacto">${this.stepsConfig[2].title}</h2>
                        <div class="space-y-6">
                            <input type="email" class="intake-input" id="intake-email" placeholder="${t('Correo electrónico', 'Email address')}">
                            <input type="tel" class="intake-input" id="intake-telefono" placeholder="${t('Teléfono / WhatsApp', 'Phone / WhatsApp')}">
                            <input type="text" class="intake-input" id="intake-ciudad" placeholder="${t('Ciudad de residencia', 'City of residence')}">
                        </div>
                    </div>

                    <!-- Step 3: Tipo de Propiedad -->
                    <div class="intake-step" data-step="3">
                        <h2 class="intake-step-title">${this.stepsConfig[3].title}</h2>
                        <div class="intake-cards-grid">
                            <div class="intake-card" data-field="tipoPropiedad" data-value="Casa">
                                <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                                <span class="intake-card-title">${t('Casa', 'House')}</span>
                            </div>
                            <div class="intake-card" data-field="tipoPropiedad" data-value="Apartamento">
                                <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                                <span class="intake-card-title">${t('Apartamento', 'Apartment')}</span>
                            </div>
                            <div class="intake-card" data-field="tipoPropiedad" data-value="Comercial">
                                <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                <span class="intake-card-title">${t('Comercial / Otro', 'Commercial / Other')}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Step 4: Ubicación -->
                    <div class="intake-step" data-step="4">
                        <h2 class="intake-step-title">${this.stepsConfig[4].title}</h2>
                        <div class="intake-cards-grid">
                            <div class="intake-card" data-field="tipoUbicacion" data-value="Ciudad">
                                <span class="intake-card-title">${t('Ciudad', 'City')}</span>
                            </div>
                            <div class="intake-card" data-field="tipoUbicacion" data-value="Playa">
                                <span class="intake-card-title">${t('Playa', 'Beach')}</span>
                            </div>
                            <div class="intake-card" data-field="tipoUbicacion" data-value="Montaña">
                                <span class="intake-card-title">${t('Montaña', 'Mountain')}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Step 5: Estilos Visuales -->
                    <div class="intake-step" data-step="5">
                        <h2 class="intake-step-title text-3xl mb-8">${this.stepsConfig[5].title}</h2>
                        <div class="intake-img-cards">
                            <div class="intake-img-card" data-field="estilos" data-value="Minimalista Cálido">
                                <img src="Warm-minimalism-living-room-by-Decorilla-designer-Leanna-S.--1536x1026.webp" alt="Minimalista Cálido">
                                <span class="intake-img-card-label">${t('Minimalista Cálido', 'Warm Minimalist')}</span>
                            </div>
                            <div class="intake-img-card" data-field="estilos" data-value="Contemporáneo">
                                <img src="designer-guide-to-contemporary-style-1976503-hero-f961b04fc1fe47568138795cd90d91cf.webp" alt="Contemporáneo">
                                <span class="intake-img-card-label">${t('Contemporáneo', 'Contemporary')}</span>
                            </div>
                            <div class="intake-img-card" data-field="estilos" data-value="Clásico Moderno">
                                <img src="modern-classic-living-room-by-decorilla-1536x860.webp" alt="Clásico Moderno">
                                <span class="intake-img-card-label">${t('Clásico Moderno', 'Modern Classic')}</span>
                            </div>
                            <div class="intake-img-card" data-field="estilos" data-value="Boho Chic">
                                <img src="13082424-ab6d7e14-1dae-404b-b617-c807a403c858.webp" alt="Boho Chic">
                                <span class="intake-img-card-label">${t('Boho Chic', 'Boho Chic')}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Step 6: Presupuesto -->
                    <div class="intake-step" data-step="6">
                        <h2 class="intake-step-title text-3xl mb-8">${this.stepsConfig[6].title}</h2>
                        <p class="mb-8 opacity-60">${t('Esto nos ayuda muchísimo a diseñar proponiendo piezas acordes a tu realidad.', 'This helps us immensely in designing and proposing pieces that fit your reality.')}</p>
                        <div class="intake-cards-grid">
                            <div class="intake-card" data-field="presupuesto" data-value="$500 - $1,500">
                                <span class="intake-card-title">$500 – $1,500</span>
                            </div>
                            <div class="intake-card" data-field="presupuesto" data-value="$1,500 - $5,000">
                                <span class="intake-card-title">$1,500 – $5,000</span>
                            </div>
                            <div class="intake-card" data-field="presupuesto" data-value="$5,000 - $10,000">
                                <span class="intake-card-title">$5,000 – $10,000</span>
                            </div>
                            <div class="intake-card" data-field="presupuesto" data-value="$10,000+">
                                <span class="intake-card-title">$10,000+</span>
                            </div>
                        </div>
                    </div>

                    <!-- Step 7: Final -->
                    <div class="intake-step" data-step="7">
                        <h2 class="intake-step-title" id="title-final">${this.stepsConfig[7].title}</h2>
                        <p class="mb-10 text-lg opacity-70">${t('Tu perfil encaja perfecto. Al enviar esto, nuestro equipo revisará tus respuestas y te enviaremos un enlace para agendar nuestra sesión oficial.', 'Your profile fits perfectly. By submitting this, our team will review your answers and send you a link to book our official session.')}</p>
                        <button class="intake-btn-submit" id="intake-submit">
                            ${t('Enviar y Solicitar Sesión', 'Submit Request')}
                            <svg width="20" height="20" fill="none" class="ml-2" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 12h16m-7-7l7 7-7 7"></path></svg>
                        </button>
                        <p id="intake-success-msg" class="mt-6 text-brand-sea font-bold hidden">${t('¡Recibido! Te contactaremos muy pronto al correo proporcionado.', 'Received! We will contact you soon at the provided email.')}</p>
                    </div>

                </div>

                <div class="intake-footer">
                    <button class="intake-btn-nav intake-btn-prev" disabled>
                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg> ${t('Atrás', 'Back')}
                    </button>
                    <!-- Next button shown only when not last step -->
                    <button class="intake-btn-next intake-footer-next">
                        ${t('Siguiente', 'Next')} <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                    </button>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', html);
    }

    cacheDOM() {
        this.modal = document.getElementById('intake-modal');
        this.btnClose = document.querySelector('.intake-close');
        this.btnPrev = document.querySelector('.intake-btn-prev');
        this.btnNextFooter = document.querySelector('.intake-footer-next');
        this.steps = document.querySelectorAll('.intake-step');
        this.progressText = document.getElementById('intake-progress-text');
        this.progressFill = document.getElementById('intake-progress-fill');
        this.btnSubmit = document.getElementById('intake-submit');
        this.footer = document.querySelector('.intake-footer');
    }

    bindEvents() {
        this.btnClose.addEventListener('click', () => this.close());
        this.btnPrev.addEventListener('click', () => this.prevStep());
        
        // Footer next button
        this.btnNextFooter.addEventListener('click', () => {
            this.captureDataForStep(this.currentStep);
            this.nextStep();
        });

        // Inline next buttons
        document.querySelectorAll('.intake-step .intake-btn-next').forEach(btn => {
            btn.addEventListener('click', () => {
                this.captureDataForStep(this.currentStep);
                this.nextStep();
            });
        });

        // Cards selections (single)
        document.querySelectorAll('.intake-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const parentGrid = card.closest('.intake-cards-grid');
                parentGrid.querySelectorAll('.intake-card').forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');
                
                const field = card.dataset.field;
                const value = card.dataset.value;
                this.formData[field] = value;
                
                // Auto advance
                setTimeout(() => this.nextStep(), 400);
            });
        });

        // Image Cards (multiple selection)
        document.querySelectorAll('.intake-img-card').forEach(card => {
            card.addEventListener('click', (e) => {
                card.classList.toggle('selected');
                const field = card.dataset.field; // "estilos"
                const value = card.dataset.value;
                
                let selected = Array.from(card.closest('.intake-img-cards').querySelectorAll('.selected'))
                                    .map(el => el.dataset.value);
                this.formData[field] = selected;
            });
        });

        // Submit form (mocking Formspree via AJAX)
        this.btnSubmit.addEventListener('click', async () => {
            this.btnSubmit.innerHTML = this.isEnglish ? 'Sending...' : 'Enviando...';
            this.btnSubmit.disabled = true;
            
            // Append package intention
            this.formData.paqueteInteresado = this.selectedPackage;

            try {
                // To formspree
                await fetch('https://formspree.io/f/xvzdzrpv', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(this.formData)
                });
                
                document.getElementById('intake-success-msg').classList.remove('hidden');
                this.btnSubmit.style.display = 'none';
                setTimeout(() => this.close(), 3000);
            } catch (error) {
                console.error(error);
                this.btnSubmit.innerHTML = this.isEnglish ? 'Error sending' : 'Error al enviar';
            }
        });
    }

    captureDataForStep(stepIndex) {
        if (stepIndex === 1) {
            this.formData.nombre = document.getElementById('intake-nombre').value || (this.isEnglish ? 'Friend' : 'Amigo');
            // Update next step titles
            document.getElementById('title-contacto').textContent = this.isEnglish ? `Where can we contact you, ${this.formData.nombre.split(' ')[0]}?` : `¿Dónde te contactamos, ${this.formData.nombre.split(' ')[0]}?`;
            document.getElementById('title-final').textContent = this.isEnglish ? `All set, ${this.formData.nombre.split(' ')[0]}.` : `Todo listo, ${this.formData.nombre.split(' ')[0]}.`;
        } else if (stepIndex === 2) {
            this.formData.email = document.getElementById('intake-email').value;
            this.formData.telefono = document.getElementById('intake-telefono').value;
            this.formData.ciudad = document.getElementById('intake-ciudad').value;
        }
    }

    updateUI() {
        this.steps.forEach((step, i) => {
            step.classList.remove('active', 'past');
            if (i === this.currentStep) {
                step.classList.add('active');
            } else if (i < this.currentStep) {
                step.classList.add('past');
            }
        });

        // Progress
        const progressPercentage = ((this.currentStep + 1) / this.stepsConfig.length) * 100;
        this.progressFill.style.width = `${progressPercentage}%`;
        this.progressText.textContent = `0${this.currentStep + 1} / 0${this.stepsConfig.length}`;

        // Buttons
        this.btnPrev.disabled = this.currentStep === 0;
        if (this.currentStep === this.stepsConfig.length - 1 || this.currentStep === 0) {
            this.btnNextFooter.style.display = 'none';
        } else {
            this.btnNextFooter.style.display = 'inline-flex';
        }
        
        // Hide footer entirely on step 0
        if(this.currentStep === 0) {
             this.footer.style.opacity = '0';
             this.footer.style.pointerEvents = 'none';
        } else {
             this.footer.style.opacity = '1';
             this.footer.style.pointerEvents = 'auto';
        }
    }

    nextStep() {
        if (this.currentStep < this.stepsConfig.length - 1) {
            this.currentStep++;
            this.updateUI();
        }
    }

    prevStep() {
        if (this.currentStep > 0) {
            this.currentStep--;
            this.updateUI();
        }
    }

    open(packageName = '') {
        this.selectedPackage = packageName;
        this.currentStep = 0;
        this.updateUI();
        document.body.style.overflow = 'hidden';
        this.modal.classList.add('intake-open');
    }

    close() {
        this.modal.classList.remove('intake-open');
        document.body.style.overflow = '';
        setTimeout(() => {
            this.currentStep = 0;
            this.updateUI();
        }, 800);
    }
}

// Global instance
let funzioneIntake;
document.addEventListener('DOMContentLoaded', () => {
    funzioneIntake = new FunzioneIntake();
    
    // Override the "Reservar Ahora" buttons
    const btnReservarList = document.querySelectorAll('.btn-reservar');
    btnReservarList.forEach(btn => {
        // Clone and replace to remove old events
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
        
        newBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const serviceName = newBtn.getAttribute('data-service');
            funzioneIntake.open(serviceName);
        });
    });
});
