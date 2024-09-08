//this function accept a function executes it and pass any error to the catch function

const catchAsync = func => {
    return (req, res, next) => {
        func(req, res, next).catch(next);
    }
}

module.exports = catchAsync;