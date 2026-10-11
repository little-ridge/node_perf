import type { SpruceNodeApp, SpruceNodeModule } from '../../node_core/src/types.ts';

export const name = '@little-ridge/node_perf';

const HOST_SLUG = /^[a-z0-9][a-z0-9_-]{0,63}$/;

export async function register(app: SpruceNodeApp): Promise<void> {
  app.rooms.allow(/^perf:[a-z0-9_-]+$/, 'perf', true);

  app.webhooks.on('perf/sample', (payload, live) => {
    const host = typeof payload.host === 'string' ? payload.host : '';
    if (!HOST_SLUG.test(host)) {
      return;
    }
    const rooms = [`perf:${host}`];
    live.hub.broadcast(rooms, {
      type: 'event',
      event: 'perf.sample',
      rooms,
      payload,
    });
  });
}

export default {
  name,
  register,
} satisfies SpruceNodeModule;
