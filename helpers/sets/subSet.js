module.exports = function (otherSet) {
    // if size of this set is greater 
    // than otherSet then it can'nt be  
    //  a subset 
    if (this.size > otherSet.size)
        return false;
    else {
        for (var elem of this) {
            // if any of the element of  
            // this is not present in the 
            // otherset then return false 
            if (!otherSet.has(elem))
                return false;
        }
        return true;
    }
} 