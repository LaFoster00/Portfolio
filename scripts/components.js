// header 
class THeader extends HTMLElement {
    connectedCallback(){
        this.innerHTML = `
        <header>
            <svg class="ham" viewBox="-0.5 0 25 25" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M2 12.32H22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                    stroke-linejoin="round" />
                <path d="M2 18.32H22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                    stroke-linejoin="round" />
                <path d="M2 6.32001H22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                    stroke-linejoin="round" />
            </svg>
            <nav>
                <a href="index.html">About Me</a>
                <a href="projects.html">Projects</a>
                <a href="aboutme.html">About Me</a>
                <a href="contact.html">Contact</a>
            </nav>
            <button class="theme-toggle" onclick="toggleLightMode()" aria-label="Toggle theme">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" fill="currentColor"/>
                </svg>
            </button>
        </header>
    `;
    }
}
customElements.define('t-header', THeader);

class ProjectCard extends HTMLElement {
    connectedCallback() {
        const href = this.getAttribute('href');
        const image = this.getAttribute('image');
        const imageAlt = this.getAttribute('image-alt');
        const title = this.getAttribute('title');
        const summary = this.getAttribute('summary');
        const roles = this.getAttribute('roles') ? this.getAttribute('roles').split(',') : [];
        const roleSpans = roles.map(role => `<span>${role.trim()}</span>`).join('\n');
        this.innerHTML = `
        <article class="project-card">
            <a href="${href}" aria-label="${title}">
                <figure class="project-card__preview">
                    <img src="${image}" alt="${imageAlt}" loading="lazy">
                </figure>
                <div class="project-card__body">
                    <h3>${title}</h3>
                    <p class="project-card__summary">${summary}</p>
                    <div class="project-card__roles">
                        ${roleSpans}
                    </div>
                    <span class="project-card__cta">View project →</span>
                </div>
            </a>
        </article>
        `;
    }
}
customElements.define('t-project-card', ProjectCard);

// Theme toggle function with persistence
function toggleLightMode() {
    document.documentElement.classList.toggle('light');
    const isLight = document.documentElement.classList.contains('light');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
}

// Load saved theme on page load (in case the head script didn't run)
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.documentElement.classList.add('light');
    }
});