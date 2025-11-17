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
                <a href="contact.html">Contact</a>
            </nav>
        </header>
    `;
    }
}
customElements.define('t-header', THeader);