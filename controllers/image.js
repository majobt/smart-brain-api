const Clarifai = require('clarifai');

const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users').where({ id }, '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0]);
        })
        .catch(err => res.status(400).json('unable to get entries'))
}

const app = new Clarifai.App({
    apiKey: '31f8ceca1f294d7baad401455ea5c8f2'
});

const handleApiCall = (req, res) => {
    app.models
        .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => {
            res.json(data);
        })
        .catch(err => res.status(400).json('unable to work with API'))
}

module.exports = {
   handleImage,
   handleApiCall
}
