// header
class THeader extends HTMLElement {
  connectedCallback() {
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
                <a href="index.html">Home</a>
                <a href="projects.html">Projects</a>
                <a href="aboutme.html">About Me</a>
                <a href="contact.html">Contact</a>
                <a href="https://www.linkedin.com/in/lasse-foster/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-linkedin" viewBox="0 0 16 16">
                        <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"/>
                    </svg>
                </a>
                <a href="https://github.com/LaFoster00" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-github" viewBox="0 0 16 16">
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"/>
                    </svg>
                </a>
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
customElements.define("t-header", THeader);

class ProjectCard extends HTMLElement {
  connectedCallback() {
    const href = this.getAttribute("href");
    const image = this.getAttribute("image");
    const imageAlt = this.getAttribute("image-alt");
    const title = this.getAttribute("title");
    const summary = this.getAttribute("summary");
    const roles = this.getAttribute("roles")
      ? this.getAttribute("roles").split(",")
      : [];
    const roleSpans = roles
      .map((role) => `<span>${role.trim()}</span>`)
      .join("\n");
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
customElements.define("t-project-card", ProjectCard);

class TSlideshow extends HTMLElement {
  connectedCallback() {
    if (this._initialized) return;
    const rawSlides = Array.from(this.children).filter(
      (node) => node.nodeType === Node.ELEMENT_NODE,
    );
    if (!rawSlides.length) return;

    this._initialized = true;
    this.classList.add("slideshow");
    this._baseAspect = 16 / 9;

    const slidesWrapper = document.createElement("div");
    slidesWrapper.className = "slideshow__slides";

    this._slidesMeta = [];

    rawSlides.forEach((element, index) => {
      const slide = document.createElement("div");
      slide.className = "slideshow__slide";
      if (index === 0) slide.classList.add("is-active");
      element.classList.add("slideshow__media");
      slide.appendChild(element);
      slidesWrapper.appendChild(slide);

      const meta = { slide, media: element };
      this._slidesMeta.push(meta);
    });

    this.textContent = "";
    this.appendChild(slidesWrapper);

    this._slides = Array.from(slidesWrapper.children);
    this._currentIndex = 0;

    if (this._slides.length > 1) {
      this._createControls();
      this._createIndicators();
    }

    window.addEventListener("resize", this._handleResize);
  }

  disconnectedCallback() {
    if (this._handleResize) {
      window.removeEventListener("resize", this._handleResize);
    }
  }

  _createControls() {
    const prev = this._buildArrow("prev", "Previous slide", "‹");
    const next = this._buildArrow("next", "Next slide", "›");
    this.append(prev, next);
  }

  _buildArrow(direction, label, symbol) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `slideshow__arrow slideshow__arrow--${direction}`;
    button.setAttribute("aria-label", label);
    button.innerHTML = symbol;
    button.addEventListener("click", () => {
      this._changeSlide(direction === "next" ? 1 : -1);
    });
    return button;
  }

  _createIndicators() {
    const wrapper = document.createElement("div");
    wrapper.className = "slideshow__indicators";
    this._indicators = this._slides.map((_, index) => {
      const indicator = document.createElement("button");
      indicator.type = "button";
      indicator.className = "slideshow__indicator";
      indicator.setAttribute("aria-label", `Go to slide ${index + 1}`);
      if (index === 0) indicator.classList.add("is-active");
      indicator.addEventListener("click", () => this._setActiveSlide(index));
      wrapper.appendChild(indicator);
      return indicator;
    });
    this.appendChild(wrapper);
  }

  _changeSlide(delta) {
    const nextIndex =
      (this._currentIndex + delta + this._slides.length) % this._slides.length;
    this._setActiveSlide(nextIndex);
  }

  _setActiveSlide(index) {
    if (index === this._currentIndex) return;
    this._slides[this._currentIndex].classList.remove("is-active");
    this._slides[index].classList.add("is-active");
    if (this._indicators) {
      this._indicators[this._currentIndex].classList.remove("is-active");
      this._indicators[index].classList.add("is-active");
    }
    this._currentIndex = index;
  }
}
customElements.define("t-slideshow", TSlideshow);

// Theme toggle function with persistence
function toggleLightMode() {
  document.documentElement.classList.toggle("light");
  const isLight = document.documentElement.classList.contains("light");
  localStorage.setItem("theme", isLight ? "light" : "dark");
}

// Load saved theme on page load (in case the head script didn't run)
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    document.documentElement.classList.add("light");
  }
});
