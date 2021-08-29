class Pagination {
	constructor(appendId, pageSize = 100, maxShown = 5) {
		this.appendId = appendId;
		this.pageSize = pageSize; // use setter
		this.maxShown = maxShown; // use setter
		this._current = 1;
		this.init();
	}

	// getter and setter
	get pageSize() {
		return this._pageSize;
	}

	get maxShown() {
		return this._maxShown;
	}

	get current() {
		return this._current;
	}

	set pageSize(pageSize) {
		if (pageSize <= 0) throw new Error('Not a valid pageSize number.');
		this._pageSize = pageSize;
	}

	set maxShown(num) {
		if (num <= 0) throw new Error('Not a valid maxShown number');
		this._maxShown = num;
	}

	set current(num) {
		if (num > this._pageSize) num = this._pageSize;
		if (num < 1) num = 1;
		this._current = num;
		this.render();
	}

	// main functions
	init() {
		let pagination = this.render();

		// add click handlers to page item and nav
		pagination.addEventListener('click', e => {
			if (e.target.tagName === 'LI') {
				if (!e.target.className.includes('nav')) {
					let pageNum = +e.target.textContent;
					this.goToPage(pageNum);
				} else {
					if (e.target.className.includes('lt')) this.prev();
					else this.next();
				}
			}
		});

		document.getElementById(this.appendId).appendChild(pagination);
	}

	goToPage(pageNum) {
		// save rendering times
		if (pageNum !== this._current) this.current = pageNum;
	}

	prev() {
		this.current -= 1;
	}

	next() {
		this.current += 1;
	}

	render() {
		// rerender according to the current page's position
		let list = document.querySelector(`#${this.appendId} .easy-pagination`) || this.createWrapper();
		let childHTML;

		if (this._current <= 3) {
			// E.g, <1,2,3,4,5,...,10>
			childHTML = this.buildList('head');
		} else if (this._current >= this._pageSize - 2) {
			// E.g, <1,...,6,7,8,9,10>
			childHTML = this.buildList('tail');
		} else {
			// E.g, <1,...,2,3,4,5,6,...,10>
			childHTML = this.buildList('middle');
		}
		list.innerHTML = childHTML;

		// add navigations
		list.insertAdjacentHTML('afterbegin', '<li class="nav lt">&lt;</li>');
		list.insertAdjacentHTML('beforeend', '<li class="nav gt">&gt;</li>');
        
		return list;
	}

	// helper methods
	buildList(type) {
		let html = '';

		if (type === 'head') {
			let initLen = Math.min(this._pageSize, this.maxShown);
			html += this.buildListBody(1, initLen);
			if (this._pageSize > 5)
				html += `<span>...</span><li>${this._pageSize}</li>`;
		} else if (type === 'tail') {
			html += '<li>1</li><span>...</span>';
			html += this.buildListBody(this._pageSize - 4, this.maxShown);
		} else if (type === 'middle') {
			html += '<li>1</li><span>...</span>';
			html += this.buildListBody(this._current - 2, this.maxShown);
			html += `<span>...</span><li>${this._pageSize}</li>`;
		}

		return html;
	}

	buildListBody(startFrom, length) {
	    return Array.from({ length }, (_, index) => {
			let currPageNum = startFrom + index;
			if (currPageNum === this._current) {
				return `<li class='active'>${currPageNum}</li>`;
			}
			return `<li>${currPageNum}</li>`;
		}).join('');
	}

	createWrapper() {
		let pagination = document.createElement('ul');
		pagination.className = 'easy-pagination';
		return pagination;
	}
}
