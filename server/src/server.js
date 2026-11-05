import app from './app.js';
import { config } from './config/config.js';

const PORT = config.port;

app.listen(PORT, () => {
  console.log(`🪔 Festive Ad Studio Server running at http://localhost:${PORT}`);
  console.log(`🎨 Environment: ${config.nodeEnv}`);
});
