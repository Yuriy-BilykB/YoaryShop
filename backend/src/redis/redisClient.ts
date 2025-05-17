import { createClient } from 'redis';
const host = process.env.REDIS_HOST!;
const port = process.env.REDIS_PORT!;
const password = process.env.REDIS_PASSWORD!;


if (!host || !port || !password) {
    throw new Error("❌ REDIS environment variables are not set");
}
const redisClient = createClient({
    socket: {
        host: host,
        port: Number(port),
        tls: true
    },
    password
});

redisClient.on('error', (err) => console.error('Redis Error:', err));

(async () => {
    try {
        await redisClient.connect();
        console.log('✅ Redis connected');
    } catch (err) {
        console.error('❌ Redis connection error:', err);
    }
})();

export { redisClient };