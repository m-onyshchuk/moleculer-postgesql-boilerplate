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
			async handler(ctx) {
				let result = "1. ";
				let answer = await ctx.broker.call("pg.test", {a: 3});
				result += answer;
				return result;
			}
		},
	}
};
