import { createClient } from 'redis';

const redisClient = createClient({
    url: `rediss://:df9TKwbpxlb6q8TNSredCbAJvtiTiOGocAzCaBlvljA=@youraredis.redis.cache.windows.net:6380`,
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
