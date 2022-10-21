import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), svgr({})],
	resolve: {
		alias: [
			{
				find: "@root",
				replacement: path.resolve(__dirname, "./src"),
			},
			{
				find: "@components",
				replacement: path.resolve(__dirname, "./src/components"),
			},
			{
				find: "@styles",
				replacement: path.resolve(__dirname, "./src/styles"),
			},
			{
				find: "@assets",
				replacement: path.resolve(__dirname, "./src/assets"),
			},
			{
				find: "@contexts",
				replacement: path.resolve(__dirname, "./src/contexts"),
			},
			{
				find: "@hooks",
				replacement: path.resolve(__dirname, "./src/hooks"),
			},
		],
	},
});
