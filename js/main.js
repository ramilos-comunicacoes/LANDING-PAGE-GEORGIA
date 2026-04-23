/* ============================================================
   MAIN.JS – Geórgia Andrade Advocacia
   Menu, scroll, animações, contadores
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    initHeader();
    initMobileMenu();
    initScrollAnimations();
    initCounters();
    initFAQ();
    initSmoothScroll();
    initActiveNav();
});

/* ── Header scroll effect ── */
function initHeader() {
    const header = document.getElementById('header');
    if (!header) return;

    const onScroll = () => {
        if (window.scrollY > 60) {
            header.classList.add('header--scrolled');
            header.classList.remove('header--transparent');
        } else {
            header.classList.remove('header--scrolled');
            header.classList.add('header--transparent');
        }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
}

/* ── Mobile menu ── */
function initMobileMenu() {
    const toggle = document.getElementById('menu-toggle');
    const nav = document.getElementById('header-nav');
    const overlay = document.getElementById('mobile-overlay');
    const links = document.querySelectorAll('.header__menu a');

    if (!toggle || !nav) return;

    const close = () => {
        toggle.classList.remove('active');
        nav.classList.remove('open');
        if (overlay) overlay.classList.remove('active');
        document.body.style.overflow = '';
    };

    const open = () => {
        toggle.classList.add('active');
        nav.classList.add('open');
        if (overlay) overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    toggle.addEventListener('click', () => {
        nav.classList.contains('open') ? close() : open();
    });

    if (overlay) overlay.addEventListener('click', close);

    links.forEach(link => {
        link.addEventListener('click', close);
    });
}

/* ── Scroll animations (Intersection Observer) ── */
function initScrollAnimations() {
    const targets = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .scale-in');

    if (!targets.length) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.15,
            rootMargin: '0px 0px -40px 0px'
        }
    );

    targets.forEach(target => observer.observe(target));
}

/* ── Animated counters ── */
function initCounters() {
    const counters = document.querySelectorAll('[data-counter]');
    if (!counters.length) return;

    const duration = 2000;

    const animateCounter = (el) => {
        const target = parseInt(el.getAttribute('data-counter'), 10);
        const suffix = el.getAttribute('data-suffix') || '';
        const startTime = performance.now();

        const update = (now) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing: ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(eased * target);

            el.textContent = current.toLocaleString('pt-BR') + suffix;

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        };

        requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.5 }
    );

    counters.forEach(counter => observer.observe(counter));
}

/* ── FAQ Accordion ── */
function initFAQ() {
    const items = document.querySelectorAll('.faq__item');
    if (!items.length) return;

    items.forEach(item => {
        const question = item.querySelector('.faq__question');
        const answer = item.querySelector('.faq__answer');

        if (!question || !answer) return;

        question.addEventListener('click', () => {
            const isOpen = item.classList.contains('active');

            // Close all
            items.forEach(other => {
                other.classList.remove('active');
                const otherAnswer = other.querySelector('.faq__answer');
                if (otherAnswer) otherAnswer.style.maxHeight = '0';
            });

            // Open clicked
            if (!isOpen) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });
}

/* ── Smooth scroll for anchor links ── */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const href = anchor.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (!target) return;

            e.preventDefault();

            const headerHeight = document.getElementById('header')?.offsetHeight || 80;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
}

/* ── Active navigation highlight ── */
function initActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.header__menu a');

    if (!sections.length || !navLinks.length) return;

    const onScroll = () => {
        const scrollY = window.pageYOffset;
        const headerHeight = document.getElementById('header')?.offsetHeight || 80;

        sections.forEach(section => {
            const top = section.offsetTop - headerHeight - 100;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollY >= top && scrollY < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
}

/* ── Lead Form – Salário Maternidade ── */
function handleLeadForm(e) {
    e.preventDefault();
    
    const form = e.target;
    const nome = form.querySelector('#lead-name')?.value?.trim() || '';
    const telefone = form.querySelector('#lead-phone')?.value?.trim() || '';
    const cidade = form.querySelector('#lead-city')?.value?.trim() || '';
    const situacao = form.querySelector('#lead-situation')?.value || '';

    const situacaoTexts = {
        'gestante': 'Estou grávida',
        'mae-recente': 'Tive bebê recentemente',
        'rural': 'Sou trabalhadora rural',
        'negado': 'Tive benefício negado',
        'duvida': 'Tenho dúvidas sobre meus direitos'
    };

    const mensagem = `Olá! Vim pelo site e gostaria de saber mais sobre o *Salário Maternidade*.

📋 *Dados do formulário:*
👤 Nome: ${nome}
📱 Telefone: ${telefone}
📍 Cidade: ${cidade || 'Não informada'}
📝 Situação: ${situacaoTexts[situacao] || situacao}

Gostaria de uma análise gratuita do meu caso!`;

    // Show success state
    const wrapper = form.closest('.lead-form__form-wrapper');
    if (wrapper) {
        wrapper.innerHTML = `
            <div class="lead-form__form" style="text-align:center; padding: 3rem 2rem;">
                <div class="lead-form__success">
                    <div class="lead-form__success-icon">
                        <i data-lucide="check-circle" class="lucide" style="width:40px;height:40px;color:#2e7d32;"></i>
                    </div>
                    <h3>Formulário Enviado!</h3>
                    <p>Você será redirecionado para o WhatsApp para confirmar o envio. Nossa equipe entrará em contato em até 24 horas.</p>
                </div>
            </div>
        `;
        // Re-initialize Lucide for the new icon
        if (window.lucide) lucide.createIcons();
    }

    // Open WhatsApp with the message
    const whatsappUrl = `https://wa.me/5588992798152?text=${encodeURIComponent(mensagem)}`;
    setTimeout(() => {
        window.open(whatsappUrl, '_blank');
    }, 800);
}
