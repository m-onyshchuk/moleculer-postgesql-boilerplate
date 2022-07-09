"use strict";
const {Pool} = require("pg");

/**
 * @typedef {import("moleculer").Context} Context Moleculer"s Context
 */

/**
 * Service for PostgreSQL connection and query running
 */
module.exports = {
	name: "pg",

	settings: {
		pg: null
	},

	actions: {
		/**
		 * Run SQL query
		 * @returns
		 */
		query: {
			params: {
				sql: "string"
			},
			async handler() {
				// ctx.params.sql
				return "Hello Moleculer";
			}
		},

		test: {
			params: {
				a: "number"
			},
			async handler(ctx) {
				// ctx.params.sql
				return Number(ctx.params.a) + 1;
			}
		},
	},

	methods: {
		createPool() {
			let cfg = {
				host: process.env.DB_HOST || "localhost",
				port: process.env.DB_PORT || 5501,
				user: process.env.DB_USER || "postgres",
				password: process.env.DB_PASS || "postgres",
				database: process.env.DB_NAME || "postgres",
				statement_timeout: 60000, // 1 minute
				query_timeout: 60000,     // 1 minute
			};
			this.pg = new Pool(cfg);
			this.logger.info("PostgreSQL connection pool is ready ...");
		}
	},

	created() {},

	async started() {
		this.createPool();
	},

	async stopped() {}
};
