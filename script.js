        // Contador regressivo
        function updateCountdown() {
            const weddingDate = new Date('September 6, 2025 18:00:00').getTime();
            const now = new Date().getTime();
            const distance = weddingDate - now;
            
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            document.getElementById('days').textContent = days.toString().padStart(2, '0');
            document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
            document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
            document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        }
        
        setInterval(updateCountdown, 1000);
        updateCountdown();
        
                // Menu responsivo
        const menuToggle = document.querySelector('.menu-toggle');
        const navLinks = document.querySelector('.nav-links');
        
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
        
        // Fechar menu quando um link é clicado (em mobile)
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
        
        // Sistema de abas
        const tabs = document.querySelectorAll('.tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Remove active class from all tabs and contents
                document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
                document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
                
                // Add active class to clicked tab and corresponding content
                tab.classList.add('active');
                const tabId = tab.getAttribute('data-tab');
                document.getElementById(tabId).classList.add('active');
            });
        });
        
        // Formulário RSVP
        document.getElementById('rsvpForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                attending: document.getElementById('attending').value,
                guests: document.getElementById('guests').value,
                message: document.getElementById('message').value
            };
            
            // Aqui você pode adicionar o código para enviar para o Google Sheets ou Firebase
            alert('Obrigado por confirmar sua presença, ' + formData.name + '! Entraremos em contato em breve.');
            this.reset();
        });
        
        // Formulário de Submissão de Convite
        document.getElementById('inviteForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('invite-name').value,
                email: document.getElementById('invite-email').value,
                code: document.getElementById('invite-code').value,
                photo: document.getElementById('invite-photo').files[0] ? document.getElementById('invite-photo').files[0].name : 'Nenhuma foto enviada'
            };
            
            // Aqui você pode adicionar o código para enviar para o Google Sheets ou Firebase
            alert('Convite enviado com sucesso por ' + formData.name + '! Código: ' + formData.code);
            this.reset();
        });
        
        // Suavizar rolagem para âncoras
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });




