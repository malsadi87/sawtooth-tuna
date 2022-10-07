module.exports = {
  moduleFileExtensions: ["js", "json", "ts"],
  rootDir: "./tp/trip",
  testEnvironment: "node",
  testRegex: ".e2e-spec.ts$",
  transform: {
    "^.+\\.(t|j)s$": "ts-jest"
  },
  setupFiles: ['dotenv/config']
}
