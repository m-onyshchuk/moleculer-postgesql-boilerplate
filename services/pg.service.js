"use strict";

const fs = require("fs");
const path = require("path");
const glob = require("glob");
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
    poolCreate() {
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
    },

    /**
     * Find *.sql files with migrations in ../migrations folder
     */
    async migrationsFind() {
      let files = await new Promise((resolve, reject) => {
        const pattern = path.join(__dirname, "../migrations/*.sql");
        glob(pattern, {}, (err, files) => {
          if (err) {
            reject(err);
						return;
          }
          resolve(files);
        });
      });
      if (files) {
        files.sort();
      }
      return files;
    },

    /**
     * Check all migrations for each run
     */
    async migrationsRun() {
      try {
        const files = await this.migrationsFind();
        if (files) {
          const client = await this.pg.connect();
          for (let filePath of files) {
            const sql = await fs.promises.readFile(filePath, 'utf8');
            await client.query(sql);
          }
          client.release();
        }
        this.logger.info("Migrations checked ...");
      } catch (error) {
        this.logger.error(`migrationsRun:: ${error.message}`);
      }
      return [];
    }
  },

  created() {
  },

  async started() {
    this.poolCreate();
    await this.migrationsRun();
  },

  async stopped() {
  }
};
