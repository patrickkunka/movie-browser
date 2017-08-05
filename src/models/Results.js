class Results {
    constructor() {
        this.query        = '';
        this.items        = [];
        this.activePage   = 1;
        this.totalResults = 0;
        this.itemsPerPage = Infinity;
    }

    get totalPages() {
        return Math.max(1, Math.ceil(this.totalResults / this.itemsPerPage));
    }

    get hasMultiplePages() {
        return this.totalPages > 1;
    }

    get isSingleResult() {
        return this.totalResults === 1;
    }
}

export default Results;