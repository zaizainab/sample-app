import fp from 'fastify-plugin';

const authPlugin = (server, opts, next) => {

  server.decorateRequest('decoded', null);

  server.addHook('preHandler', async (request, reply) => {
    try {
      if (request.routerPath) {
        if (!request.routerPath.includes('swagger')) {
          const authHeader = request.headers.authorization;
          const token = authHeader.split(' ')[1];

          server.jwt.verify(token, (err, decodedJwt) => {
            if (err) {
              server.apm.captureError({
                method: request.routerMethod,
                path: request.routerPath,
                param: request.body,
                error: err,
              })

              server.log.error(err);
            } else {
              server.log.info('decoded : ' + JSON.stringify(decodedJwt));
              server.decoded = decodedJwt;
              next();
            }
          })
        }
      }
    } catch (err) {
      server.apm.captureError({
        method: request.routerMethod,
        path: request.routerPath,
        param: request.body,
        error: err,
      })
      throw new Error('Failed to validate token');
    }
  });

  next();
};

export default fp(authPlugin);

