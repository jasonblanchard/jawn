import bootstrap from 'app/bootstrap';
import environment from 'dotenv';

environment.config();

const LOG_TAG = 'entrypoint';

const registry = bootstrap();
const { logger, app } = registry;

logger.debug('>>> STARTING <<<', LOG_TAG);

app.listen(8081);
