//副作用
Number.prototype.pad = function (size) {
    const leadingZeros = Array(size + 1).join(0)
    return leadingZeros + this
}