const express = require('express');
const cors = require('cors');
const notesRoutes = require('./routes/notes.routes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');
const port = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger API documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api', notesRoutes);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });