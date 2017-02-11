import bootstrap from 'app/bootstrap';
import environment from 'dotenv';

environment.config({ silent: true });

const LOG_TAG = 'entrypoint';

const registry = bootstrap();
const { logger, app } = registry;

logger.debug('>>> STARTING <<<', LOG_TAG);

const port = process.env.PORT || 8081;
app.listen(port, () => {
  logger.debug(`running on port ${port}`, LOG_TAG);
});
