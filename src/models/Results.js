class Results {
    constructor() {
        this.query        = '';
        this.items        = [];
        this.activePage   = 1;
        this.totalResults = 0;
        this.itemsPerPage = Infinity;
    }

    get hasQuery() {
        return this.query.length > 0;
    }

    get totalPages() {
        return Math.max(1, Math.ceil(this.totalResults / this.itemsPerPage));
    }

    get hasMultiplePages() {
        return this.totalPages > 1;
    }

    get isLastPage() {
        return this.activePage === this.totalPages;
    }

    get pageStartsAt() {
        return (this.itemsPerPage * (this.activePage - 1)) + 1;
    }

    get pageEndsAt() {
        return Math.min(this.pageStartsAt + this.itemsPerPage - 1, this.totalResults);
    }

    get isSingleResult() {
        return this.totalResults === 1;
    }
}

export default Results;