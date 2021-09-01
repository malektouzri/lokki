const express = require('express')
const app = express()
const cors = require('cors')

const PORT = process.env.PORT || 3001

app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
    })
  );
  
app.use(express.json())

const curenciesRoute = require('./routes/currencies')

app.use('/currencies', curenciesRoute)

app.get('/', (req,res) => {
    res.send('Lokki');
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });