const homePage = document.getElementById('homePage');
    const formPage = document.getElementById('formPage');
    const ticketForm = document.getElementById('ticketForm');
    const ticketList = document.getElementById('ticketList');
    const emptyState = document.getElementById('emptyState');
    const ticketCount = document.getElementById('ticketCount');
    const formAlert = document.getElementById('formAlert');
    let tickets = [];
    let nextTicketId = 1001;

    function showPage(page) {
      const showForm = page === 'form';
      homePage.classList.toggle('hidden', showForm);
      formPage.classList.toggle('hidden', !showForm);
      if (showForm) window.scrollTo({top: 0, behavior: 'smooth'});
    }
    function openForm() {
      ticketForm.reset();
      ticketForm.classList.remove('was-validated');
      formAlert.classList.add('hidden');
      showPage('form');
    }
    document.getElementById('newTicketBtn').addEventListener('click', openForm);
    document.getElementById('emptyNewTicketBtn').addEventListener('click', openForm);
    document.getElementById('backBtn').addEventListener('click', () => showPage('home'));
    document.getElementById('homeLink').addEventListener('click', e => { e.preventDefault(); showPage('home'); });
    document.getElementById('cancelBtn').addEventListener('click', () => showPage('home'));

    function renderTickets() {
      ticketList.innerHTML = '';
      emptyState.classList.toggle('hidden', tickets.length > 0);
      ticketCount.textContent = `${tickets.length} talep`;
      tickets.forEach(ticket => {
        const item = document.createElement('div');
        item.className = 'ticket-row d-flex flex-column flex-md-row justify-content-between gap-3';
        const left = document.createElement('div');
        const title = document.createElement('div');
        title.className = 'fw-semibold mb-1';
        title.textContent = `#${ticket.id} · ${ticket.subject}`;
        const details = document.createElement('div');
        details.className = 'small muted';
        details.textContent = `${ticket.name} · ${ticket.category} · ${ticket.date}`;
        left.append(title, details);
        const right = document.createElement('div');
        right.className = 'd-flex align-items-center gap-2 flex-wrap';
        const priority = document.createElement('span');
        priority.className = 'badge ' + (ticket.priority === 'Acil' ? 'text-bg-danger' : ticket.priority === 'Yüksek' ? 'text-bg-warning' : 'text-bg-light');
        priority.textContent = ticket.priority;
        const status = document.createElement('span');
        status.className = 'badge text-bg-primary-subtle text-primary-emphasis';
        status.textContent = 'Alındı';
        right.append(priority, status);
        item.append(left, right);
        ticketList.append(item);
      });
    }

    ticketForm.addEventListener('submit', event => {
      event.preventDefault();
      event.stopPropagation();
      ticketForm.classList.add('was-validated');
      if (!ticketForm.checkValidity()) return;

      const ticket = {
        id: nextTicketId++,
        name: `${document.getElementById('firstName').value.trim()} ${document.getElementById('lastName').value.trim()}`,
        email: document.getElementById('email').value.trim(),
        category: document.getElementById('category').value,
        subject: document.getElementById('subject').value.trim(),
        priority: document.getElementById('priority').value,
        description: document.getElementById('description').value.trim(),
        date: new Date().toLocaleString('tr-TR', {dateStyle:'short', timeStyle:'short'})
      };
      tickets.unshift(ticket);
      renderTickets();
      showPage('home');
      // Demo arayüzü: kayıtlar yalnızca sayfa açıkken bellekte tutulur.
      ticketForm.reset();
      ticketForm.classList.remove('was-validated');
    });
