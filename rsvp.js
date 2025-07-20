// Funções para manipulação do formulário e dados
document.addEventListener('DOMContentLoaded', function() {
    // Alternar campos de acompanhante
    const companionSelect = document.getElementById('companion');
    const companionDetails = document.getElementById('companion-details');
    
    companionSelect.addEventListener('change', function() {
        if (this.value === 'yes') {
            companionDetails.style.display = 'block';
            document.getElementById('companion-name').required = true;
            document.getElementById('companion-relation').required = true;
        } else {
            companionDetails.style.display = 'none';
            document.getElementById('companion-name').required = false;
            document.getElementById('companion-relation').required = false;
        }
    });

    // Manipulação do formulário
    const inviteForm = document.getElementById('inviteForm');
    const formMessage = document.getElementById('form-message');
    
    inviteForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validação adicional
        if (companionSelect.value === 'yes' && 
            (!document.getElementById('companion-name').value || 
             !document.getElementById('companion-relation').value)) {
            showMessage('Por favor, preencha os dados do acompanhante.', 'error');
            return;
        }
        
        // Desabilitar botão para evitar múltiplos envios
        document.getElementById('submit-btn').disabled = true;
        
        // Coletar dados do formulário
        const formData = {
            fullName: document.getElementById('full-name').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            hasCompanion: companionSelect.value === 'yes',
            companionName: document.getElementById('companion-name').value.trim(),
            companionRelation: document.getElementById('companion-relation').value
        };
        
        // Simular envio para o Google Sheets (substitua pela sua API real)
        submitToGoogleSheets(formData);
    });
    
    // Função para exibir mensagens
    function showMessage(message, type) {
        formMessage.textContent = message;
        formMessage.style.display = 'block';
        formMessage.style.backgroundColor = type === 'error' ? '#ffebee' : '#e8f5e9';
        formMessage.style.color = type === 'error' ? '#c62828' : '#2e7d32';
        
        document.getElementById('submit-btn').disabled = false;
    }
    
    // Função para enviar dados para o Google Sheets (simulação)
    function submitToGoogleSheets(formData) {
        // Aqui você deve substituir pela sua URL de API do Google Apps Script
        const apiUrl = "SUA_URL_DE_API_DO_GOOGLE_SCRIPT_AQUI";
        
        // Gerar um código de convite único (simulação)
        const inviteCode = generateInviteCode();
        
        // Adicionar o código ao formData
        formData.inviteCode = inviteCode;
        
        // Simular requisição AJAX
        console.log("Dados enviados para o Google Sheets:", formData);
        
        // Simular resposta de sucesso (remova isso na implementação real)
        setTimeout(() => {
            // Mostrar modal com código de convite
            showInviteModal(inviteCode);
            
            // Enviar e-mail simulado
            sendConfirmationEmail(formData.email, inviteCode);
            
            // Atualizar lista de convidados
            fetchGuestList();
            
            // Limpar formulário
            inviteForm.reset();
            companionDetails.style.display = 'none';
            document.getElementById('submit-btn').disabled = false;
        }, 1500);
        
        // Na implementação real, use fetch() como no seu exemplo de pagamento
        /*
        fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                showInviteModal(data.inviteCode);
                fetchGuestList();
                inviteForm.reset();
            } else {
                showMessage('Erro ao enviar dados: ' + data.message, 'error');
            }
        })
        .catch(error => {
            showMessage('Erro de conexão: ' + error.message, 'error');
        });
        */
    }
    
    // Gerar código de convite aleatório
    function generateInviteCode() {
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        let code = 'AR2025';
        for (let i = 0; i < 8; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return code;
    }
    
    // Mostrar modal com código de convite
    function showInviteModal(code) {
        const modal = document.getElementById('invite-modal');
        const inviteCodeDisplay = document.getElementById('invite-code-display');
        
        inviteCodeDisplay.textContent = code;
        modal.style.display = 'block';
        
        // Configurar botão de copiar
        document.getElementById('copy-invite-code').onclick = function() {
            navigator.clipboard.writeText(code).then(() => {
                this.textContent = 'Copiado!';
                setTimeout(() => {
                    this.textContent = 'Copiar Código';
                }, 2000);
            });
        };
    }
    
    // Fechar modal
    document.querySelector('.close-modal').onclick = function() {
        document.getElementById('invite-modal').style.display = 'none';
    };
    
    // Fechar modal ao clicar fora
    window.onclick = function(event) {
        if (event.target === document.getElementById('invite-modal')) {
            document.getElementById('invite-modal').style.display = 'none';
        }
    };
    
    // Simular envio de e-mail
    function sendConfirmationEmail(email, code) {
        console.log(`E-mail enviado para ${email} com código ${code}`);
        // Na implementação real, isso seria feito no Google Apps Script
    }
    
    // Buscar lista de convidados
    function fetchGuestList() {
        // Aqui você deve substituir pela sua URL de API do Google Apps Script para buscar dados
        const apiUrl = "SUA_URL_DE_API_DO_GOOGLE_SCRIPT_PARA_BUSCAR_DADOS";
        
        // Simular requisição AJAX
        console.log("Buscando lista de convidados...");
        
        // Simular dados (remova isso na implementação real)
        const mockData = [
            {
                fullName: "João Silva",
                email: "joao@example.com",
                phone: "912345678",
                inviteCode: "ABC12345",
                companion: "Maria Silva (Esposa)"
            },
            {
                fullName: "Ana Pereira",
                email: "ana@example.com",
                phone: "923456789",
                inviteCode: "DEF67890",
                companion: "Nenhum"
            }
        ];
        
        // Simular resposta (remova isso na implementação real)
        setTimeout(() => {
            updateGuestTable(mockData);
        }, 1000);
        
        // Na implementação real, use fetch() como no seu exemplo de pagamento
        /*
        fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                updateGuestTable(data.guests);
            } else {
                console.error('Erro ao buscar convidados:', data.message);
            }
        })
        .catch(error => {
            console.error('Erro de conexão:', error);
        });
        */
    }
    
    // Atualizar tabela de convidados
    function updateGuestTable(guests) {
        const tbody = document.getElementById('guest-list-body');
        tbody.innerHTML = '';
        
        if (guests.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5">Nenhum convidado encontrado</td></tr>';
            return;
        }
        
        guests.forEach(guest => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${guest.fullName}</td>
                <td>${guest.email}</td>
                <td>${guest.phone}</td>
                <td>${guest.inviteCode}</td>
                <td>${guest.companion || 'Nenhum'}</td>
            `;
            tbody.appendChild(row);
        });
    }
    
    // Buscar lista de convidados ao carregar a página
    fetchGuestList();
    
    // Função de pesquisa
    document.getElementById('guest-search').addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const rows = document.querySelectorAll('#guest-list-body tr');
        
        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(searchTerm) ? '' : 'none';
        });
    });
});

// Função para verificar convite (será usada em outra página)
function verifyInvite(code) {
    // Implementação estará na página de verificação
    console.log("Verificando convite:", code);
    // Você fará uma requisição para sua API do Google Script para verificar o código
}