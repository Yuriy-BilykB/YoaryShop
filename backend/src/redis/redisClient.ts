import { createClient } from 'redis';

const redisClient = createClient({
    socket: {
        host: "youary-shop-redis",
        port: 6379,
        tls: false,
    },
});

redisClient.on('error', (err) => console.error('❌ Redis Error:', err));

(async () => {
    try {
        await redisClient.connect();
        console.log('✅ Redis connected');
    } catch (err) {
        console.error('❌ Redis connection error:', err);
    }
})();

export { redisClient };
