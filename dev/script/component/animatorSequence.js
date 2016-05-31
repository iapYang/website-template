(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define(factory);
	} else if (typeof exports === 'object') {
		// CommonJS
		module.exports = factory();
	} else {
		// Browser global
		factory();
	}
}(this, function() {

    var AnimatorSequence = function() {

    };


    window.AnimatorSequence = AnimatorSequence;

    return AnimatorSequence;
}));
