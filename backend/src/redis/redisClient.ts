import { createClient } from 'redis';

const redisClient = createClient({
    socket: {
        host: 'redis',
        port: 6379,
    }
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