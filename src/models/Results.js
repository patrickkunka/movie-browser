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
}

export default Results;