# Performance Report

The concurrency test was performed using `autocannon` with 10 connections over a 3 second duration against the `/data` endpoint. Below is the captured output:

```
npm warn Unknown env config "http-proxy". This will stop working in the next major version of npm.
Running 3s test @ http://localhost:3000/data
10 connections

┌─────────┬────────┬────────┬────────┬────────┬───────────┬─────────┬────────┐
│ Stat    │ 2.5%   │ 50%    │ 97.5%  │ 99%    │ Avg       │ Stdev   │ Max    │
├─────────┼────────┼────────┼────────┼────────┼───────────┼─────────┼────────┤
│ Latency │ 100 ms │ 101 ms │ 118 ms │ 119 ms │ 102.66 ms │ 4.26 ms │ 119 ms │
└─────────┴────────┴────────┴────────┴────────┴───────────┴─────────┴────────┘
┌───────────┬───────┬───────┬─────────┬─────────┬─────────┬─────────┬───────┐
│ Stat      │ 1%    │ 2.5%  │ 50%     │ 97.5%   │ Avg     │ Stdev   │ Min   │
├───────────┼───────┼───────┼─────────┼─────────┼─────────┼─────────┼───────┤
│ Req/Sec   │ 90    │ 90    │ 100     │ 100     │ 96.67   │ 4.72    │ 90    │
├───────────┼───────┼───────┼─────────┼─────────┼─────────┼─────────┼───────┤
│ Bytes/Sec │ 26 kB │ 26 kB │ 28.9 kB │ 28.9 kB │ 27.9 kB │ 1.37 kB │ 26 kB │
└───────────┴───────┴───────┴─────────┴─────────┴─────────┴─────────┴───────┘

Req/Bytes counts sampled once per second.
# of samples: 3

300 requests in 3.03s, 83.8 kB read
```

**Analysis:** The server handled roughly **97 requests per second** with an average latency of **103 ms** under 10 concurrent connections. The test completed successfully with no failures, demonstrating how Node.js manages concurrent requests without blocking.
