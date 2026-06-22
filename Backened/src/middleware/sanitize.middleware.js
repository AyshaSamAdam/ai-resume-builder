// middleware/sanitize.middleware.js

const sanitizeInput = (obj) => {
    if (!obj) return obj
    Object.keys(obj).forEach(key => {
        if (typeof obj[key] === 'string') {
            // always remove $
            obj[key] = obj[key].replace(/\$/g, '')
            
            // only remove . if NOT an email field
            if (key !== 'email') {
                obj[key] = obj[key].replace(/\./g, '')
            }
        } else if (typeof obj[key] === 'object') {
            sanitizeInput(obj[key])
        }
    })
    return obj
}

const sanitize = (req, res, next) => {
    sanitizeInput(req.body)
    sanitizeInput(req.params)
    next()
}

module.exports = sanitize
