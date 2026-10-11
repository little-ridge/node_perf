import type { SpruceNodeApp, SpruceNodeModule } from '../../node_core/src/types.ts';

export const name = '@little-ridge/node_perf';

export async function register(app: SpruceNodeApp): Promise<void> {
  app.rooms.allow(/^perf:[a-z0-9_-]+$/, 'perf', true);

  app.webhooks.on('perf/sample', (payload, live) => {
    const rooms = ['perf:vps1'];
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
