import { z } from 'zod';

const NEW_DESTINATION = z.object({
	destinations: z.array(
		z.object({
			name: z.string().nonempty('Please select a destination country'),
			code: z
				.string()
				.nonempty('Please select a destination country code missing'),
			duration: z
				.number()
				.min(1, 'Destination shipping duration should have at least 1 day'),
			cost: z.number().default(0),
		})
	),
});

type NEW_DESTINATION = z.infer<typeof NEW_DESTINATION>;

const UPDATE_DESTINATION = z.object({
	duration: z
		.number()
		.min(1, 'Destination shipping duration should have at least 1 day'),
	cost: z.number().default(0),
});

type UPDATE_DESTINATION = z.infer<typeof UPDATE_DESTINATION>;

export { NEW_DESTINATION, UPDATE_DESTINATION };
