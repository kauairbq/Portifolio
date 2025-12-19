// Form validation and submission
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const formFeedback = document.getElementById('form-feedback');

    // Form validation rules
    const validationRules = {
        name: {
            required: true,
            minLength: 3,
            maxLength: 50,
            pattern: /^[a-zA-ZÀ-ÿ\s]+$/,
            errorMessage: 'Nome deve ter entre 3 e 50 caracteres e conter apenas letras.'
        },
        email: {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            errorMessage: 'Por favor, insira um email válido.'
        },
        subject: {
            required: true,
            minLength: 5,
            maxLength: 100,
            errorMessage: 'Assunto deve ter entre 5 e 100 caracteres.'
        },
        message: {
            required: true,
            minLength: 10,
            maxLength: 1000,
            errorMessage: 'Mensagem deve ter entre 10 e 1000 caracteres.'
        }
    };

    // Validate individual field
    function validateField(fieldName, value) {
        const rules = validationRules[fieldName];
        const errorElement = document.getElementById(`${fieldName}-error`);
        const inputElement = document.getElementById(fieldName);

        let isValid = true;
        let errorMessage = '';

        // Required check
        if (rules.required && (!value || value.trim() === '')) {
            isValid = false;
            errorMessage = 'Este campo é obrigatório.';
        }
        // Length checks
        else if (value) {
            if (rules.minLength && value.length < rules.minLength) {
                isValid = false;
                errorMessage = rules.errorMessage;
            }
            if (rules.maxLength && value.length > rules.maxLength) {
                isValid = false;
                errorMessage = rules.errorMessage;
            }
            // Pattern check
            if (rules.pattern && !rules.pattern.test(value)) {
                isValid = false;
                errorMessage = rules.errorMessage;
            }
        }

        // Update UI
        if (!isValid) {
            inputElement.classList.add('error');
            errorElement.textContent = errorMessage;
            errorElement.style.display = 'block';
        } else {
            inputElement.classList.remove('error');
            errorElement.style.display = 'none';
        }

        return isValid;
    }

    // Validate entire form
    function validateForm() {
        let isFormValid = true;
        Object.keys(validationRules).forEach(fieldName => {
            const value = document.getElementById(fieldName).value;
            if (!validateField(fieldName, value)) {
                isFormValid = false;
            }
        });
        return isFormValid;
    }

    // Real-time validation
    Object.keys(validationRules).forEach(fieldName => {
        const inputElement = document.getElementById(fieldName);
        inputElement.addEventListener('blur', function() {
            validateField(fieldName, this.value);
        });

        inputElement.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateField(fieldName, this.value);
            }
        });
    });

    // Form submission
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        if (!validateForm()) {
            formFeedback.textContent = 'Por favor, corrija os erros no formulário.';
            formFeedback.className = 'error-message';
            formFeedback.style.display = 'block';
            return;
        }

        // Disable submit button
        submitBtn.disabled = true;
        submitBtn.textContent = 'Enviando...';

        // Collect form data
        const formData = new FormData(this);
        const actionUrl = contactForm.getAttribute('action');

        try {
            const response = await fetch(actionUrl, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            if (!response.ok) {
                throw new Error('Falha ao enviar mensagem.');
            }

            formFeedback.textContent = 'Mensagem enviada com sucesso! Entrarei em contato em breve.';
            formFeedback.className = 'success-message';
            formFeedback.style.display = 'block';
            contactForm.reset();
        } catch (error) {
            formFeedback.textContent = 'Nao foi possivel enviar. Tente novamente em alguns minutos.';
            formFeedback.className = 'error-message';
            formFeedback.style.display = 'block';
        } finally {
            // Re-enable submit button
            submitBtn.disabled = false;
            submitBtn.textContent = 'Enviar Mensagem';

            // Clear message after 5 seconds
            setTimeout(() => {
                formFeedback.style.display = 'none';
            }, 5000);
        }
    });

    // Initialize Leaflet map
    function initMap() {
        // Check if Leaflet is loaded
        if (typeof L === 'undefined') {
            console.error('Leaflet library not loaded');
            return;
        }

        // Coordinates for Viseu, Portugal
        const viseuCoords = [40.6610, -7.9097];

        // Create map
        const map = L.map('map').setView(viseuCoords, 13);

        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 19
        }).addTo(map);

        // Add marker for Viseu
        const marker = L.marker(viseuCoords).addTo(map);

        // Add popup to marker
        marker.bindPopup(`
            <div style="text-align: center;">
                <h3>Kauai Rocha</h3>
                <p>Viseu, Portugal</p>
                <p>Desenvolvedor Full Stack</p>
            </div>
        `).openPopup();

        // Add custom marker icon (optional)
        const customIcon = L.divIcon({
            className: 'custom-marker',
            html: '<div style="background-color: #1E4DB7; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"></div>',
            iconSize: [26, 26],
            iconAnchor: [13, 13]
        });

        // Replace default marker with custom one
        marker.setIcon(customIcon);
    }

    // Load Leaflet CSS and JS dynamically
    function loadLeaflet() {
        // Load CSS
        const cssLink = document.createElement('link');
        cssLink.rel = 'stylesheet';
        cssLink.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        cssLink.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
        cssLink.crossOrigin = '';
        document.head.appendChild(cssLink);

        // Load JS
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
        script.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=';
        script.crossOrigin = '';
        script.onload = initMap;
        document.head.appendChild(script);
    }

    // Initialize map when DOM is ready
    loadLeaflet();
});
