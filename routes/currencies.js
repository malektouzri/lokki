const express = require('express')

const router = express.Router()

const axios = require('axios')

router.get('/', (req, res) => {

    axios.get('https://api.fastforex.io/fetch-one', {
        params: {
            from: req.query.from,
            to: req.query.to,
            api_key: '4841875422-1109f1a147-qyemi3'
        }
      })
        .then((response) => {
            var to = req.query.to
            var string = JSON.stringify(response.data.result);
            var objectValue = JSON.parse(string);
            var tab = {
                "value": objectValue[to]
            }
            res.send(tab)
            console.log(objectValue)
        })
        .catch(error => {
            console.log(error)
        });
})


module.exports = router