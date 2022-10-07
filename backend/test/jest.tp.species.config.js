module.exports = {
  moduleFileExtensions: ["js", "json", "ts"],
  rootDir: "./tp/species",
  testEnvironment: "node",
  testRegex: ".e2e-spec.ts$",
  transform: {
    "^.+\\.(t|j)s$": "ts-jest"
  },
  setupFiles: ['dotenv/config']
}
