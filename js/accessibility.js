/* ============================================================
   ACCESSIBILITY.JS – Widget de Acessibilidade
   Opções: Fonte ↑↓, alto contraste, escala cinza,
           cursor ampliado, links sublinhados
   ============================================================ */

class AccessibilityWidget {
    constructor() {
        this.panel = document.getElementById('a11y-panel');
        this.toggle = document.getElementById('a11y-toggle');
        this.options = {};
        this.storageKey = 'georgia-a11y-prefs';

        if (!this.panel || !this.toggle) return;

        this.init();
    }

    init() {
        this.loadPreferences();
        this.bindEvents();
        this.applyPreferences();
    }

    bindEvents() {
        // Toggle panel
        this.toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            this.panel.classList.toggle('open');
        });

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (!this.panel.contains(e.target) && !this.toggle.contains(e.target)) {
                this.panel.classList.remove('open');
            }
        });

        // Option buttons
        document.querySelectorAll('.a11y-widget__option').forEach(btn => {
            btn.addEventListener('click', () => {
                const action = btn.getAttribute('data-a11y');
                if (action) this.toggleOption(action, btn);
            });
        });

        // Reset button
        const resetBtn = document.getElementById('a11y-reset');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => this.resetAll());
        }

        // Escape to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.panel.classList.remove('open');
            }
        });
    }

    toggleOption(action, btn) {
        const isActive = btn.classList.contains('active');

        // Handle mutually exclusive options
        if (action === 'font-increase' || action === 'font-decrease') {
            // Remove both font classes first
            document.body.classList.remove('a11y-font-increase', 'a11y-font-decrease');
            document.querySelectorAll('[data-a11y="font-increase"], [data-a11y="font-decrease"]').forEach(b => {
                b.classList.remove('active');
            });
            delete this.options['font-increase'];
            delete this.options['font-decrease'];

            if (!isActive) {
                document.body.classList.add(`a11y-${action}`);
                btn.classList.add('active');
                this.options[action] = true;
            }
        } else {
            if (isActive) {
                document.body.classList.remove(`a11y-${action}`);
                btn.classList.remove('active');
                delete this.options[action];
            } else {
                document.body.classList.add(`a11y-${action}`);
                btn.classList.add('active');
                this.options[action] = true;
            }
        }

        this.savePreferences();
    }

    loadPreferences() {
        try {
            const saved = localStorage.getItem(this.storageKey);
            if (saved) {
                this.options = JSON.parse(saved);
            }
        } catch (e) {
            this.options = {};
        }
    }

    savePreferences() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.options));
        } catch (e) {
            // silently fail
        }
    }

    applyPreferences() {
        Object.keys(this.options).forEach(action => {
            if (this.options[action]) {
                document.body.classList.add(`a11y-${action}`);
                const btn = document.querySelector(`[data-a11y="${action}"]`);
                if (btn) btn.classList.add('active');
            }
        });
    }

    resetAll() {
        // Remove all a11y classes
        const classes = [
            'a11y-high-contrast',
            'a11y-grayscale',
            'a11y-large-cursor',
            'a11y-underline-links',
            'a11y-font-increase',
            'a11y-font-decrease'
        ];

        classes.forEach(cls => document.body.classList.remove(cls));

        // Reset buttons
        document.querySelectorAll('.a11y-widget__option').forEach(btn => {
            btn.classList.remove('active');
        });

        // Clear storage
        this.options = {};
        this.savePreferences();
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    new AccessibilityWidget();
});
