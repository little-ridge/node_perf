# node_perf

Performance chart fan-out for the Little Ridge Node host. WordPress (`spruce_sds`) stores the samples. After a batch is stored, WordPress posts a signed webhook here and this module tells an authenticated Performance screen to append the point.

## Rooms

- `perf:{host}` — live samples for one monitored host. Subscribing requires a Spruce Node JWT. `perf:vps1` is the VPS1 room.

Auction and cart rooms are unchanged and stay public. This module registers its room with the auth flag.

## Webhook

`POST /webhooks/perf/sample`

```
X-Webhook-Signature: sha256=<hmac of raw JSON>
X-Webhook-Event: perf.sample
X-Spruce-Origin: https://sds2.littleridge.ca
```

The JSON body is broadcast as the `perf.sample` payload to `perf:vps1`.
