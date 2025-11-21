const RESPONSES = {
    NOT_FOUND: (res) => {
        return res.status(404).json({message: "Entity not found"});
    },
    OK: (res, data) => {
        if (data) {
            return res.status(200).json(data);
        }

        return res.status(200).json({message: "Ok"});
    },
    PERMISSION_DENIED: (res)=> {
        return res.status(401).json({message: "Permission denied"});
    },
    EXCEPTION: (res, e)=> {
        return res.status(500).json({message: "Error -> " + e.message});
    },

}

module.exports = {RESPONSES}