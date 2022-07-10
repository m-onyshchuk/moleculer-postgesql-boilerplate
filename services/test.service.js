"use strict";

/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */

/**
 * Test service for one endpoint: /api/test/run
 */
module.exports = {
	name: "test",

	actions: {
		/**
		 * Test endpoint
		 */
		run: {
			rest: {
				method: "GET",
				path: "/run"
			},
			params: {
				search: "string"
			},
			async handler(ctx) {
				const sql = `--
					SELECT 
						b.name, 
						CONCAT(a.first_name, ' ', a.last_name) AS author, 
						p.name AS publisher,
						b.isbn    
					FROM public.books AS b
					LEFT JOIN public.authors AS a ON b.author = a.id  
					LEFT JOIN public.publishers AS p ON b.publisher = p.id  
					WHERE b.name ILIKE $1 
				`;
				const values = [`%${ctx.params.search}%`];
				const answer = await ctx.broker.call("pg.query", {sql, values});
				return answer;
			}
		},
	}
};
