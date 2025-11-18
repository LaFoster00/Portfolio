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
                <a href="index.html">Home</a>
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

class TSlideshow extends HTMLElement {
    connectedCallback() {
        if (this._initialized) return;
        const rawSlides = Array.from(this.children).filter(node => node.nodeType === Node.ELEMENT_NODE);
        if (!rawSlides.length) return;

        this._initialized = true;
        this.classList.add('slideshow');
        this._baseAspect = 16 / 9;

        const slidesWrapper = document.createElement('div');
        slidesWrapper.className = 'slideshow__slides';

        this._slidesMeta = [];

        rawSlides.forEach((element, index) => {
            const slide = document.createElement('div');
            slide.className = 'slideshow__slide';
            if (index === 0) slide.classList.add('is-active');
            element.classList.add('slideshow__media');
            slide.appendChild(element);
            slidesWrapper.appendChild(slide);

            const meta = { slide, media: element, ratio: null };
            this._slidesMeta.push(meta);
            this._captureRatio(meta);
        });

        this.textContent = '';
        this.appendChild(slidesWrapper);

        this._slides = Array.from(slidesWrapper.children);
        this._currentIndex = 0;

        if (this._slides.length > 1) {
            this._createControls();
            this._createIndicators();
        }

        this._handleResize = () => this._syncHeight();
        window.addEventListener('resize', this._handleResize);
        requestAnimationFrame(() => this._syncHeight());
    }

    disconnectedCallback() {
        if (this._handleResize) {
            window.removeEventListener('resize', this._handleResize);
        }
    }

    _captureRatio(meta) {
        const el = meta.media;
        if (!el) return;
        const tag = el.tagName.toLowerCase();
        if (tag === 'img') {
            const setRatio = () => {
                if (el.naturalWidth && el.naturalHeight) {
                    meta.ratio = el.naturalWidth / el.naturalHeight;
                    this._syncHeight();
                }
            };
            if (el.complete) {
                setRatio();
            } else {
                el.addEventListener('load', setRatio, { once: true });
            }
        } else if (tag === 'video') {
            const updateRatio = () => {
                if (el.videoWidth && el.videoHeight) {
                    meta.ratio = el.videoWidth / el.videoHeight;
                    this._syncHeight();
                }
            };
            if (el.readyState >= 1) {
                updateRatio();
            } else {
                el.addEventListener('loadedmetadata', updateRatio, { once: true });
            }
        } else if (tag === 'iframe') {
            const widthAttr = parseFloat(el.getAttribute('width'));
            const heightAttr = parseFloat(el.getAttribute('height'));
            if (widthAttr && heightAttr) {
                meta.ratio = widthAttr / heightAttr;
            } else {
                meta.ratio = this._baseAspect;
            }
        } else {
            meta.ratio = null;
        }
    }

    _getActiveRatio() {
        return this._slidesMeta?.[this._currentIndex]?.ratio || null;
    }

    _syncHeight() {
        if (!this.isConnected) return;
        const wrapper = this.querySelector('.slideshow__slides');
        if (!wrapper) return;

        const detail = this.closest('.project-detail');
        const textHeight = detail?.querySelector('.project-detail__content')?.offsetHeight || null;
        const width = this.offsetWidth;
        if (!width) return;

        const viewportCap = window.innerHeight ? window.innerHeight * 0.8 : Infinity;
        const baseHeight = Math.min(width / this._baseAspect, viewportCap);
        let targetHeight = baseHeight;

        const ratio = this._getActiveRatio();
        if (ratio) {
            const neededHeight = Math.min(width / ratio, viewportCap);
            if (neededHeight > baseHeight) {
                targetHeight = neededHeight;
            }
        }

        if (textHeight && targetHeight > textHeight) {
            targetHeight = textHeight;
        }

        targetHeight = Math.max(targetHeight, 240);

        this.style.setProperty('--slideshow-height', `${targetHeight}px`);
        this.style.height = `${targetHeight}px`;
        wrapper.style.height = '100%';
    }

    _createControls() {
        const prev = this._buildArrow('prev', 'Previous slide', '‹');
        const next = this._buildArrow('next', 'Next slide', '›');
        this.append(prev, next);
    }

    _buildArrow(direction, label, symbol) {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = `slideshow__arrow slideshow__arrow--${direction}`;
        button.setAttribute('aria-label', label);
        button.innerHTML = symbol;
        button.addEventListener('click', () => {
            this._changeSlide(direction === 'next' ? 1 : -1);
        });
        return button;
    }

    _createIndicators() {
        const wrapper = document.createElement('div');
        wrapper.className = 'slideshow__indicators';
        this._indicators = this._slides.map((_, index) => {
            const indicator = document.createElement('button');
            indicator.type = 'button';
            indicator.className = 'slideshow__indicator';
            indicator.setAttribute('aria-label', `Go to slide ${index + 1}`);
            if (index === 0) indicator.classList.add('is-active');
            indicator.addEventListener('click', () => this._setActiveSlide(index));
            wrapper.appendChild(indicator);
            return indicator;
        });
        this.appendChild(wrapper);
    }

    _changeSlide(delta) {
        const nextIndex = (this._currentIndex + delta + this._slides.length) % this._slides.length;
        this._setActiveSlide(nextIndex);
    }

    _setActiveSlide(index) {
        if (index === this._currentIndex) return;
        this._slides[this._currentIndex].classList.remove('is-active');
        this._slides[index].classList.add('is-active');
        if (this._indicators) {
            this._indicators[this._currentIndex].classList.remove('is-active');
            this._indicators[index].classList.add('is-active');
        }
        this._currentIndex = index;
        this._syncHeight();
    }
}
customElements.define('t-slideshow', TSlideshow);

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