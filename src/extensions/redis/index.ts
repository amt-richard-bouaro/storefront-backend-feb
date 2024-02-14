import { redisClient } from '../../server';

export const getCachedResult = async (id: string) => {
	const data = await redisClient.get(id);

	return data ? JSON.parse(data) : null;
};

export const cachResult = async (
	id: string,
	payload: object | [],
	expiresIn: number = 1
) => {
	await redisClient.set(id, JSON.stringify(payload));
	await redisClient.expire(id, expiresIn);
};
