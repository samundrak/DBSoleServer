module.exports = class ExtendImplementor {

    constructor() {
        this.prepare = ['init', 'get'];
    }

    extend(options) {
        this.prepare.forEach(props => {
            if (!options[props]) throw new Error(props + ' is not available');
            this[props] = options[props];
        });
    }
}
