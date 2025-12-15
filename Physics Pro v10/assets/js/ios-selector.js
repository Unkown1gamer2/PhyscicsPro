// ios-selector.js
export class IosSelector {
    constructor(options) {
        let defaults = {
            el: '', 
            type: 'infinite', 
            count: 20, 
            source: [], 
            value: null,
            onChange: null
        };
        this.options = Object.assign({}, defaults, options);
        this.options.count = this.options.count - this.options.count % 4;
        Object.assign(this, this.options);

        this.halfCount = this.options.count / 2;
        this.quarterCount = this.options.count / 4;
        this.itemHeight = 30; 
        this.itemAngle = 360 / this.options.count; 
        this.radius = this.itemHeight / Math.tan(this.itemAngle * Math.PI / 180); 
        this.scroll = 0;
        this.moving = false;

        this.elems = { el: document.querySelector(this.options.el) };
        this._create(this.options.source);
        this._bindEvents();
    }

    _create(source) {
        if (!source.length) return;
        this.source = source;
        let circleListHTML = '';
        for (let i = 0; i < source.length; i++) {
            circleListHTML += `<li class="select-option" data-index="${i}" style="top: ${-this.itemHeight/2}px;height:${this.itemHeight}px;line-height:${this.itemHeight}px;transform: rotateX(${-this.itemAngle * i}deg) translateZ(${this.radius}px);">${source[i].toString().padStart(2, '0')}</li>`;
        }
        this.elems.el.innerHTML = `<div class="select-wrap"><ul class="select-options">${circleListHTML}</ul><div class="highlight"></div></div>`;
        this.elems.circleList = this.elems.el.querySelector('.select-options');
        this.elems.circleItems = this.elems.el.querySelectorAll('.select-option');
    }

    _bindEvents() {
        let startY, lastY, velocity = 0;
        const wrap = this.elems.el.querySelector('.select-wrap');
        
        const onStart = (e) => {
            startY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;
            lastY = startY;
            this.moving = true;
            velocity = 0;
        };

        const onMove = (e) => {
            if (!this.moving) return;
            e.preventDefault();
            const currentY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;
            const deltaY = currentY - lastY;
            velocity = deltaY;
            
            const scrollDelta = deltaY / this.itemHeight;
            this.scroll -= scrollDelta;
            
            // Keep within bounds
            if (this.scroll < 0) this.scroll = 0;
            if (this.scroll >= this.source.length) this.scroll = this.source.length - 1;
            
            this._update();
            lastY = currentY;
        };

        const onEnd = () => {
            this.moving = false;
            // Snap to nearest value
            this.scroll = Math.round(this.scroll);
            if (this.scroll < 0) this.scroll = 0;
            if (this.scroll >= this.source.length) this.scroll = this.source.length - 1;
            this._update();
        };

        wrap.addEventListener('mousedown', onStart);
        wrap.addEventListener('touchstart', onStart);
        document.addEventListener('mousemove', onMove);
        document.addEventListener('touchmove', onMove);
        document.addEventListener('mouseup', onEnd);
        document.addEventListener('touchend', onEnd);
    }

    select(value) {
        let index = this.source.indexOf(value);
        if (index === -1) index = 0;
        this.scroll = index;
        this._update();
        if (this.onChange) this.onChange(this.source[this.scroll]);
    }

    _update() {
        this.elems.circleList.style.transform = `translateZ(${-this.radius}px) rotateX(${this.itemAngle*this.scroll}deg)`;
    }

    getValue() {
        return this.source[Math.round(this.scroll)];
    }
}